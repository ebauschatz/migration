import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import useCustomForm from '../../hooks/useCustomForm';
import RaceDetail from '../../components/RaceComponents/RaceDetail/RaceDetail';
import RaceLegsList from '../../components/RaceComponents/RaceLegsList/RaceLegsList';
import CreateRaceLegForm from '../../components/RaceComponents/CreateRaceLegForm/CreateRaceLegForm';
import RaceLocationMap from '../../components/RaceComponents/RaceLocationMap/RaceLocationMap';
import keys from '../../API_Keys.json';
import './RaceDetailPage.css'

const RaceDetailPage = (props) => {
    const {raceId} = useParams();
    const [startPlaceId, setStartPlaceId] = useState("");
    const [race, setRace] = useState({});
    const [legs, setLegs] = useState([]);
    const initialValues = {
        "legNumber": "",
        "legDistance": "",
        "address": "",
        "city": "",
        "state": "",
        "zip": ""
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
                let unsortedLegs = response.data;
                let sortedLegs = [...unsortedLegs].sort((a, b) => a.leg_number - b.leg_number);
                setLegs(sortedLegs);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function deleteRaceLeg(legId) {
        try {
            let response = await axios.delete(`http://127.0.0.1:8000/api/race_legs/${legId}/`, {
                headers: {
                    Authorization: "Bearer " + props.token,
                }
            });
            if (response.status === 204) {
                getRaceLegs();
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
            "race_id": raceId,
            "leg_end_address": formData.address,
            "leg_end_city": formData.city,
            "leg_end_state": formData.state,
            "leg_end_zip": formData.zip
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
                handleFormReset();
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

    async function handleValidateAddress(formData, setPlaceId) {
        let unformatted_address = formData.address + "%20" + formData.city + "%20" + formData.state  + "%20" + formData.zip;
        let formatted_address = unformatted_address.replace(" ", "%20");
        try {
            let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formatted_address}&key=${keys.googleMapsAPIKey}`);
            if (response.status === 200) {
                setPlaceId(response.data.results[0]["place_id"]);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div className="detail-page-container">
            <RaceDetail race={race} token={props.token} getRaceInfo={getRaceInfo} />
            <div>
                <div className="section-header">Legs</div>
                <RaceLegsList legs={legs} deleteRaceLeg={deleteRaceLeg} handleValidateAddress={handleValidateAddress} token={props.token} getRaceLegs={getRaceLegs} />
                <div className="section-header">Add A New Leg</div>
                <CreateRaceLegForm formData={formData} handleInputChange={handleInputChange} setPlaceId={setStartPlaceId} handleValidateAddress={handleValidateAddress} handleFormReset={handleFormReset} handleSubmit={handleSubmit} />
                {startPlaceId !== "" && <RaceLocationMap placeId={startPlaceId} />}
            </div>
        </div>
    );
}
 
export default RaceDetailPage;