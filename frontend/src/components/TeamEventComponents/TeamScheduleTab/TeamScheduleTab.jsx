import React, { useState, useEffect } from 'react';
import axios from "axios";
import TeamScheduleTable from "../TeamScheduleTable/TeamScheduleTable";

const TeamScheduleTab = (props) => {
    const [runnerLegs, setRunnerLegs] = useState([]);

    useEffect(() => {
        const fetchRunnerLegs = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/runner_legs/team/${props.teamId}/`, {
                    headers: {
                    Authorization: "Bearer " + props.token,
                    },
                });
                if (response.status === 200) {
                    let unsortedLegs = response.data;
                    let sortedLegs = [...unsortedLegs].sort((a, b) => a.race_leg.leg_number - b.race_leg.leg_number)
                    setRunnerLegs(sortedLegs);
                }
            }
            catch (error) {
                console.log(error.response.data);
            }
        }
        fetchRunnerLegs();
        }, [props.token, props.teamId]);

    return (
        <div>
            <h1>Team Schedule Table</h1>
            <TeamScheduleTable runnerLegs={runnerLegs} />
        </div>
    );
}
 
export default TeamScheduleTab;