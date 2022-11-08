import { Col, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import clsx from "clsx";
import Logo from "../LogoComponent";
import { MenuMobileIcon } from "../../../icons/icons";
import "./styles.sass";

interface IHeaderComponent {
  visibleLogo?: boolean;
  logoUrl?: string;
  visibleGamburger?: boolean;
  hidden?: boolean;
  modificator?: string;
  backgroundColor?: string;
  collapsedSidebar?: boolean;
  setCollapsedSidebar?: (status: boolean) => void;
  onClick?: () => void;
}

export const HeaderComponent = ({
  hidden,
  visibleLogo,
  visibleGamburger,
  logoUrl,
  modificator,
  backgroundColor,
  collapsedSidebar,
  setCollapsedSidebar,
  onClick,
}: IHeaderComponent) => {
  return (
    <Header
      className={clsx("site-layout-background", {
        [modificator as string]: modificator,
      })}
      hidden={hidden}
      onClick={onClick}
      style={{
        background: backgroundColor,
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          width: "100%",
        }}
      >
        {visibleGamburger && (
          <div
            className={clsx("gamb-icon", {
              active: !collapsedSidebar,
            })}
            onClick={() =>
              setCollapsedSidebar && setCollapsedSidebar(!collapsedSidebar)
            }
          >
            <MenuMobileIcon />
          </div>
        )}
        {visibleLogo && (
          <Col lg={8} xs={14} offset={visibleGamburger ? 2 : 0}>
            <div className="header__left">
              <Logo navigateUrl={logoUrl || "/"} />
            </div>
          </Col>
        )}
      </Row>
    </Header>
  );
};
