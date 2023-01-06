import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AssignedLegs from "../AssignedLegs/AssignedLegs";
import UnassignedLegs from "../UnassignedLegs/UnassignedLegs";

const TeamRunnerAssignmentTab = (props) => {
    const [assignedLegs, setAssignedLegs] = useState([]);
    const [unassignedLegs, setUnassignedLegs] = useState([]);
    const [runners, setRunners] = useState([]);

    useEffect(() => {
        const getRunners = async () => {
            try {
                let response = await axios.get(`http://44.210.130.199:8000/api/runners/team/${props.teamId}/`,{
                    headers: {
                        Authorization: "Bearer " + props.token,
                    },
                });
                if (response.status === 200) {
                    setRunners(response.data);
                }
            }
            catch (error) {
                console.log(error.response.data);
            }
        }
        getRunners();
    }, [props.teamId, props.token])

    async function getAssignedLegs() {
        try {
            let response = await axios.get(`http://44.210.130.199:8000/api/runner_legs/team/${props.teamId}/`,{
                headers: {
                    Authorization: "Bearer " + props.token,
                },
            });
            if (response.status === 200) {
                let unsortedLegs = response.data;
                let sortedLegs = [...unsortedLegs].sort((a, b) => a.race_leg.leg_number - b.race_leg.leg_number);
                setAssignedLegs(sortedLegs);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function getUnassignedLegs() {
        try {
            let response = await axios.get(`http://44.210.130.199:8000/api/runner_legs/unassigned/${props.teamId}/`,{
                headers: {
                    Authorization: "Bearer " + props.token,
                },
            });
            if (response.status === 200) {
                let unsortedLegs = response.data;
                let sortedLegs = [...unsortedLegs].sort((a, b) => a.leg_number - b.leg_number);
                setUnassignedLegs(sortedLegs);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function assignRunnerLeg(runnerLeg) {
        try {
            let response = await axios.post("http://44.210.130.199:8000/api/runner_legs/new/",
                runnerLeg,
                {headers: {
                    Authorization: "Bearer " + props.token,
                },
            });
            if (response.status === 201) {
                getUnassignedLegs();
                getAssignedLegs();
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function reassignRunnerLeg(id, runnerLeg) {
        try {
            let response = await axios.put(`http://44.210.130.199:8000/api/runner_legs/${id}/`,
                runnerLeg,
                {headers: {
                    Authorization: "Bearer " + props.token,
                },
            });
            if (response.status === 200) {
                getAssignedLegs();
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div>
            <AssignedLegs assignedLegs={assignedLegs} getAssignedLegs={getAssignedLegs} runners={runners} reassignRunnerLeg={reassignRunnerLeg} />
            <UnassignedLegs unassignedLegs={unassignedLegs} getUnassignedLegs={getUnassignedLegs} runners={runners} assignRunnerLeg={assignRunnerLeg} />
        </div>
    );
}
 
export default TeamRunnerAssignmentTab;