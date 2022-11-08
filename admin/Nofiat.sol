// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NoFiat {
  struct Team {
    string name;
    address[] employeesInTeam;
    uint8 percentageToPay;
  }

  struct Organization {
    address owner;
    bool initialized;
    uint8 teamsPart;
    string organizationName;
    uint256 teamsAmountToWithdraw;
    Team[] teams;
    address[] allTipReceivers;
  }

  struct TipReceiver {
    address tipReceiver;
    address orgOwner;
    string tipReceiverName;
    uint256[] tipSum;
    uint256 tipAmountToWithdraw;
    uint8[] review;
    uint32[] date;
  }

  mapping(address => Organization) private _organizations;
  mapping(address => TipReceiver) private _tipReceivers;

  address[] public allOwners;

  modifier onlyOwner(address _orgOwner) {
    require(_organizations[_orgOwner].initialized, "Org doesn't exist");

    _;
  }

  // getters
  function getTotalNumberOfOrganizations() external view returns (uint256) {
    return allOwners.length;
  }

  function showTipReceiver(address _tipReceiver)
    external
    view
    returns (TipReceiver memory)
  {
    TipReceiver storage tipReceiver = _tipReceivers[_tipReceiver];
    require(tipReceiver.tipReceiver != address(0), "Receiver not working");
    return tipReceiver;
  }

  function showOrganization(address _orgOwner)
    external
    view
    onlyOwner(_orgOwner)
    returns (Organization memory)
  {
    return _organizations[_orgOwner];
  }

  function showTeamsInfoForOrg(address _orgOwner)
    external
    view
    onlyOwner(_orgOwner)
    returns (
      uint8,
      uint256,
      Team[] memory
    )
  {
    Organization storage org = _organizations[_orgOwner];
    return (org.teamsPart, org.teamsAmountToWithdraw, org.teams);
  }

  function showTeamInfo(uint256 _index, address _orgOwner)
    public
    view
    onlyOwner(_orgOwner)
    returns (Team memory)
  {
    return _organizations[_orgOwner].teams[_index];
  }

  function showReceiversInOrganization(address _orgOwner)
    public
    view
    onlyOwner(_orgOwner)
    returns (address[] memory)
  {
    return (_organizations[_orgOwner].allTipReceivers);
  }

  // Add organization, employees, teams
  function addOrganization(uint8 percentages, string memory _name) external {
    require(
      !_organizations[msg.sender].initialized,
      "You've already created organization"
    );
    require(percentages < 100, "Part can't be gt 100");

    Team memory team;
    team.name = "owner";
    team.percentageToPay = percentages;

    Organization storage newOrg = _organizations[msg.sender];
    newOrg.owner = msg.sender;
    newOrg.initialized = true;
    newOrg.teamsPart = team.percentageToPay;
    newOrg.organizationName = _name;
    newOrg.teams.push(team);
    newOrg.teams[0].employeesInTeam.push(msg.sender);

    allOwners.push(msg.sender);
  }

  function addTipReceiverToOrg(
    address _tipReceiverAddress,
    string calldata _name
  ) external onlyOwner(msg.sender) {
    TipReceiver storage newTipReceiver = _tipReceivers[_tipReceiverAddress];
    require(newTipReceiver.tipReceiver == address(0), "Already in org");

    Organization storage org = _organizations[msg.sender];
    uint256 teamsLength = org.teams.length;

    address[] memory employeesInTeam;
    for (uint256 i; i < teamsLength; ) {
      employeesInTeam = org.teams[i].employeesInTeam;
      for (uint256 u; u < employeesInTeam.length; ) {
        if (_tipReceiverAddress == employeesInTeam[u]) {
          revert("Already in team");
        }

        unchecked {
          ++u;
        }
      }

      unchecked {
        ++i;
      }
    }

    org.allTipReceivers.push(_tipReceiverAddress);

    newTipReceiver.tipReceiver = _tipReceiverAddress;
    newTipReceiver.orgOwner = msg.sender;
    newTipReceiver.tipReceiverName = _name;

    // clear fields with statistics if the employee has worked before and is applying for a new job
    assembly {
      sstore(add(newTipReceiver.slot, 0x03), 0x00)
      sstore(add(newTipReceiver.slot, 0x05), 0x00)
      sstore(add(newTipReceiver.slot, 0x06), 0x00)
    }
  }

  function addTeamToOrg(
    string calldata _name,
    address[] calldata employeesInTeam,
    uint8 _percentageToPay
  ) external onlyOwner(msg.sender) {
    require(_percentageToPay < 100, "Part can't be gt 100");

    Organization storage org = _organizations[msg.sender];
    require(
      org.teamsAmountToWithdraw == 0,
      "You need to withdraw the pending balance"
    );

    address[] memory _employeesInTeam = employeesInTeam;
    address[] memory allTipReceiversInOrg = org.allTipReceivers;

    for (uint256 i; i < _employeesInTeam.length; ) {
      for (uint256 u; u < allTipReceiversInOrg.length; ) {
        if (_employeesInTeam[i] == allTipReceiversInOrg[u]) {
          revert("Employee is tip receiver");
        }
        unchecked {
          ++u;
        }
      }

      unchecked {
        ++i;
      }
    }

    assembly {
      mstore(0x40, allTipReceiversInOrg)
    }

    uint256 teamsLength = org.teams.length;
    bytes32 hashName = keccak256(bytes(_name));

    Team memory team;
    for (uint256 i; i < teamsLength; ) {
      team = org.teams[i];
      if (hashName == keccak256(bytes(team.name))) {
        revert("Team exists");
      }

      for (uint256 u; u < _employeesInTeam.length; ) {
        for (uint256 j; j < team.employeesInTeam.length; ) {
          if (_employeesInTeam[u] == team.employeesInTeam[j]) {
            revert("Employee in other team");
          }

          unchecked {
            ++j;
          }
        }

        unchecked {
          ++u;
        }
      }

      unchecked {
        ++i;
      }
    }
    assembly {
      mstore(0x40, team)
    }

    Team memory newTeam = Team(_name, _employeesInTeam, _percentageToPay);
    org.teams.push(newTeam);
    unchecked {
      require(
        (org.teamsPart += _percentageToPay) < 101,
        "Team part can't be gt 100"
      );
    }
  }

  function addEmployeeToTeam(string calldata _name, address _employeeToAdd)
    external
    onlyOwner(msg.sender)
  {
    Organization storage org = _organizations[msg.sender];
    address[] memory allTipReceiversInOrg = org.allTipReceivers;

    for (uint256 i; i < allTipReceiversInOrg.length; ) {
      if (allTipReceiversInOrg[i] == _employeeToAdd) {
        revert("Employee is tip receiver");
      }
      unchecked {
        ++i;
      }
    }

    assembly {
      mstore(0x40, allTipReceiversInOrg)
    }

    bool teamExist;

    uint256 teamsLength = org.teams.length;
    bytes32 hashName = keccak256(bytes(_name));

    uint256 teamIndex;
    Team memory team;
    for (uint256 i; i < teamsLength; ) {
      team = org.teams[i];
      if (hashName == keccak256(bytes(team.name))) {
        teamExist = true;
        teamIndex = i;
      }

      for (uint256 u; u < team.employeesInTeam.length; ) {
        if (_employeeToAdd == team.employeesInTeam[u]) {
          revert("Employee in other team");
        }

        unchecked {
          ++u;
        }
      }

      unchecked {
        ++i;
      }
    }

    require(teamExist, "Team doesn't exist");
    org.teams[teamIndex].employeesInTeam.push(_employeeToAdd);
  }

  // Removing employees, teams
  function removeTipReceiverFromOrg(address _tipReceiver)
    external
    onlyOwner(msg.sender)
  {
    TipReceiver storage tipReceiver = _tipReceivers[_tipReceiver];
    require(
      tipReceiver.tipReceiver != address(0) &&
        tipReceiver.orgOwner == msg.sender,
      "No employee in org"
    );

    Organization storage org = _organizations[msg.sender];
    address[] memory allTipReceivers = org.allTipReceivers;

    for (uint256 i; i < allTipReceivers.length; ) {
      if (_tipReceiver == allTipReceivers[i]) {
        uint256 tipAmountToWithdraw = tipReceiver.tipAmountToWithdraw;

        if (tipAmountToWithdraw > 0) {
          tipReceiver.tipAmountToWithdraw = 0;

          (bool success, ) = _tipReceiver.call{ value: tipAmountToWithdraw }(
            ""
          );
          require(success, "Transfer error");
        }

        // this field shows whether the tipReceiver is currently an employee of an organization or not
        tipReceiver.tipReceiver = address(0);

        org.allTipReceivers[i] = allTipReceivers[allTipReceivers.length - 1];
        org.allTipReceivers.pop();
        break;
      }

      unchecked {
        ++i;
      }
    }
  }

  function deleteTeamFromOrg(string calldata _name)
    external
    onlyOwner(msg.sender)
  {
    bool teamInOrg;

    Organization storage org = _organizations[msg.sender];
    require(
      org.teamsAmountToWithdraw == 0,
      "You need to withdraw the pending balance"
    );

    uint256 teamsInOrgLength = org.teams.length;
    bytes32 hashName = keccak256(bytes(_name));
    for (uint256 i; i < teamsInOrgLength; ) {
      if (hashName == keccak256(bytes(org.teams[i].name))) {
        teamInOrg = true;

        unchecked {
          org.teamsPart -= org.teams[i].percentageToPay;
          org.teams[i] = org.teams[teamsInOrgLength - 1];
        }

        org.teams.pop();

        break;
      }

      unchecked {
        ++i;
      }
    }
    require(teamInOrg, "Team doesn't exist");
  }

  function removeEmployeeFromTeam(string calldata _name, address _employee)
    external
    onlyOwner(msg.sender)
  {
    bool teamExist;
    bool employeeInTeam;

    Organization storage org = _organizations[msg.sender];

    uint256 teamsLength = org.teams.length;
    bytes32 hashName = keccak256(bytes(_name));

    Team memory team;
    for (uint256 i; i < teamsLength; ) {
      team = org.teams[i];
      if (hashName == keccak256(bytes(team.name))) {
        teamExist = true;

        for (uint256 u; u < team.employeesInTeam.length; ) {
          if (_employee == team.employeesInTeam[u]) {
            employeeInTeam = true;

            org.teams[i].employeesInTeam[u] = team.employeesInTeam[
              team.employeesInTeam.length - 1
            ];
            org.teams[i].employeesInTeam.pop();
            break;
          }

          unchecked {
            ++u;
          }
        }
        break;
      }

      unchecked {
        ++i;
      }
    }

    require(teamExist, "Team doesn't exist");
    require(employeeInTeam, "Employee not in team");
  }

  // Changes
  function changeTeamName(string calldata _oldName, string calldata _newName)
    external
    onlyOwner(msg.sender)
  {
    bool teamExist;
    Team[] storage teams = _organizations[msg.sender].teams;
    uint256 teamsLength = teams.length;
    bytes32 hashOldName = keccak256(bytes(_oldName));
    bytes32 hashNewName = keccak256(bytes(_newName));

    for (uint256 i; i < teamsLength; ) {
      bytes32 teamName = keccak256(bytes(teams[i].name));
      if (hashNewName == teamName) {
        revert("Name already exists");
      }

      if (hashOldName == teamName) {
        teamExist = true;
        teams[i].name = _newName;
      }
      unchecked {
        ++i;
      }
    }
    require(teamExist, "Team doesn't exist");
  }

  function changeTeamPercentage(
    string calldata _teamName,
    uint8 _newPercentageToPay
  ) external onlyOwner(msg.sender) {
    require(
      _organizations[msg.sender].teamsAmountToWithdraw == 0,
      "You need to withdraw tips"
    );
    require(_newPercentageToPay < 101, "Part can't be gt 100");

    bool teamExist;
    Organization storage org = _organizations[msg.sender];
    uint256 teamsLength = org.teams.length;
    bytes32 hashName = keccak256(bytes(_teamName));

    for (uint256 i; i < teamsLength; ) {
      if (hashName == keccak256(bytes(org.teams[i].name))) {
        teamExist = true;

        unchecked {
          require(
            (org.teamsPart =
              org.teamsPart -
              org.teams[i].percentageToPay +
              _newPercentageToPay) < 101,
            "Team part can't be gt 100"
          );
        }
        org.teams[i].percentageToPay = _newPercentageToPay;

        break;
      }

      unchecked {
        ++i;
      }
    }
    require(teamExist, "Team doesn't exist");
  }

  function changeTipReceiverName(string calldata _name, address _tipReceiver)
    external
    onlyOwner(msg.sender)
  {
    TipReceiver storage tipReceiver = _tipReceivers[_tipReceiver];
    require(
      tipReceiver.tipReceiver != address(0) &&
        tipReceiver.orgOwner == msg.sender,
      "Employee not in the org"
    );

    tipReceiver.tipReceiverName = _name;
  }

  // Sending tips / Withdrawing tips
  function sendTips(
    address _owner,
    address _tipReceiver,
    uint8 _review
  ) external payable onlyOwner(_owner) {
    require(_review > 0 && _review < 6, "Review should be <= 5 and > 0");

    TipReceiver storage tipReceiver = _tipReceivers[_tipReceiver];
    require(
      tipReceiver.tipReceiver != address(0) && tipReceiver.orgOwner == _owner,
      "Wrong tip receiver"
    );

    Organization storage org = _organizations[_owner];

    uint256 teamPart;
    unchecked {
      teamPart = (msg.value * org.teamsPart) / 100;
    }

    tipReceiver.review.push(_review);
    tipReceiver.date.push(uint32(block.timestamp));

    unchecked {
      org.teamsAmountToWithdraw += teamPart;
      tipReceiver.tipSum.push(msg.value - teamPart);
      tipReceiver.tipAmountToWithdraw += msg.value - teamPart;
    }
  }

  function withdrawTipsByEmployee() external {
    TipReceiver storage tipReceiver = _tipReceivers[msg.sender];
    uint256 tipAmountToWithdraw = tipReceiver.tipAmountToWithdraw;
    require(tipAmountToWithdraw > 0, "Employee must have received tips");

    tipReceiver.tipAmountToWithdraw = 0;

    (bool success, ) = msg.sender.call{ value: tipAmountToWithdraw }("");
    require(success, "Error occured. Try again!");
  }

  function withdrawTeams() external onlyOwner(msg.sender) {
    Organization storage org = _organizations[msg.sender];
    uint256 teamsAmountToWithdraw = org.teamsAmountToWithdraw;
    require(teamsAmountToWithdraw > 0, "No funds");
    org.teamsAmountToWithdraw = 0;

    uint256 onePercentTip;
    unchecked {
      onePercentTip = teamsAmountToWithdraw / org.teamsPart;
    }

    uint256 teamsLength = org.teams.length;
    uint256 tipsToEmployee;
    for (uint256 i; i < teamsLength; ) {
      Team memory team = org.teams[i];
      require(team.employeesInTeam.length > 0, "Division zero");

      unchecked {
        tipsToEmployee =
          (onePercentTip * team.percentageToPay) /
          team.employeesInTeam.length;
      }

      for (uint256 u; u < team.employeesInTeam.length; ) {
        (bool success, ) = team.employeesInTeam[u].call{
          value: tipsToEmployee
        }("");

        require(success, "Transfer failed");

        unchecked {
          ++u;
        }
      }

      unchecked {
        ++i;
      }
    }
  }
}
