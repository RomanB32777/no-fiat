import { Spin } from "antd";
import "./styles.sass";

declare type typeSizeLoader = "large" | "default" | "small";

const Loader = ({ size }: { size: typeSizeLoader }) => {
  return (
    <Spin size={size} />
    // <div className={`loader loader-${size}`}>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    // </div>
  );
};

export default Loader;
