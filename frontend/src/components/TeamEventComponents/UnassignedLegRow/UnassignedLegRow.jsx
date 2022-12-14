import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './UnassignedLegRow.css'

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
        <tr className="unassigned-leg-row">
            <td className="unassigned-leg-data-element">{props.leg.leg_number}</td>
            <td className="unassigned-leg-data-element">{props.leg.leg_distance}</td>
            <td className="unassigned-leg-data-element">
                <DropdownButton id="runner-dropdown" title={runner.user.first_name} variant="success" size="sm">
                    {props.runners.map((runner) => {
                        return <Dropdown.Item key={runner.id} onClick={() => setRunner(runner)}>{runner.user.first_name}</Dropdown.Item>
                    })}
                </DropdownButton>
            </td>
            <td onClick={resetRunner} className="unassigned-leg-data-element assign-links">Clear</td>
            <td onClick={submitRunnerAssignment} className="unassigned-leg-data-element assign-links">Submit</td>
        </tr>
    );
}
 
export default UnassignedLegRow;