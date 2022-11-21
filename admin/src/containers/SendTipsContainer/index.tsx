import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import clsx from "clsx";

import FormInput from "../../components/FormInput";
import SelectInput, { ISelectItem } from "../../components/SelectInput";
import BaseButton from "../../components/BaseButton";
import Loader from "../../components/Loader";
import { WalletContext } from "../../contexts/Wallet";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getOrganization } from "../../store/types/Organization";
// import { , currentWalletConf } from "../../consts";
import {
  addErrorNotification,
  addNotValidForm,
  addSuccessNotification,
  isValidateFilled,
  shortStr,
} from "../../utils";
import { IEmployeeBase, ITipsObj } from "../../types";
import "./styles.sass";

const SelectDropdown = (menu: React.ReactElement) => {
  return <div className="select-dropdown">{menu}</div>;
};

const SelectDropdownOption = (item: ISelectItem) => (
  <span
    onMouseDown={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    className="select-option"
  >
    <span className="select-option-value">{item.value}</span>
    <span className="select-option-key">{shortStr(item.key, 10)}</span>
  </span>
);

const initTipsForm: ITipsObj = {
  ownerAddress: "",
  employeeAddress: "",
  review: "",
  amount: "",
};

const minReview = 1;
const maxReview = 5;

const SendTipsContainer = () => {
  const { currentWalletConf } = useContext(WalletContext);
  const { owner } = useParams();
  const dispatch = useAppDispatch();
  const { organization, loading } = useAppSelector((state) => state);

  const [employeesList, setEmployeesList] = useState<IEmployeeBase[]>([]);
  const [tipsForm, setTipsForm] = useState<ITipsObj>(initTipsForm);
  const [loadingSent, setLoadingSent] = useState<boolean>(false);

  const sendTips = async () => {
    const isValidate = isValidateFilled(Object.values(tipsForm));
    if (isValidate && owner) {
      setLoadingSent(true);
      const balance = await currentWalletConf.getBalance();
      if (balance >= Number(amount)) {
        const tipsInfo = await currentWalletConf.sendTips(tipsForm);
        if (tipsInfo) {
          addSuccessNotification({ title: "Tip sent successfully" });
          setTipsForm({ ...initTipsForm, ownerAddress: owner });
        }
      } else {
        addErrorNotification({
          title: "Not enough balance",
        });
      }
      setLoadingSent(false);
    } else {
      addNotValidForm();
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { userAddress } = await currentWalletConf.getWalletUserData();
      if (userAddress && owner) {
        setTipsForm({ ...tipsForm, ownerAddress: owner });
        setTimeout(() => {
          dispatch(getOrganization(owner));
        }, 500);
      }
    };

    getData();
    // dispatch(getWallet());
  }, [owner]);

  useEffect(() => {
    const getEmployeesList = async () => {
      const { allTipReceivers } = organization;
      if (allTipReceivers.length) {
        const employeesWithName: IEmployeeBase[] = await Promise.all(
          allTipReceivers.map(async (address) => {
            const { name, photoLink } = await currentWalletConf.getEmployeeBase(
              address
            );
            return { name, address, photoLink };
          })
        );
        setEmployeesList(employeesWithName);
      } else setEmployeesList([]);
    };

    organization && getEmployeesList();
  }, [organization]);

  const employeesListSelect = useMemo(
    () => employeesList.map((e) => ({ key: e.address, value: e.name })),
    [employeesList]
  );

  const { employeeAddress, review, amount } = tipsForm;

  return (
    <div className="sentTips-page">
      {loading ? (
        <Loader size="large" />
      ) : (
        <>
          <div className="title">
            Send tips to employee of {organization.organizationName} in crypto
          </div>
          <>
            <div className="form">
              <Row gutter={[0, 36]} className="form">
                <Col span={24}>
                  <div className="form-element">
                    <SelectInput
                      placeholder="Select employee"
                      value={employeeAddress}
                      list={employeesListSelect}
                      onChange={(selected) =>
                        setTipsForm({
                          ...tipsForm,
                          employeeAddress: selected as string,
                        })
                      }
                      dropdownClassName={clsx("employees-select-list", {
                        small: employeesListSelect.length < 2,
                      })}
                      renderOption={SelectDropdownOption}
                      dropdownRender={SelectDropdown}
                      disabled={loadingSent}
                      modificator="select"
                    />
                  </div>
                </Col>
                <Col span={24}>
                  <div className="form-element">
                    <FormInput
                      value={review}
                      typeInput="number"
                      minNumber={minReview}
                      maxNumber={maxReview}
                      placeholder={`Assess service from ${minReview} to ${maxReview}`}
                      onChange={({ target }) =>
                        setTipsForm((prev) => ({
                          ...tipsForm,
                          review:
                            target.value.length &&
                            (+target.value > maxReview ||
                              +target.value < minReview)
                              ? prev.review
                              : target.value,
                        }))
                      }
                      disabled={loadingSent}
                    />
                  </div>
                </Col>

                <Col span={24}>
                  <div className="form-element">
                    <FormInput
                      value={amount}
                      onChange={({ target }) => {
                        setTipsForm({
                          ...tipsForm,
                          amount: +target.value < 0 ? "0" : target.value,
                        });
                      }}
                      addonAfter={
                        <p className="currency">
                          {currentWalletConf?.nativeCurrency.symbol}
                        </p>
                      }
                      typeInput="number"
                      modificator="inputs-amount"
                      placeholder="Insert tip sum"
                      disabled={loadingSent}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="btn">
              <BaseButton
                title="Send tips"
                onClick={sendTips}
                padding="10px 25px"
                fontSize="21px"
                disabled={loadingSent}
              />
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default SendTipsContainer;
