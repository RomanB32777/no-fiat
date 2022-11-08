import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import BaseButton from "../../components/BaseButton";
import Loader from "../../components/Loader";
import OwnerRegistrationBlock from "./owner";

import { userRoles } from "../../types";
import { getWallet } from "../../store/types/Wallet";
import "./styles.sass";

type choosenRoleTypes = userRoles | "none";

type IRolesRegister = {
  [key in choosenRoleTypes]: React.ReactNode;
};

const registrationTitle: IRolesRegister = {
  owner: "Add organization",
  employee: "Organization employee",
  none: "To start using service please Log-in",
};

const RegistrationContainer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state);
  const [choosenRole, setChoosenRole] = useState<choosenRoleTypes>("none");

  useEffect(() => {
    state && window.history.replaceState({ state: {} }, "");
  }, [state]);

  useEffect(() => {
    user.isAuth && navigate("/", { replace: true });
    !state && dispatch(getWallet());
  }, [user, state]);

  const registrationBlock: IRolesRegister = {
    owner: <OwnerRegistrationBlock />,
    employee: null,
    none: (
      <div className="choose_role">
        <BaseButton
          title="Log-in"
          onClick={() => setChoosenRole("owner")}
          padding="10px 30px"
          fontSize="21px"
          modificator="choose_role_btn"
        />
      </div>
    ),
  };

  if (loading) return <Loader size="big" />;

  return (
    <div className="registration-block">
      {choosenRole === "owner" && (
        <div className="description">
          <p>You aren’t a part of any organization yet.</p>
          <p>Ask the owner of your organization to add you as Tip Receiver.</p>
          <p>
            In case you want to add your own organization to NoFiat, please fill
            in registration fields below.
          </p>
        </div>
      )}
      <span className="title">{registrationTitle[choosenRole]}</span>
      {registrationBlock[choosenRole]}
    </div>
  );
};

export default RegistrationContainer;
