import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import useCustomForm from '../../hooks/useCustomForm';
import RaceDetail from '../../components/RaceComponents/RaceDetail/RaceDetail';
import RaceLegsList from '../../components/RaceComponents/RaceLegsList/RaceLegsList';
import CreateRaceLegForm from '../../components/RaceComponents/CreateRaceLegForm/CreateRaceLegForm';
import RaceLocationMap from '../../components/RaceComponents/RaceLocationMap/RaceLocationMap';
import keys from '../../API_Keys.json';

const RaceDetailPage = (props) => {
    const {raceId} = useParams();
    const [startPlaceId, setStartPlaceId] = useState("");
    const [race, setRace] = useState({});
    const [legs, setLegs] = useState([]);
    const initialValues = {
        "legNumber": "",
        "legDistance": "",
        "legAddress": "",
        "legCity": "",
        "legState": "",
        "legZip": ""
    }
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(initialValues, handleFormSubmit);
    
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

    async function handleFormSubmit() {
        let newLeg = {
            "leg_number": formData.legNumber,
            "leg_distance": formData.legDistance,
            "leg_end_place_id": startPlaceId,
            "race_id": raceId
        }
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/race_legs/new/",
                newLeg,
                {headers: {
                    Authorization: "Bearer " + props.token,
                    },
                }
            );
            if (response.status === 201) {
                getRaceLegs();
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    function handleFormReset() {
        reset();
        setStartPlaceId("");
    }

    async function handleValidateAddress() {
        let unformatted_address = formData.legAddress + "%20" + formData.legCity + "%20" + formData.legState  + "%20" + formData.legZip;
        let formatted_address = unformatted_address.replace(" ", "%20");
        try {
            let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formatted_address}&key=${keys.googleMapsAPIKey}`);
            if (response.status === 200) {
                setStartPlaceId(response.data.results[0]["place_id"]);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div>
            <RaceDetail race={race} />
            <CreateRaceLegForm formData={formData} handleInputChange={handleInputChange} handleValidateAddress={handleValidateAddress} handleFormReset={handleFormReset} handleSubmit={handleSubmit} />
            {startPlaceId !== "" && <RaceLocationMap placeId={startPlaceId} />}
            <RaceLegsList legs={legs} />
        </div>
    );
}
 
export default RaceDetailPage;