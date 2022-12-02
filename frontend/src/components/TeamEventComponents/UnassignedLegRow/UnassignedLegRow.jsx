import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const UnassignedLegRow = (props) => {
    const dummyRunner = {"user": {"first_name": "Select"}};
    const [runner, setRunner] = useState(dummyRunner);

    function resetRunner() {
        setRunner(dummyRunner);
    }

    function submitRunnerAssignment() {
        let newRunnerLeg = {
            "runner_id": runner.id,
            "race_leg_id": props.leg.id,
            "runner_leg_start": runner.team.team_start,
            "is_complete": false,
            "is_in_progress": false
        }
        props.assignRunnerLeg(newRunnerLeg);
    }

    return (
        <tr>
            <td>{props.leg.leg_number}</td>
            <td>{props.leg.leg_distance}</td>
            <td>
                <DropdownButton id="runner-dropdown" title={runner.user.first_name}>
                    {props.runners.map((runner) => {
                        return <Dropdown.Item key={runner.id} onClick={() => setRunner(runner)}>{runner.user.first_name}</Dropdown.Item>
                    })}
                </DropdownButton>
            </td>
            <td onClick={resetRunner}>Clear</td>
            <td onClick={submitRunnerAssignment}>Submit</td>
        </tr>
    );
}
 
export default UnassignedLegRow;