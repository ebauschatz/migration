import TeamScheduleRow from "../TeamScheduleRow/TeamScheduleRow";

const TeamScheduleTable = (props) => {
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
                        return <TeamScheduleRow key={runnerLeg.id} runnerLeg={runnerLeg} />
                    })}
                </tbody>
            </table>
        </div>
    );
}
 
export default TeamScheduleTable;