import React from "react";
import { Layout } from "antd";
import LandingPage from "../../pages/LandingPage";

import "./styles.sass";
import { HeaderComponent } from "../../components/HeaderComponents/HeaderComponent";

const { Content } = Layout;

const LayoutApp = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* <BackTop /> */}
      <Layout className="site-layout">
        <Content className="layout-container">
          <HeaderComponent visibleLogo logoUrl="/" />
          <div className="main-container">
            <LandingPage />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
