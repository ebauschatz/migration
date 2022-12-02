import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const AssignedLegRow = (props) => {
    const dummyRunner = {"user": {"first_name": "Reassign"}};
    const [runner, setRunner] = useState(dummyRunner);
    
    function resetRunner() {
        setRunner(dummyRunner);
    }

    function handleSubmitReassign() {
        let newRunnerLeg = {
            "runner_id": runner.id,
            "race_leg_id": props.runnerLeg.race_leg.id,
            "runner_leg_start": props.runnerLeg.runner_leg_start,
            "runner_leg_end": props.runnerLeg.runner_leg_end,
            "is_completed": props.runnerLeg.is_completed,
            "is_in_progress": props.runnerLeg.is_in_progress
        }
        props.reassignRunnerLeg(props.runnerLeg.id, newRunnerLeg);
        resetRunner();
    }

    return (
        <tr>
            <td>{props.runnerLeg.race_leg.leg_number}</td>
            <td>{props.runnerLeg.race_leg.leg_distance}</td>
            <td>{props.runnerLeg.runner.user.first_name}</td>
            <td>{props.runnerLeg.runner.runner_pace}</td>
            <td>
                <DropdownButton id="runner-dropdown" title={runner.user.first_name}>
                    {props.runners.map((runner) => {
                        return <Dropdown.Item key={runner.id} onClick={() => setRunner(runner)}>{runner.user.first_name}</Dropdown.Item>
                    })}
                </DropdownButton>
            </td>
            <td onClick={resetRunner}>Clear</td>
            <td onClick={handleSubmitReassign}>Submit</td>
        </tr>
    );
}
 
export default AssignedLegRow;