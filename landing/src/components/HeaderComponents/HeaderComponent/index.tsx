import { Col, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import clsx from "clsx";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import Logo from "../LogoComponent";
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
  handlerHeaderSelect?: () => void;
  onClick?: () => void;
}

export const HeaderComponent = ({
  hidden,
  logoUrl,
  modificator,
  backgroundColor,
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
      <Logo navigateUrl={logoUrl || "/"} />
    </Header>
  );
};
