import React, { useState, useEffect } from 'react';
import axios from "axios";

const JoinTeamsList = (props) => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getRaceTeams(props.raceId);
    }, [props.raceId])

    async function getRaceTeams() {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/teams/race/${props.raceId}/`, {
              headers: {
                Authorization: "Bearer " + props.token,
              },
            });
            setTeams(response.data);
          }
          catch (error) {
            console.log(error.response.data);
          }
    }

    return (
        <div>
            Available Teams:
            {teams.map((team) => {
                return <div key={team.id}>{team.team_name}</div>
            })}
        </div>
    );
}
 
export default JoinTeamsList;