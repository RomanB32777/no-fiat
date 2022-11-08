import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { BackTop, Layout, Menu } from "antd";
import DocumentTitle from "react-document-title";

import { IRoute, Pages, routers } from "../../routes";
import { useAppSelector } from "../../store/hooks";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Logo from "../../components/HeaderComponents/LogoComponent";
import { IUser } from "../../types";
import "./styles.sass";
import { HeaderComponent } from "../../components/HeaderComponents/HeaderComponent";

const { Content, Sider } = Layout;

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
  user: IUser,
  iter: number = 0
) => {
  const add = () => {
    if (route.children) {
      iter++;
      route.children.forEach((chRoute) => {
        chRoute.menu &&
          iter !== 3 &&
          menuArr.push({
            ...chRoute,
            path: chRoute.index ? route.path : chRoute.path,
          });
        addToMenu(chRoute, menuArr, user, iter);
      });
    }
  };
  route.roleRequired ? route.roleRequired === user.userRole && add() : add();
};

const LayoutApp = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useAppSelector((state) => state.user);
  const { width, isTablet } = useWindowDimensions();

  const [collapsed, setCollapsed] = useState(true);

  const hiddenLayoutElements: boolean = useMemo(() => {
    const pathsWithHiddenLayoutElements = routers.filter(
      (route) => route.hiddenLayoutElements
    );

    return pathsWithHiddenLayoutElements.some(
      (route) => pathname.split("/")[1] === route.path?.split("/")[0]
    );
  }, [pathname]);

  useEffect(() => {
    isTablet ? setCollapsed(true) : setCollapsed(false);
  }, [width]);

  const menuItems: IRoute[] = useMemo(() => {
    const menuShowItems = routers.reduce((acc, route) => {
      route.protected
        ? user.userRole && addToMenu(route, acc, user)
        : addToMenu(route, acc, user);
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
      <Layout
        style={{
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {!collapsed && (
          <div className="sidebar-overlay" onClick={() => setCollapsed(true)} />
        )}
        <Sider
          hidden={hiddenLayoutElements}
          width={isTablet ? 275 : 250}
          collapsible
          collapsed={collapsed}
          collapsedWidth="0"
          className="layout-sidebar"
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
              items={
                menuItems &&
                menuItems.map(({ name, menu, path, children }) => {
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
                })
              }
            />
          </div>
        </Sider>
        <BackTop />
        <Layout
          className="site-layout"
          style={{
            marginLeft: hiddenLayoutElements || isTablet ? 0 : 250, // collapsed
          }}
        >
          <HeaderComponent
            hidden={hiddenLayoutElements || !isTablet}
            collapsedSidebar={collapsed}
            setCollapsedSidebar={setCollapsed}
            modificator="layout-header"
            visibleGamburger
            visibleLogo
          />
          <Content>
            <div className="main-container">
              <Pages />
            </div>
          </Content>
        </Layout>
      </Layout>
    </DocumentTitle>
  );
};

export default LayoutApp;
