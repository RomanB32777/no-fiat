import React from "react";
import { Layout } from "antd";
import { Pages } from "../../routes";
import { HeaderComponent } from "../../components/HeaderComponents/HeaderComponent";

import "./styles.sass";

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
            <Pages />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
