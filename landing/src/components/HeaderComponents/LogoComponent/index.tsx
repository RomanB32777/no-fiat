import clsx from "clsx";
import "./styles.sass";

const Logo = ({
  navigateUrl,
  modificator,
}: {
  navigateUrl: string;
  modificator?: string;
}) => {
  return (
    <div
      className={clsx("main-logo", {
        [modificator as string]: modificator,
      })}
      onClick={() => {}}
    >
      <p>
        <span className="yellow">NO</span>FIAT
      </p>
    </div>
  );
};

export default Logo;
