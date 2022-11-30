import { useNavigate } from "react-router-dom";

const RaceRow = (props) => {
    const navigate = useNavigate();

    function handleRaceRowClicked() {
        navigate(`/races/${props.race.id}`);
    }

    return (
        <tr>
            <td>{props.race.race_name}</td>
            <td>{props.race.race_start_date}</td>
            <td onClick={handleRaceRowClicked}>View & Edit</td>
        </tr>
    );
}
 
export default RaceRow;