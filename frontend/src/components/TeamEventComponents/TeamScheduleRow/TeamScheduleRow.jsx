const TeamScheduleRow = (props) => {
    return (
        <tr>
            <td>{props.runnerLeg.race_leg.leg_number}</td>
            <td>{props.runnerLeg.race_leg.leg_distance}</td>
            <td>{props.runnerLeg.runner.user.first_name}</td>
            <td onClick={() => props.editStartTime(props.runnerLeg)}>{props.runnerLeg.runner_leg_start}</td>
            <td onClick={() => props.editEndTime(props.runnerLeg)}>{props.runnerLeg.runner_leg_end}</td>
        </tr>
    );
}
 
export default TeamScheduleRow;