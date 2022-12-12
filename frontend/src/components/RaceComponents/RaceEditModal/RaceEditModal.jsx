import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import useCustomForm from '../../../hooks/useCustomForm';
import axios from "axios";
import CreateRaceLegForm from '../CreateRaceForm/CreateRaceForm';
import RaceLocationMap from '../RaceLocationMap/RaceLocationMap';
import keys from '../../../API_Keys.json';

const RaceEditModal = (props) => {
    const [racePlaceId, setRacePlaceId] = useState(props.race.race_start_place_id);
    const initialValues = {
        raceName: props.race.race_name,
        raceStartDate: props.race.race_start_date,
        raceFinishOpens: props.race.race_finish_opens ? props.race.race_finish_opens.replace("Z", "") : "",
        raceFinishCloses: props.race.race_finish_closes ? props.race.race_finish_closes.replace("Z", "") : "",
        address: props.race.race_start_address,
        city: props.race.race_start_city,
        state: props.race.race_start_state,
        zip: props.race.race_start_zip
    };
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(initialValues, handleFormSubmit);

    useEffect(() => {
        handleReset();
    }, [props.race.race_name]);

    function handleReset() {
        reset();
        setRacePlaceId(props.race.race_start_place_id);
    }

    async function handleValidateAddress() {
        let unformatted_address = formData.address + "%20" + formData.city + "%20" + formData.state  + "%20" + formData.zip;
        let formatted_address = unformatted_address.replace(" ", "%20");
        try {
            let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formatted_address}&key=${keys.googleMapsAPIKey}`);
            if (response.status === 200) {
                setRacePlaceId(response.data.results[0]["place_id"]);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function handleFormSubmit() {
        let updatedRace= {
            "race_name": formData.raceName,
            "race_start_date": formData.raceStartDate,
            "race_finish_opens": formData.raceFinishOpens,
            "race_finish_closes": formData.raceFinishCloses,
            "race_start_place_id": racePlaceId,
            "race_start_address": formData.address,
            "race_start_city": formData.city,
            "race_start_state": formData.state,
            "race_start_zip": formData.zip
        };
        try {
            let response = await axios.put(`http://127.0.0.1:8000/api/races/${props.race.id}/`,
                updatedRace,
                {headers: {
                    Authorization: "Bearer " + props.token,
                    },
                }
            );
            if (response.status === 200) {
                handleReset();
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <Modal show={props.showRaceEditModal}>
            <Modal.Header>
                <h4>Edit Race Details</h4>
                <button type="button" onClick={() => props.setShowRaceEditModal(false)}>Cancel</button>
            </Modal.Header>
            <Modal.Body>
                <CreateRaceLegForm formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} handleReset={handleReset} handleValidateAddress={handleValidateAddress} />
                {racePlaceId && <RaceLocationMap placeId={racePlaceId} />}
            </Modal.Body>
        </Modal>
    );
}
 
export default RaceEditModal;