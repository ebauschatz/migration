import './JoinTeamsList.css'

const JoinTeamsList = (props) => {
    function handleTeamSelected(team) {
        props.setSelectedTeam(team);
        props.setShowJoinModal(true);
    }

    return (
        <div className="join-team-container">
            <div className="section-header">Teams</div>
            <button type="button" onClick={() => props.setShowCreateTeamModal(true)}>Create Team</button>
            <table className="join-team-table">
                <thead>
                    <tr><th className="join-team-element">Team Name</th></tr>
                </thead>
                <tbody>
                    {props.teams.map((team) => {
                        return <tr key={team.id} className="join-team-row" onClick={() => handleTeamSelected(team)}>
                            <td>{team.team_name}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}
 
export default JoinTeamsList;