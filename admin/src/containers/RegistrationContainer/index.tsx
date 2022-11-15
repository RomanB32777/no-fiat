import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import Loader from "../../components/Loader";
import OwnerRegistrationBlock from "./owner";

import { getWallet } from "../../store/types/Wallet";
import "./styles.sass";

const RegistrationContainer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state);

  useEffect(() => {
    state && window.history.replaceState({ state: {} }, "");
  }, [state]);

  useEffect(() => {
    user.isAuth && navigate("/", { replace: true });
    !state && dispatch(getWallet());
  }, [user, state]);

  return (
    <div className="registration-block">
      {loading ? (
        <Loader size="large" />
      ) : (
        <>
          <div className="description">
            <p>You aren’t a part of any organization yet.</p>
            <p>
              In case you want to add your own organization to NoFiat, please
              fill in registration fields below.
            </p>
          </div>
          <span className="title">Add organization</span>
          <OwnerRegistrationBlock />
        </>
      )}
    </div>
  );
};

export default RegistrationContainer;
