import { useNavigate } from "react-router";
import "./styles.sass";

const Logo = ({ navigateUrl }: { navigateUrl: string }) => {
  const navigate = useNavigate();
  return (
    <div className="main-logo" onClick={() => navigate(navigateUrl)}>
      <p>
        <span className="yellow">NO</span>FIAT
      </p>
    </div>
  );
};

export default Logo;
