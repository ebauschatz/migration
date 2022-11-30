import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import RaceDetail from '../../components/RaceComponents/RaceDetail/RaceDetail';
import RaceLegsList from '../../components/RaceComponents/RaceLegsList/RaceLegsList';

const RaceDetailPage = (props) => {
    const {raceId} = useParams();
    const [race, setRace] = useState({});
    const [legs, setLegs] =useState([]);
    
    useEffect(() => {
        getRaceInfo();
        getRaceLegs();
    }, [raceId, props.token]);

    async function getRaceInfo() {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/races/${raceId}/`, {
                headers: {
                    Authorization: "Bearer " + props.token,
                }
            });
            if (response.status === 200) {
                setRace(response.data);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function getRaceLegs() {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/race_legs/race/${raceId}/`, {
                headers: {
                    Authorization: "Bearer " + props.token,
                }
            });
            if (response.status === 200) {
                setLegs(response.data);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div>
            <RaceDetail race={race} />
            <RaceLegsList legs={legs} />
        </div>
    );
}
 
export default RaceDetailPage;