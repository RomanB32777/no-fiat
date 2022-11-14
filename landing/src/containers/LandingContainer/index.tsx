import { Col, Divider, Row } from "antd";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import BaseButton from "../../components/BaseButton";

import bannerImg from "../../assets/chat.png";
import cubeImg from "../../assets/cube.png";
import coffeImg from "../../assets/coffe.png";

import stepsImgPc from "../../assets/staps_contract_pc.png";
import stepsImg from "../../assets/staps_contract.png";
import shareImgPc from "../../assets/share_pc.png";
import shareImg from "../../assets/share.png";

import cubesImg from "../../assets/cubes.png";
import humansImg from "../../assets/humans.png";
import graphImg from "../../assets/graph.png";
import starsImg from "../../assets/stars.png";

import "./styles.sass";

const link = "https://tron.no-fiat.xyz/";

const LandingContainer = () => {
  const { isMobile } = useWindowDimensions();
  return (
    <>
      <div className="landing-container">
        <div className="landing-block banner-block">
          <div className="content">
            <div className="img-wrapper">
              <img src={bannerImg} alt="bannerImg" />
            </div>
          </div>
        </div>
        <div className="landing-block header-block">
          <div className="title">This button is right here!</div>
          <div className="content">
            <div className="btn-wrapper">
              <BaseButton
                title="Sign-up"
                onClick={() => window.open(link, "_blank")}
                modificator="landing-btn"
              />
            </div>
          </div>
        </div>
        <div className="landing-block whatIs-block black-block">
          <div className="title">
            <span className="yellow">So, what’s NoFiat?</span>
          </div>
          <div className="content">
            <Row
              justify="space-between"
              align="middle"
              style={{ width: "100%" }}
              gutter={[0, 32]}
            >
              <Col xs={{ span: 24, order: 2 }} sm={{ span: 12, order: 1 }}>
                <div className="description">
                  NoFiat - is service that allows start processing tips in{" "}
                  <span className="yellow">crypto</span>
                  for caffes, restaurants, barber shops, massage parlor and
                  other organizations that need it.
                </div>
              </Col>
              <Col xs={{ span: 24, order: 1 }} sm={{ span: 10, order: 2 }}>
                <div className="img-wrapper">
                  <img src={cubeImg} alt="cubeImg" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="landing-block howWork-block">
          <div className="title">Awesome! How does it work?</div>
          <Divider className="divider" />
          <div className="content">
            <Row justify="center" align="middle" style={{ width: "100%" }}>
              <Col xs={24} sm={8}>
                <div className="img-wrapper">
                  <img src={coffeImg} alt="coffeImg" />
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className="description">
                  <p>
                    Tom owns a caffe and has 3 employees: waiter Bob and two
                    cooks, Alice and Mike.{" "}
                  </p>
                  <p>
                    Tom wants to get 5% of every tip Bob receives. He thinks
                    it’s fair for Alice and Mike to receive 5% as well.
                  </p>
                </div>
              </Col>
            </Row>
            <Divider className="divider" />
            <div className="img-wrapper banner">
              <img src={isMobile ? stepsImg : stepsImgPc} alt="stepsImg" />
              <img src={isMobile ? shareImg : shareImgPc} alt="shareImg" className="share-img" />
            </div>
          </div>
        </div>

        <div className="landing-block features-block black-block">
          <div className="title">Features</div>
          <div className="content">
            <div className="feature-row decentralized">
              <Row
                justify="space-between"
                align="middle"
                style={{ width: "100%" }}
                gutter={[0, 32]}
              >
                <Col xs={24} sm={8}>
                  <div className="img-wrapper">
                    <img src={cubesImg} alt="cubesImg" />
                  </div>
                </Col>
                <Col xs={24} sm={14}>
                  <div className="description">
                    <span className="yellow">Fully decentralized. </span>No
                    information is stored in databasa. There is no database.
                    Everything is processed on Blockchain.
                  </div>
                </Col>
              </Row>
            </div>
            <div className="feature-row teams">
              <Row
                justify="space-between"
                align="middle"
                style={{ width: "100%" }}
                gutter={[0, 32]}
              >
                <Col xs={{ span: 24, order: 2 }} sm={{ span: 14, order: 1 }}>
                  <div className="description">
                    <span className="yellow">Team creation. </span>
                    Create and manage teams Let your employees take a fair bite
                    from the pie.
                  </div>
                </Col>
                <Col xs={{ span: 24, order: 1 }} sm={{ span: 8, order: 2 }}>
                  <div className="img-wrapper">
                    <img src={humansImg} alt="humansImg" />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="feature-row dashboard">
              <Row
                justify="space-between"
                align="middle"
                style={{ width: "100%" }}
                gutter={[0, 32]}
              >
                <Col xs={24} sm={10}>
                  <div className="img-wrapper">
                    <img src={graphImg} alt="graphImg" />
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="description">
                    <span className="yellow">Dashboard. </span>
                    Select any time period and check the summary of tips
                    received with easy-to-use dashboard.
                  </div>
                </Col>
              </Row>
            </div>
            <div className="feature-row reviews">
              <Row
                justify="space-between"
                align="middle"
                style={{ width: "100%" }}
                gutter={[0, 32]}
              >
                <Col xs={{ span: 24, order: 2 }} sm={{ span: 12, order: 1 }}>
                  <div className="description">
                    <span className="yellow">Reviews. </span>
                    Collect clients’ reviews and store them on blockchain. No
                    fake reviews.
                  </div>
                </Col>
                <Col xs={{ span: 24, order: 1 }} sm={{ span: 10, order: 2 }}>
                  <div className="img-wrapper">
                    <img src={starsImg} alt="starsImg" />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div className="landing-block btn-block">
          <div className="title"> It’s still the same button:)</div>
          <div className="content">
            <BaseButton
              title="Sign-up"
              onClick={() => window.open(link, "_blank")}
              modificator="landing-btn"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingContainer;
