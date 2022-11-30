import RaceLegRow from "../RaceLegRow/RaceLegRow";

const RaceLegsList = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Leg Number</th>
                    <th>Leg Distance</th>
                </tr>
            </thead>
            <tbody>
                {props.legs.map((leg) => {
                    return <RaceLegRow key={leg.id} leg={leg} />
                })}
            </tbody>
        </table>
    );
}
 
export default RaceLegsList;