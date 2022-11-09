import { Empty } from "antd";
import "./styles.sass";

const EmptyBlock = () => (
  <Empty className="empty-el" description="No data yet" image={null} />
);

export default EmptyBlock;
