import { useNavigate } from "react-router";
import clsx from "clsx";
import "./styles.sass";

const Logo = ({
  navigateUrl,
  modificator,
}: {
  navigateUrl: string;
  modificator?: string;
}) => {
  const navigate = useNavigate();
  const logoClick = () => navigate("/");

  return (
    <div
      className={clsx("main-logo", {
        [modificator as string]: modificator,
      })}
      onClick={logoClick}
    >
      <p>
        <span className="yellow">NO</span>FIAT
      </p>
    </div>
  );
};

export default Logo;
