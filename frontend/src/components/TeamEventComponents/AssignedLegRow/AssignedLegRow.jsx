const AssignedLegRow = (props) => {
    return (
        <tr>
            <td>{props.runnerLeg.race_leg.leg_number}</td>
            <td>{props.runnerLeg.race_leg.leg_distance}</td>
            <td>{props.runnerLeg.runner.user.first_name}</td>
            <td>{props.runnerLeg.runner.runner_pace}</td>
        </tr>
    );
}
 
export default AssignedLegRow;