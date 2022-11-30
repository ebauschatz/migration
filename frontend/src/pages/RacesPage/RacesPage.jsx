import React, { useState } from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import RaceLocationMap from '../../components/RaceComponents/RaceLocationMap/RaceLocationMap';
import CreateRaceForm from '../../components/RaceComponents/CreateRaceForm/CreateRaceForm';

const RacesPage = (props) => {
    const [user, token] = useAuth();
    const initialValues = {
        raceName: "",
        raceStartDate: "",
        raceFinishOpens: "",
        raceFinishCloses: "",
        raceAddress: "",
        raceCity: "",
        raceState: "",
        raceZip: ""
    };
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(initialValues, handleFormSubmit);
    const [startPlaceId, setStartPlaceId] = useState("");

    function handleReset() {
        reset();
        setStartPlaceId("");
    }

    async function handleValidateAddress() {
        let unformatted_address = formData.raceAddress + "%20" + formData.raceCity + "%20" + formData.raceState  + "%20" + formData.raceZip;
        let formatted_address = unformatted_address.replace(" ", "%20");
        try {
            let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formatted_address}&key=AIzaSyDQhT35nj-2_MIGFY05nIXucu4k8VTYuIs`);
            if (response.status === 200) {
                setStartPlaceId(response.data.results[0]["place_id"]);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function handleFormSubmit() {
        let newRace = {
            "race_name": formData.raceName,
            "race_start_date": formData.raceStartDate,
            "race_finish_opens": formData.raceFinishOpens,
            "race_finish_closes": formData.raceFinishCloses,
            "race_start_place_id": startPlaceId
        };
        console.log(newRace);
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/races/new/",
                newRace,
                {headers: {
                    Authorization: "Bearer " + token,
                    },
                }
            );
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div>
            <CreateRaceForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleValidateAddress={handleValidateAddress} handleReset={handleReset} handleFormSubmit={handleFormSubmit} />
            {startPlaceId !== "" && <RaceLocationMap placeId={startPlaceId} />}
        </div>
    );
}
 
export default RacesPage;