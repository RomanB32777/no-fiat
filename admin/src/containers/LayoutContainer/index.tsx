import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import clsx from "clsx";
import { Layout, Menu } from "antd";
import DocumentTitle from "react-document-title";

import Logo from "../../components/HeaderComponents/LogoComponent";
import { HeaderBanner } from "../../components/HeaderComponents/HeaderBanner";
import { HeaderComponent } from "../../components/HeaderComponents/HeaderComponent";
import { IRoute, Pages, routers } from "../../routes";
import { useAppSelector } from "../../store/hooks";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { userRoles } from "../../types";
import "./styles.sass";

const { Content, Sider } = Layout;

const withBanner = true;

const getItem = ({
  label,
  path,
  children,
}: {
  label: any;
  path: any;
  children?: any;
}) => ({
  key: path,
  children: children || null,
  label,
});

const scrollToPosition = (top = 0) => {
  try {
    window.scroll({
      top: top,
      left: 0,
      behavior: "smooth",
    });
  } catch (_) {
    window.scrollTo(0, top);
  }
};

const addToMenu = (
  route: IRoute,
  menuArr: IRoute[],
  userRole: userRoles | null,
  iter: number = 0
) => {
  if (route.children) {
    iter++;
    route.children.forEach((chRoute) => {
      // chRoute.menu && console.log( chRoute.roleRequired, userRole);

      chRoute.menu &&
        iter !== 3 &&
        chRoute.roleRequired &&
        userRole &&
        chRoute.roleRequired.includes(userRole) &&
        menuArr.push({
          ...chRoute,
          path: chRoute.index ? route.path : chRoute.path,
        });
      addToMenu(chRoute, menuArr, userRole, iter);
    });
  }
};

const LayoutApp = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state);
  const { width, isTablet } = useWindowDimensions();

  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    isTablet ? setCollapsed(true) : setCollapsed(false);
  }, [width]);

  const menuItems: IRoute[] = useMemo(() => {
    const menuShowItems = routers.reduce((acc, route) => {
      route.protected && user.userRole
        ? addToMenu(route, acc, user.userRole)
        : addToMenu(route, acc, null);
      return acc;
    }, [] as IRoute[]);

    return menuShowItems.sort((n1, n2) => {
      if (n1.menuOrder && n2.menuOrder) {
        if (n1.menuOrder > n2.menuOrder) return 1;
        if (n1.menuOrder < n2.menuOrder) return -1;
      }
      return 0;
    });
  }, [user]);

  const hiddenLayoutElements: boolean = useMemo(() => {
    const pathsWithHiddenLayoutElements = routers.filter(
      (route) => route.hiddenLayoutElements
    );
    return (
      !menuItems.length ||
      pathsWithHiddenLayoutElements.some(
        (route) => pathname.split("/")[1] === route.path?.split("/")[0]
      )
    );
  }, [pathname, menuItems]);

  const showOnlyLogo: boolean = useMemo(() => {
    const pathsWithShowLogo = routers.filter((route) => route.showLogo);
    return (
      !menuItems.length ||
      pathsWithShowLogo.some(
        (route) => pathname.split("/")[1] === route.path?.split("/")[0]
      )
    );
  }, [pathname, menuItems]);

  const activeRoute: string = useMemo(
    () =>
      pathname[0] === "/" && pathname !== "/"
        ? pathname.replace("/", "")
        : pathname,
    [pathname]
  );

  const titleApp: string | undefined = useMemo(() => {
    const routersWithChild = menuItems.filter((route) =>
      Boolean(route.children)
    );

    const childRouters = routersWithChild.filter((route) => route.children);

    const allRouters: IRoute[] = menuItems.concat(
      ...(childRouters as IRoute[])
    );

    const currRoute = allRouters.find((route) => route.path === activeRoute);

    return currRoute ? currRoute.name : "";
  }, [menuItems, activeRoute]);

  return (
    <DocumentTitle
      title={`NoFiat${Boolean(titleApp?.length) ? ` - ${titleApp}` : ""}`}
    >
      <>
        {withBanner && <HeaderBanner />}
        <Layout
          style={{
            minHeight: "100vh",
            position: "relative",
          }}
        >
          {!collapsed && (
            <div
              className={clsx("sidebar-overlay", { withBanner })}
              onClick={() => setCollapsed(true)}
            />
          )}
          <Sider
            hidden={hiddenLayoutElements}
            width={isTablet ? 275 : 250}
            collapsible
            collapsed={collapsed}
            collapsedWidth="0"
            className={clsx("layout-sidebar", {
              withBanner,
            })}
            trigger={null}
            onCollapse={(c, t) => console.log(c, t)}
          >
            {!collapsed && <Logo navigateUrl="/" />}
            <div className="sidebar-content">
              <Menu
                theme="dark"
                selectedKeys={[activeRoute]}
                triggerSubMenuAction="click"
                mode="inline"
                onClick={({ key }) => {
                  navigate(key);
                  scrollToPosition();
                  isTablet && setCollapsed(true);
                }}
                items={menuItems.map(({ name, menu, path, children }) => {
                  return menu
                    ? getItem({
                        label: name,
                        path,
                        children: children
                          ? children.map((el) =>
                              el.menu
                                ? getItem({
                                    label: el.name,
                                    path: path + (`/${el.path}` || ""),
                                  })
                                : null
                            )
                          : null,
                      })
                    : null;
                })}
              />
            </div>
          </Sider>
          <Layout
            className={clsx("site-layout", {
              noMarginTo: showOnlyLogo,
              visibleBgImage: showOnlyLogo,
            })}
            style={{
              marginLeft: hiddenLayoutElements || isTablet ? 0 : 250, // collapsed
            }}
          >
            <HeaderComponent
              hidden={hiddenLayoutElements || !isTablet}
              collapsedSidebar={collapsed}
              setCollapsedSidebar={setCollapsed}
              modificator={clsx("layout-header", {
                withBanner,
              })}
              visibleGamburger
              visibleLogo
            />
            {showOnlyLogo && (
              <Logo navigateUrl="/" modificator="logo-absolute" />
            )}
            <Content
              className={clsx("layout-container", {
                withBanner,
              })}
            >
              <div
                className={clsx("main-container", {
                  noMarginTo: showOnlyLogo,
                  withBanner,
                })}
              >
                <Pages />
              </div>
            </Content>
          </Layout>
        </Layout>
      </>
    </DocumentTitle>
  );
};

export default LayoutApp;
