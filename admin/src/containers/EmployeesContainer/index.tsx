import TeamsBlock from "./teams/TeamsBlock";
import EmployeesBlock from "./employees/EmployeesBlock";
import "./styles.sass";

const EmployeesContainer = () => {
  return (
    <div className="employees-page">
      <div className="header">
        <p className="section-title title">Employees</p>
      </div>
      <div className="content">
        <TeamsBlock />
        <EmployeesBlock />
      </div>
    </div>
  );
};

export default EmployeesContainer;
