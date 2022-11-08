import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";

import FormInput from "../../components/FormInput";
import SelectInput, { ISelectItem } from "../../components/SelectInput";
import BaseButton from "../../components/BaseButton";
import Loader from "../../components/Loader";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getOrganization } from "../../store/types/Organization";
import {
  addErrorNotification,
  addSuccessNotification,
  shortStr,
} from "../../utils";
import { IEmployeeBase, ITipsObj } from "../../types";
import { currentBlockchainConf, currentWalletConf } from "../../consts";
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
  const { owner } = useParams();
  const dispatch = useAppDispatch();
  const { organization, loading } = useAppSelector((state) => state);

  const [employeesList, setEmployeesList] = useState<IEmployeeBase[]>([]);
  const [tipsForm, setTipsForm] = useState<ITipsObj>(initTipsForm);
  const [loadingSent, setLoadingSent] = useState<boolean>(false);

  const sendTips = async () => {
    if (owner) {
      setLoadingSent(true);
      const tipsInfo = await currentWalletConf.sendTips({
        ...tipsForm,
        ownerAddress: owner,
      });
      if (tipsInfo) {
        addSuccessNotification({ message: "Tip sent successfully" });
        setTipsForm(initTipsForm);
      } else {
        addErrorNotification({
          message: "Something went wrong while sending the tip",
        });
      }
      setLoadingSent(false);
    }
  };

  useEffect(() => {
    owner &&
      setTimeout(() => {
        dispatch(getOrganization(owner));
      }, 500);
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

  if (loading) return <Loader size="big" />;

  return (
    <div className="sentTips-page">
      <div className="title">Send tips to employee of Two Bakers in crypto</div>
      <div className="form">
        <Row gutter={[0, 36]} className="form">
          <Col span={24}>
            <div className="form-element">
              <SelectInput
                placeholder="Select employee"
                value={employeeAddress}
                list={[
                  {
                    key: "e.address",
                    value: "e.name ",
                  },
                  {
                    key: "e.address",
                    value: "e.name ",
                  },
                ]}
                onChange={(selected) =>
                  setTipsForm({
                    ...tipsForm,
                    employeeAddress: selected as string,
                  })
                }
                dropdownClassName="employees-select-list"
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
                onChange={(value) =>
                  setTipsForm((prev) => ({
                    ...tipsForm,
                    review:
                      value.length && (+value > maxReview || +value < minReview)
                        ? prev.review
                        : value,
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
                onChange={(amount) => {
                  setTipsForm({
                    ...tipsForm,
                    amount: +amount < 0 ? "0" : amount,
                  });
                }}
                addonAfter={
                  <p className="currency">
                    {currentBlockchainConf?.nativeCurrency.symbol}
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
    </div>
  );
};

export default SendTipsContainer;
