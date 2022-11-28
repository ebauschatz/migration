const JoinTeamsList = (props) => {
    function handleTeamSelected(team) {
        props.setSelectedTeam(team);
        props.setShowJoinModal(true);
    }

    return (
        <div>
            Available Teams:
            <button type="button" onClick={() => props.setShowCreateTeamModal(true)}>Create Team</button>
            {props.teams.map((team) => {
                return <div key={team.id} onClick={() => handleTeamSelected(team)}>
                    {team.team_name}
                  </div>
            })}
        </div>
    );
}
 
export default JoinTeamsList;