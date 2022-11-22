import { useNavigate } from "react-router-dom";

const Event = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <p onClick={() => navigate(`/teamschedule/${props.event.team.id}`)}>{props.event.team.race.race_name} - {props.event.team.race.race_start_date}</p>
            <p>{props.event.team.team_name} - {props.event.team_role.role_name}</p>
            <br />
        </div>
    );
}
 
export default Event;