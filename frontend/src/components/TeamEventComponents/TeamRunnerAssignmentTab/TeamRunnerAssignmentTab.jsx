import axios from 'axios';
import React, { useState } from 'react';
import AssignedLegs from "../AssignedLegs/AssignedLegs";
import UnassignedLegs from "../UnassignedLegs/UnassignedLegs";

const TeamRunnerAssignmentTab = (props) => {
    const [assignedLegs, setAssignedLegs] = useState([]);
    const [unassignedLegs, setUnassignedLegs] = useState([]);

    async function getAssignedLegs() {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/runner_legs/team/${props.teamId}/`,{
                headers: {
                    Authorization: "Bearer " + props.token,
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                setAssignedLegs(response.data);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function getUnassignedLegs() {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/runner_legs/unassigned/${props.teamId}/`,{
                headers: {
                    Authorization: "Bearer " + props.token,
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                setUnassignedLegs(response.data);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div>
            <AssignedLegs assignedLegs={assignedLegs} getAssignedLegs={getAssignedLegs} />
            <UnassignedLegs unassignedLegs={unassignedLegs} getUnassignedLegs={getUnassignedLegs} />
        </div>
    );
}
 
export default TeamRunnerAssignmentTab;