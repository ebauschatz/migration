import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import TeamScheduleTable from "../../components/TeamScheduleTable/TeamScheduleTable";

const TeamSchedulePage = (props) => {
    const {teamId} = useParams();
    const [runnerLegs, setRunnerLegs] = useState([]);

    useEffect(() => {
        const fetchRunnerLegs = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/runner_legs/team/${teamId}/`, {
                    headers: {
                    Authorization: "Bearer " + props.token,
                    },
                });
                setRunnerLegs(response.data);
            }
            catch (error) {
                console.log(error.response.data);
            }
        }
        fetchRunnerLegs();
        }, [props.token, teamId]);

    return (
        <div>
            <h1>Team Schedule Table</h1>
            <TeamScheduleTable runnerLegs={runnerLegs} />
        </div>
    );
}
 
export default TeamSchedulePage;