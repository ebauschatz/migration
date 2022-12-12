import React, { useState, useEffect } from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import axios from "axios";
import RaceLocationMap from '../../components/RaceComponents/RaceLocationMap/RaceLocationMap';
import CreateRaceForm from '../../components/RaceComponents/CreateRaceForm/CreateRaceForm';
import RacesList from '../../components/RaceComponents/RacesList/RacesList';
import keys from '../../API_Keys.json';
import './RacesPage.css'

const RacesPage = (props) => {
    const [races, setRaces] = useState([]);
    const initialValues = {
        raceName: "",
        raceStartDate: "",
        raceFinishOpens: "",
        raceFinishCloses: "",
        address: "",
        city: "",
        state: "",
        zip: ""
    };
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(initialValues, handleFormSubmit);
    const [startPlaceId, setStartPlaceId] = useState("");

    useEffect(() => {
        getAllRaces();
    }, []);

    function handleReset() {
        reset();
        setStartPlaceId("");
    }

    async function handleValidateAddress() {
        let unformatted_address = formData.address + "%20" + formData.city + "%20" + formData.state  + "%20" + formData.zip;
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

    async function handleFormSubmit() {
        let newRace = {
            "race_name": formData.raceName,
            "race_start_date": formData.raceStartDate,
            "race_finish_opens": formData.raceFinishOpens,
            "race_finish_closes": formData.raceFinishCloses,
            "race_start_place_id": startPlaceId,
            "race_start_address": formData.address,
            "race_start_city": formData.city,
            "race_start_state": formData.state,
            "race_start_zip": formData.zip
        };
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/races/new/",
                newRace,
                {headers: {
                    Authorization: "Bearer " + props.token,
                    },
                }
            );
            if (response.status === 201) {
                getAllRaces();
                handleReset();
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function getAllRaces() {
        try {
            let response = await axios.get("http://127.0.0.1:8000/api/races/all/", {
                headers: {
                    Authorization: "Bearer " + props.token,
                },
            });
            if (response.status === 200) {
                setRaces(response.data);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function deleteRace(raceId) {
        try {
            let response = await axios.delete(`http://127.0.0.1:8000/api/races/${raceId}/`, {
                headers: {
                    Authorization: "Bearer " + props.token,
                },
            });
            if (response.status === 204) {
                getAllRaces();
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div>
            <div className="section-header">
                All Races
            </div>
            <RacesList races={races} deleteRace={deleteRace} />
            <div className="section-header">
                Add A New Race
            </div>
            <CreateRaceForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleValidateAddress={handleValidateAddress} handleReset={handleReset} handleFormSubmit={handleFormSubmit} />
            {startPlaceId !== "" && <RaceLocationMap placeId={startPlaceId} />}
        </div>
    );
}
 
export default RacesPage;