import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import "./styles.sass";

const SendTipsContainer = () => {
  const { employeeTeam } = useAppSelector((state) => state);

  const { isExist, orgName, teamName, percentageToPay } = employeeTeam;

  // if (!isExist) return <Navigate to="/no-page" />;

  return (
    <div className="welcome-page">
      <>
        <div className="title">Nice to see you here!</div>

        <div className="member-content">
          <p className="team-text">
            It turned out that you are a part of {teamName} team in {orgName}
            organization
          </p>
          <p className="percentages-text">
            You get {percentageToPay}% on every tip transaction. Once the owner
            witdraws the pending balance, smart contract will send your part
            directly to your address!
          </p>
        </div>
      </>
    </div>
  );
};

export default SendTipsContainer;
