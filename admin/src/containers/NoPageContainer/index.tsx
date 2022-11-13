import { Result } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../../components/BaseButton";
import { useAppSelector } from "../../store/hooks";
import "./styles.sass";

const NoPageContainer = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state);

  const btnData = useMemo(() => {
    if (user.isAuth)
      return {
        title: "Back to Summary",
        url: "/",
      };
    return {
      title: "To registration page",
      url: "/register",
    };
  }, [user]);

  return (
    <div className="no-page">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <BaseButton
            title={btnData.title}
            onClick={() => navigate(btnData.url, { replace: true })}
            padding="8px 32px"
            fontSize="18px"
          />
        }
      />
    </div>
  );
};

export default NoPageContainer;
