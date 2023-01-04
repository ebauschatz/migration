import './TeamScheduleRow.css'

const TeamScheduleRow = (props) => {
    function handleExchange() {
        let exchangeTime = new Date().toLocaleString("sv-SE");
        props.exchangeRunners(exchangeTime);
    }
    return (
        <tr className="schedule-row">
            <td className="schedule-data-element">{props.runnerLeg.race_leg.leg_number}</td>
            <td className="schedule-data-element">{props.runnerLeg.race_leg.leg_distance}</td>
            <td className="schedule-data-element">{props.runnerLeg.runner.user.first_name} {props.runnerLeg.runner.user.last_name}</td>
            <td className="schedule-data-element schedule-time" onClick={() => props.editStartTime(props.runnerLeg)}>{props.runnerLeg.runner_leg_start.replace("Z","").replace("T"," ")}</td>
            <td className="schedule-data-element schedule-time" onClick={() => props.editEndTime(props.runnerLeg)}>{props.runnerLeg.runner_leg_end.replace("Z","").replace("T"," ")}</td>
            <td className="schedule-data-element">
                {props.runnerLeg.is_completed && <i className="fa fa-check completed-leg-check"></i>}
                {props.runnerLeg.is_in_progress && <button className="exchange-button" onClick={handleExchange}>Exchange</button>}
                {!props.runnerLeg.is_completed && !props.runnerLeg.is_in_progress && <i className="fa fa-hourglass-start pending-leg-hourglass"></i>}
            </td>
        </tr>
    );
}
 
export default TeamScheduleRow;