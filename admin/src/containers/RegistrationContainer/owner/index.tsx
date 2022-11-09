import { useState } from "react";
import { useNavigate } from "react-router";

import BaseButton from "../../../components/BaseButton";
import FormInput from "../../../components/FormInput";
import { useAppDispatch } from "../../../store/hooks";
import { addNotification, isValidateFilled } from "../../../utils";
import { getWallet } from "../../../store/types/Wallet";
import { ICreateOrganization } from "../../../types";
import { currentWalletConf } from "../../../consts";

const initOwnerRegistrationData: ICreateOrganization = {
  name: "",
  percentages: 0,
};

const OwnerRegistrationBlock = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ICreateOrganization>(
    initOwnerRegistrationData
  );

  const createOrganization = async () => {
    const isValidate = isValidateFilled(Object.values(formData));
    if (isValidate) {
      const organizationData = await currentWalletConf.addOrganization(
        formData
      );
      if (organizationData) {
        console.log("before");
        dispatch(getWallet());
        console.log("after");
        navigate("/employees", { replace: true });
      }
    } else {
      addNotification({
        type: "warning",
        title: "Not all fields are filled",
      });
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
          onChange={(value) =>
            setFormData((prev) => ({
              ...formData,
              percentages: +value > 100 ? prev.percentages : +value,
            }))
          }
        />
      </div>

      <BaseButton
        title="Create organization"
        onClick={createOrganization}
        padding="10px 30px"
        fontSize="21px"
        modificator="btn owner_btn"
      />
    </div>
  );
};

export default OwnerRegistrationBlock;
