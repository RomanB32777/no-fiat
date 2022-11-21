import { useContext, useMemo, useState } from "react";
import { Col, Row } from "antd";

import BaseButton from "../../../../components/BaseButton";
import EmptyBlock from "../../../../components/EmptyBlock";
import CardItem from "../../blocks/CardItem";
import TeamModal from "../TeamModal";
import Loader from "../../../../components/Loader";
import { WalletContext } from "../../../../contexts/Wallet";

import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getOrganization } from "../../../../store/types/Organization";
import {
  checkChangedEmployees,
  checkExistAddressInOrg,
  sendTeamData,
} from "../../utils";
import {
  addErrorNotification,
  addNotValidForm,
  isValidateFilled,
  shortStr,
} from "../../../../utils";
import { ITeam } from "../../../../types";
// import { currentWalletConf } from "../../../../consts";

const initTeam: ITeam = {
  name: "",
  percentageToPay: 0,
  employeesInTeam: [],
};

const TeamsBlock = () => {
  const { currentWalletConf } = useContext(WalletContext);
  const dispatch = useAppDispatch();
  const { isMobile } = useWindowDimensions();
  const { organization } = useAppSelector((state) => state);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [teamForm, setTeamForm] = useState<ITeam>({
    ...initTeam,
  });
  const [editedTeam, setEditedTeam] = useState<string | null>(null);

  const { allTipReceivers, teams, teamsAmountToWithdraw } = organization;

  const isEmptyTeamsAmountToWithdraw = useMemo(
    () => teamsAmountToWithdraw === 0,
    [teamsAmountToWithdraw]
  );

  const isOwnerTeam = (name: string) => name === "owner";

  const openEditModal = (team: ITeam) => {
    setTeamForm(team);
    setIsOpenModal(true);
    setEditedTeam(team.name);
  };

  const closeModal = () => {
    setTeamForm({
      ...initTeam,
    });
    setIsOpenModal(false);
    setEditedTeam(null);
  };

  const deleteItem = async ({ name }: ITeam) => {
    if (isEmptyTeamsAmountToWithdraw) {
      const itemInfo = await currentWalletConf.deleteTeamFromOrg(name);
      itemInfo && dispatch(getOrganization());
    } else {
      addErrorNotification({
        title:
          "In order to complete this action you need to withdraw your pending balance! You can do that in Tips section.",
      });
    }
  };

  const deleteEmployeeInTeam = async (deletedEmployee: string) => {
    if (editedTeam) {
      setLoadingTeam(true);
      const updatedTeamInfo = await currentWalletConf.removeEmpoloyeeFromTeam(
        editedTeam,
        deletedEmployee
      );
      console.log(updatedTeamInfo);
      dispatch(getOrganization());
      setLoadingTeam(false);
      return updatedTeamInfo;
    }
  };

  const checkExistAddresses = async (employeesInTeam: string[]) => {
    const isExistAddressesInOrg = employeesInTeam.filter((address) =>
      checkExistAddressInOrg({
        allTipReceivers,
        teams,
        checkAddress: address,
      })
    );

    const checkExistAddressesInTeamsContract = await Promise.all(
      employeesInTeam.map(async (address) => {
        const { isExist } = await currentWalletConf.checkIsTeamMember(address);
        return { isExist, address };
      })
    );

    const isExistAddressesInTeamsContract = checkExistAddressesInTeamsContract
      .filter((e) => e.isExist)
      .map((e) => e.address);

    const existAddresses = [
      ...isExistAddressesInOrg,
      ...isExistAddressesInTeamsContract,
    ];

    if (existAddresses.length) {
      setLoadingTeam(false);
      addErrorNotification({
        title: `Tip Receiver${
          existAddresses.length > 1 ? "s" : ""
        } with address ${existAddresses
          .map((address) => shortStr(address, 12))
          .join(", ")} has already been added to the organization`,
      });
      return true;
    } else return false;
  };

  const sendData = async ({ team, field }: sendTeamData) => {
    const isValidate = Object.values(team).every((val) =>
      Array.isArray(val) ? isValidateFilled(val) : Boolean(val)
    );
    if (isValidate) {
      setLoadingTeam(true);
      const isExistTeamInOrg = organization.teams.some(
        (t) => t.name === team.name
      );

      if (!editedTeam) {
        if (isExistTeamInOrg) {
          setLoadingTeam(false);
          return addErrorNotification({
            title:
              "A team with the same name already exists in the organization",
          });
        }
        const isExistAddresses = await checkExistAddresses(
          team.employeesInTeam
        );
        if (isExistAddresses) return;
      }

      if (editedTeam) {
        let updatedTeamInfo;
        switch (field) {
          case "name":
            const findSimilarTeam = teams.some((t) => t.name === team.name);
            if (!findSimilarTeam) {
              updatedTeamInfo = await currentWalletConf.changeTeamName(
                editedTeam,
                team.name
              );
            } else {
              addErrorNotification({
                title: "Team with such name has already been created",
              });
            }
            break;

          case "percentageToPay":
            if (isEmptyTeamsAmountToWithdraw) {
              updatedTeamInfo = await currentWalletConf.changeTeamPercentage(
                editedTeam,
                team.percentageToPay
              );
            } else {
              addErrorNotification({
                title:
                  "In order to complete this action you need to withdraw your pending balance! You can do that in Tips section.",
              });
            }
            break;

          case "employeesInTeam":
            const beforeEditTeam = organization.teams.find(
              (t) => t.name === editedTeam
            );
            if (beforeEditTeam) {
              const addedEmployee = checkChangedEmployees(team, beforeEditTeam);
              if (addedEmployee) {
                // console.log(addedEmployee);
                const isExistAddresses = await checkExistAddresses([
                  addedEmployee,
                ]);
                if (isExistAddresses) return;

                updatedTeamInfo = await currentWalletConf.addEmployeeToTeam(
                  editedTeam,
                  addedEmployee
                );
                console.log("updatedTeamInfo");
              }
            }
            break;

          default:
            addErrorNotification({
              title: "Team has not been changed",
            });
        }
        console.log("is updatedTeamInfo", updatedTeamInfo);
        if (Boolean(updatedTeamInfo)) {
          console.log(updatedTeamInfo);
          dispatch(getOrganization());
          setTeamForm(team);
          // closeModal();
        }
      } else {
        const findSimilarTeam = teams.some((t) => t.name === team.name);
        if (!findSimilarTeam) {
          const newTeam = await currentWalletConf.addTeamToOrg(team);
          if (newTeam) {
            // console.log(team, newTeam);
            dispatch(getOrganization());
            closeModal();
          }
        } else {
          addErrorNotification({
            title: "Team with such name has already been created",
          });
        }
      }
      setLoadingTeam(false);
    } else {
      return addNotValidForm();
    }
  };

  return (
    <div className="block teams-list">
      <div className="header">
        <Row justify="space-between" align="middle">
          <Col xs={15} sm={18}>
            <p className="section-title title">Create and manage your teams</p>
          </Col>
          <Col xs={6} md={4}>
            <div className="btn">
              <BaseButton
                title="Add"
                onClick={() => setIsOpenModal(true)}
                fontSize={isMobile ? "20px" : "25px"}
                padding={`10px ${isMobile ? 20 : 30}px`}
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="list">
        {!organization.organizationName ? (
          <Loader size="large" />
        ) : (
          <Row gutter={[16, 32]}>
            {Boolean(teams.length) ? (
              teams.map((team) => (
                <Col xs={24} sm={12} key={team.name}>
                  <CardItem
                    data={team}
                    getCardName={async () => team.name}
                    openEditModal={openEditModal}
                    deleteItem={deleteItem}
                    disabledDelete={isOwnerTeam(team.name)}
                  />
                </Col>
              ))
            ) : (
              <EmptyBlock />
            )}
          </Row>
        )}
      </div>
      <TeamModal
        isOpen={isOpenModal}
        loading={loadingTeam}
        editedTeam={editedTeam}
        teamForm={teamForm}
        closeModal={closeModal}
        sendData={sendData}
        deleteEmployeeInTeam={deleteEmployeeInTeam}
        disabledEdit={editedTeam ? isOwnerTeam(editedTeam) : false}
      />
    </div>
  );
};

export default TeamsBlock;
