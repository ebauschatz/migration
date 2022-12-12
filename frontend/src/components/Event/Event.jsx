import { useNavigate } from "react-router-dom";
import './Event.css';

const Event = (props) => {
    const navigate = useNavigate();

    return (
        <div className="event-card" onClick={() => navigate(`/teamevent/${props.event.team.id}`)}>
            <div className="event-name">{props.event.team.race.race_name}</div>
            <div>{props.event.team.race.race_start_date}</div>
            <div><span className="team-name">{props.event.team.team_name}</span>  ({props.event.team_role.role_name})</div>
        </div>
    );
}
 
export default Event;