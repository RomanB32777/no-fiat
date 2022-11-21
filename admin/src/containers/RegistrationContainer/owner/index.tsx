import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import BaseButton from "../../../components/BaseButton";
import FormInput from "../../../components/FormInput";
import { WalletContext } from "../../../contexts/Wallet";
import { useAppDispatch } from "../../../store/hooks";
import { addNotValidForm, isValidateFilled } from "../../../utils";
import { getWallet } from "../../../store/types/Wallet";
import { ICreateOrganization } from "../../../types";
// import { currentWalletConf } from "../../../consts";

const maxPercentage = 100;
const minPercentage = 0;
const re = /^[0-9\b]+$/;

const initOwnerRegistrationData: ICreateOrganization = {
  name: "",
  percentages: 0,
};

const OwnerRegistrationBlock = () => {
  const { currentWalletConf } = useContext(WalletContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
  const [formData, setFormData] = useState<ICreateOrganization>(
    initOwnerRegistrationData
  );

  const createOrganization = async () => {
    const isValidate = isValidateFilled(Object.values(formData));
    if (isValidate) {
      setLoadingRegister(true);
      const organizationData = await currentWalletConf.addOrganization(
        formData
      );
      if (organizationData) {
        dispatch(getWallet());
        navigate("/employees", { replace: true });
      }
      setLoadingRegister(false);
    } else {
      addNotValidForm();
    }
  };

  const { name, percentages } = formData;
  return (
    <div className="owner">
      <div className="input">
        <FormInput
          value={name}
          placeholder="Name of organization"
          onChange={({ target }) =>
            setFormData({ ...formData, name: target.value })
          }
        />
      </div>
      <div className="input">
        <FormInput
          value={percentages ? String(percentages) : ""}
          typeInput="number"
          maxNumber={100}
          placeholder="Percentage you take on every tip received"
          onChange={({ target }) =>
            setFormData((prev) => {
              console.log(target.value, re.test(target.value));

              return {
                ...formData,
                percentages:
                  +target.value > maxPercentage || +target.value < minPercentage //||  (!re.test(target.value) && target.value !== "")
                    ? // ||
                      //
                      prev.percentages
                    : +target.value, //.replace(/^[0-9\b]+$/, ""),
              };
            })
          }
        />
      </div>

      <BaseButton
        title="Create organization"
        onClick={createOrganization}
        padding="10px 30px"
        fontSize="21px"
        modificator="btn owner_btn"
        disabled={loadingRegister}
      />
    </div>
  );
};

export default OwnerRegistrationBlock;
