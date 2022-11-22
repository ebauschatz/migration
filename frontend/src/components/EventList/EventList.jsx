import Event from "../Event/Event";

const EventList = (props) => {
    return (
        <div>
            <h2>List of Events</h2>
            {props.events.map((event) => {
                return <Event key={event.id} event={event} />
            })}
        </div>
    );
}

export default EventList;