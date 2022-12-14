import { useNavigate } from "react-router-dom";
import './RaceRow.css'

const RaceRow = (props) => {
    const navigate = useNavigate();

    function handleRaceRowClicked() {
        navigate(`/races/${props.race.id}`);
    }

    return (
        <tr className="data-row">
            <td className="data-element">{props.race.race_name}</td>
            <td className="data-element">{props.race.race_start_date}</td>
            <td onClick={handleRaceRowClicked} className="view-edit data-element">View & Edit</td>
            <td><i className="fa fa-trash-o delete-icon data-element" onClick={() => props.deleteRace(props.race.id)}></i></td>
        </tr>
    );
}
 
export default RaceRow;