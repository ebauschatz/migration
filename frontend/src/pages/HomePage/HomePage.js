import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import EventList from "../../components/EventList/EventList";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, token] = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let response = await axios.get(`http://127.0.0.1:8000/api/runners/user/${user.id}/`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setEvents(response.data);
      }
      catch (error) {
        console.log(error.response.data);
      }
    }
    fetchEvents();
  }, [token, user.id]);

  return (
    <div className="container">
      <h1>Home Page for {user.first_name}!</h1>
      <button onClick={() => navigate("/login")}>Join A Team</button>
      <EventList events={events} />
    </div>
  );
};

export default HomePage;
