import React, { useState, useEffect } from 'react';
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import JoinRacesList from '../../components/JoinTeamComponents/JoinRacesList/JoinRacesList';
import JoinTeamsList from '../../components/JoinTeamComponents/JoinTeamsList/JoinTeamsList';

const JoinTeamPage = (props) => {
    const [user, token] = useAuth();
    const [races, setRaces] = useState([]);
    const [raceId, setRaceId] = useState();

    useEffect(() => {
        getAllRaces();
    })

    async function getAllRaces() {
        try {
            let response = await axios.get("http://127.0.0.1:8000/api/races/all/", {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            setRaces(response.data);
          }
          catch (error) {
            console.log(error.response.data);
          }
    }

    return (
        <div>
            <JoinRacesList races={races} setRaceId={setRaceId} />
            {raceId && <JoinTeamsList token={token} raceId={raceId} />}
        </div>
    );
}
 
export default JoinTeamPage;