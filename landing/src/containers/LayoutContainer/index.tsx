import React from "react";
import { BackTop, Layout } from "antd";
import LandingPage from "../../pages/LandingPage";

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
      <BackTop />
      <Layout className="site-layout">
        <Content>
          <div className="main-container">
            <LandingPage />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
