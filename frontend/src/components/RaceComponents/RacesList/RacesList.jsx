import RaceRow from "../RaceRow/RaceRow";

const RacesList = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Race Name</th>
                    <th>Race Start Date</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.races.map((race) => {
                    return <RaceRow key={race.id} race={race} deleteRace={props.deleteRace} />
                })}
            </tbody>
        </table>
    );
}
 
export default RacesList;