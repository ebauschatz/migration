import RaceRow from "../RaceRow/RaceRow";
import './RacesList.css'

const RacesList = (props) => {
    return (
        <table className="race-table">
            <thead>
                <tr>
                    <th className="race-element">Name</th>
                    <th className="race-element">Start Date</th>
                    <th className="race-element"></th>
                    <th className="race-element"></th>
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