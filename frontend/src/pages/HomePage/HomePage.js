import React from "react";
import { useEffect, useState } from "react";
import EventList from "../../components/EventList/EventList";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = (props) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let response = await axios.get(`http://127.0.0.1:8000/api/runners/user/${props.user.id}/`, {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        });
        let unsortedEvents = response.data;
        let sortedEvents = [...unsortedEvents].sort((a, b) => (a.team.race.race_start_date > b.team.race.race_start_date) ? 1 : -1);
        setEvents(sortedEvents);
      }
      catch (error) {
        console.log(error.response.data);
      }
    }
    fetchEvents();
  }, [props.token, props.user.id]);

  return (
    <div className="container">
      <button onClick={() => navigate("/join")}>Join An Event</button>
      <EventList events={events} />
    </div>
  );
};

export default HomePage;
