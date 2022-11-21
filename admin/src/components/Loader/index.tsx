import { Spin } from "antd";
import "./styles.sass";

declare type typeSizeLoader = "large" | "default" | "small";

const Loader = ({ size }: { size: typeSizeLoader }) => {
  return <Spin size={size} />;
};

export default Loader;
