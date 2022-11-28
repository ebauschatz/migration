import React, { useEffect } from 'react';
import axios from "axios";

const JoinTeamsList = (props) => {
    useEffect(() => {
        getRaceTeams(props.raceId);
    }, [props.raceId, getRaceTeams])

    async function getRaceTeams() {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/teams/race/${props.raceId}/`, {
              headers: {
                Authorization: "Bearer " + props.token,
              },
            });
            props.setTeams(response.data);
          }
          catch (error) {
            console.log(error.response.data);
          }
    }

    function handleTeamSelected(team) {
      props.setSelectedTeam(team);
      props.setShowJoinModal(true);
    }

    return (
        <div>
            Available Teams:
            {props.teams.map((team) => {
                return <div key={team.id} onClick={() => handleTeamSelected(team)}>
                    {team.team_name}
                  </div>
            })}
        </div>
    );
}
 
export default JoinTeamsList;