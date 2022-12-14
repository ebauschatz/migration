import './TeamScheduleRow.css'

const TeamScheduleRow = (props) => {
    return (
        <tr className="schedule-row">
            <td className="schedule-data-element">{props.runnerLeg.race_leg.leg_number}</td>
            <td className="schedule-data-element">{props.runnerLeg.race_leg.leg_distance}</td>
            <td className="schedule-data-element">{props.runnerLeg.runner.user.first_name}</td>
            <td className="schedule-data-element schedule-time" onClick={() => props.editStartTime(props.runnerLeg)}>{props.runnerLeg.runner_leg_start.replace("Z","").replace("T"," ")}</td>
            <td className="schedule-data-element schedule-time" onClick={() => props.editEndTime(props.runnerLeg)}>{props.runnerLeg.runner_leg_end.replace("Z","").replace("T"," ")}</td>
        </tr>
    );
}
 
export default TeamScheduleRow;