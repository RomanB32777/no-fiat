import { Col, Empty, Row } from "antd";
import { useState } from "react";
import BaseButton from "../../../../components/BaseButton";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getOrganization } from "../../../../store/types/Organization";
import { addNotification, isValidateFilled } from "../../../../utils";
import { ITeam, teamFields } from "../../../../types";
import { currentWalletConf } from "../../../../consts";
import CardItem from "../../blocks/CardItem";
import TeamModal from "../TeamModal";

const checkChangedEmployees = (firstTeamState: ITeam, secondTeamState: ITeam) =>
  firstTeamState.employeesInTeam.find(
    (e) => secondTeamState.employeesInTeam.indexOf(e) < 0
  );

const initTeam: ITeam = {
  name: "",
  percentageToPay: 0,
  employeesInTeam: [],
};

const TeamsBlock = () => {
  const dispatch = useAppDispatch();
  const { isMobile } = useWindowDimensions();
  const { organization } = useAppSelector((state) => state);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [teamForm, setTeamForm] = useState<ITeam>({
    ...initTeam,
  });
  const [editedTeam, setEditedTeam] = useState<string | null>(null);

  const { teams } = organization;

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

  const deleteItem = async (name: string) => {
    const itemInfo = await currentWalletConf.deleteTeamFromOrg(name);
    itemInfo && dispatch(getOrganization());
  };

  const sendData = async ({
    team,
    field,
  }: {
    team: ITeam;
    field: teamFields | null;
  }) => {
    const isValidate = Object.values(team).every((val) =>
      Array.isArray(val) ? isValidateFilled(val) : Boolean(val)
    );
    if (isValidate) {
      const isExistTeamInOrg = organization.teams.some(
        (t) => t.name === team.name
      );
      if (!editedTeam && isExistTeamInOrg)
        return addNotification({
          type: "warning",
          title: "Is exists",
          message:
            "A team with the same name already exists in the organization",
        });

      console.log(editedTeam, field);

      if (editedTeam) {
        let updatedTeamInfo;
        switch (field) {
          case "name":
            updatedTeamInfo = await currentWalletConf.changeTeamName(
              editedTeam,
              team.name
            );
            break;

          case "percentageToPay":
            updatedTeamInfo = await currentWalletConf.changeTeamPercentage(
              editedTeam,
              team.percentageToPay
            );
            break;

          case "employeesInTeam":
            const beforeEditTeam = organization.teams.find(
              (t) => t.name === editedTeam
            );
            if (beforeEditTeam) {
              if (
                beforeEditTeam.employeesInTeam.length <
                team.employeesInTeam.length
              ) {
                const addedEmployee = checkChangedEmployees(
                  team,
                  beforeEditTeam
                );
                addedEmployee &&
                  (await currentWalletConf.addEmployeeToTeam(
                    editedTeam,
                    addedEmployee
                  ));
              } else {
                const deletedEmployee = checkChangedEmployees(
                  beforeEditTeam,
                  team
                );
                deletedEmployee &&
                  (await currentWalletConf.removeEmpoloyeeFromTeam(
                    editedTeam,
                    deletedEmployee
                  ));
              }
            }
            break;

          default:
            break;
        }
        if (updatedTeamInfo) {
          console.log(updatedTeamInfo);
          dispatch(getOrganization());
          closeModal();
          return updatedTeamInfo;
        }
      } else {
        const newTeam = await currentWalletConf.addTeamToOrg(team);
        if (newTeam) {
          console.log(team, newTeam);
          dispatch(getOrganization());
          closeModal();
          return newTeam;
        }
      }
    } else {
      addNotification({
        type: "warning",
        title: "Not all fields are filled",
      });
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
        <Row gutter={[16, 16]}>
          {Boolean(teams.length) ? (
            teams.map((team) => (
              <Col xs={24} sm={12} key={team.name}>
                <CardItem
                  data={team}
                  getCardName={async () => team.name}
                  openEditModal={openEditModal}
                  deleteItem={deleteItem}
                />
              </Col>
            ))
          ) : (
            <Empty className="empty-el" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Row>
      </div>
      <TeamModal
        isOpen={isOpenModal}
        editedTeam={editedTeam}
        teamForm={teamForm}
        closeModal={closeModal}
        sendData={sendData}
      />
    </div>
  );
};

export default TeamsBlock;
