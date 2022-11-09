import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const ConfirmPopup = ({
  children,
  disabled = false,
  confirm,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  confirm: () => void;
}) => {
  return (
    <Popconfirm
      title="Are you sure？"
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      onConfirm={confirm}
      disabled={disabled}
    >
      {children}
    </Popconfirm>
  );
};

export default ConfirmPopup;
