import QRCode from "react-qr-code";
import { Col, Row } from "antd";
import clsx from "clsx";
import "./styles.sass";

const QrBlock = ({
  label,
  value,
  modificator,
  InputCol,
  labelCol,
  gutter,
}: {
  value: string;
  label?: string;
  modificator?: string;
  InputCol?: number;
  labelCol?: number;
  gutter?: number | [number, number];
}) => {
  const onImageDownload = () => {
    const svg = document.getElementById("QRCode");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx && ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "QRCode";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  return (
    <div className="qrBlock">
      <Row gutter={gutter || 0} justify="space-between" align="middle">
        <Col md={labelCol || (label ? 12 : 0)} xs={24}>
          <span className="qrBlock__label">{label}</span>
        </Col>
        <Col md={InputCol || (label ? 12 : 24)} xs={24}>
          <div
            className={clsx("qrBlock__input", {
              [modificator as string]: modificator,
            })}
          >
            <div className="qr">
              <div className="qr-wrapper">
                <div className="qr-block">
                  <QRCode id="QRCode" size={150} value={value} />
                </div>
                <p className="qr-download" onClick={onImageDownload}>Download</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default QrBlock;
