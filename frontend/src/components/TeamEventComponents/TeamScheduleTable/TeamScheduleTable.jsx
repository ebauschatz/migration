import React, { useState } from 'react';
import axios from 'axios';
import TeamScheduleRow from "../TeamScheduleRow/TeamScheduleRow";
import TeamScheduleChangeDateTime from '../TeamScheduleChangeDateTime/TeamScheduleChangeDateTime';

const TeamScheduleTable = (props) => {
    const [showStartTimeEditModal, setShowStartTimeEditModal] = useState(false);
    const [showEndTimeEditModal, setShowEndTimeEditModal] = useState(false);
    const [modalRunnerLeg, setModalRunnerLeg] = useState("");

    function editStartTime(runnerLeg) {
        setModalRunnerLeg(runnerLeg);
        setShowStartTimeEditModal(true);
    }

    function editEndTime(runnerLeg) {
        setModalRunnerLeg(runnerLeg);
        setShowEndTimeEditModal(true);
    }

    function saveStartTime(newStartTime) {
        let updatedRunnerLeg ={
            "runner_id": modalRunnerLeg.runner.id,
            "race_leg_id": modalRunnerLeg.race_leg.id,
            "runner_leg_start": newStartTime,
            "runner_leg_end": modalRunnerLeg.runner_leg_end,
            "is_completed": modalRunnerLeg.is_completed,
            "is_in_progress": modalRunnerLeg.is_in_progress
        }
        updateRunnerLeg(modalRunnerLeg.id, updatedRunnerLeg);
        setShowStartTimeEditModal(false);
        setModalRunnerLeg("");
    }

    function saveEndTime(newEndTime) {
        let updatedRunnerLeg ={
            "runner_id": modalRunnerLeg.runner.id,
            "race_leg_id": modalRunnerLeg.race_leg.id,
            "runner_leg_start": modalRunnerLeg.runner_leg_start,
            "runner_leg_end": newEndTime,
            "is_completed": modalRunnerLeg.is_completed,
            "is_in_progress": modalRunnerLeg.is_in_progress
        }
        updateRunnerLeg(modalRunnerLeg.id, updatedRunnerLeg);
        setShowEndTimeEditModal(false);
        setModalRunnerLeg("");
    }

    async function updateRunnerLeg(runnerLegId, runnerLeg) {
        try {
            let response = await axios.put(`http://127.0.0.1:8000/api/runner_legs/${runnerLegId}/`,
                runnerLeg,
                {headers: {
                Authorization: "Bearer " + props.token,
                },
            });
            if (response.status === 200) {
                props.getRunnerLegs();
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    return ( 
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Leg Number</td>
                        <td>Distance</td>
                        <td>Runner</td>
                        <td>Start</td>
                        <td>End</td>
                    </tr>
                </thead>
                <tbody>
                    {props.runnerLegs.map((runnerLeg) => {
                        return <TeamScheduleRow key={runnerLeg.id} runnerLeg={runnerLeg} editStartTime={editStartTime} editEndTime={editEndTime} />
                    })}
                </tbody>
            </table>
            <TeamScheduleChangeDateTime showTimeEditModal={showStartTimeEditModal} setShowTimeEditModal={setShowStartTimeEditModal} initialValue={modalRunnerLeg.runner_leg_start} handleSubmit={saveStartTime} />
            <TeamScheduleChangeDateTime showTimeEditModal={showEndTimeEditModal} setShowTimeEditModal={setShowEndTimeEditModal} initialValue={modalRunnerLeg.runner_leg_end} handleSubmit={saveEndTime} />
        </div>
    );
}
 
export default TeamScheduleTable;