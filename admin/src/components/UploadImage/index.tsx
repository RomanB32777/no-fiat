import { useMemo, useState } from "react";
import { Col, Row } from "antd";
import clsx from "clsx";
import Loader from "../Loader";
import { UploadIcon } from "../../icons/icons";
import { IFileInfo } from "../../types";
import "./styles.sass";

// const maxFileSize = 3 * 1024 * 1024;

const UploadImage = ({
  imgName,
  label,
  formats,
  disabled,
  setFile,
  filePreview,
  InputCol,
  labelCol,
  gutter,
  bigSize,
  isBanner,
  loading,
}: {
  imgName?: string;
  label: string;
  formats?: string[];
  disabled?: boolean;
  filePreview?: string;
  setFile?: (fileInfo: IFileInfo) => void;
  InputCol?: number;
  labelCol?: number;
  gutter?: number | [number, number];
  bigSize?: boolean;
  isBanner?: boolean;
  loading?: boolean;
}) => {
  const [isMouseOnAvatar, setIsMouseOnAvatar] = useState<boolean>(false);

  const fileToBase64 = (file: FileList) => {
    if (setFile) {
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = () =>
          setFile({ file, preview: (reader.result as string) || "" });
        reader.onerror = (error) => reject(error);
      });
    }
  };

  const saveFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.target.files && fileToBase64(ev.target.files);
  };

  const imgExist = useMemo(
    () => filePreview || (imgName && imgName.length > 0),
    [filePreview, imgName]
  );

  return (
    <div className="file-input">
      <Row
        gutter={gutter || 0}
        style={{
          width: "100%",
        }}
      >
        <Col md={labelCol || 12} xs={24}>
          <div className="file-input__texts">
            <p className="file-input__title">{label}</p>
          </div>
        </Col>
        <Col md={InputCol || 12} xs={24}>
          <div
            className={clsx("file-input__row", {
              banner: isBanner,
              bigSize: bigSize,
              transparent: Boolean(filePreview?.length),
            })}
            onMouseEnter={() => !disabled && setIsMouseOnAvatar(true)}
            onMouseLeave={() => !disabled && setIsMouseOnAvatar(false)}
          >
            <div className="file-input__row__image">
              {loading && (
                <div className="loader-img">
                  <Loader size="small" />
                </div>
              )}
              {imgExist && <img src={filePreview || imgName} alt={label} />}
            </div>
            {!disabled && (
              <div className="file-input__row__button">
                <input
                  type="file"
                  onChange={saveFile}
                  accept={
                    formats?.map((f) => `image/${f.toLowerCase()}`).join(",") ||
                    "image/jpeg,image/jpg,image/png"
                  }
                />
                <div
                  className="file-input__row__back"
                  style={{
                    opacity: isMouseOnAvatar || !imgExist ? "1" : "0",
                  }}
                >
                  <UploadIcon />
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UploadImage;
