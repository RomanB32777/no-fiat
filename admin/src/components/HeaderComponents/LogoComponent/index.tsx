import clsx from "clsx";
import { useNavigate } from "react-router";
import "./styles.sass";

const Logo = ({
  navigateUrl,
  modificator,
}: {
  navigateUrl?: string;
  modificator?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={clsx("main-logo", {
        [modificator as string]: modificator,
      })}
      onClick={() => navigateUrl && navigate(navigateUrl)}
    >
      <p>
        <span className="yellow">NO</span>FIAT
      </p>
    </div>
  );
};

export default Logo;
