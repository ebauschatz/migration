import Event from "../Event/Event";
import './EventList.css';

const EventList = (props) => {
    return (
        <div className="event-list">
            <h2>Your Events</h2>
            {props.events.map((event) => {
                return <Event key={event.id} event={event} />
            })}
        </div>
    );
}

export default EventList;