import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import useCustomForm from '../../../hooks/useCustomForm';
import axios from "axios";
import CreateRaceLegForm from '../CreateRaceForm/CreateRaceForm';

const RaceEditModal = (props) => {
    const initialValues = {
        raceName: props.race.race_name,
        raceStartDate: props.race.race_start_date,
        raceFinishOpens: props.race.race_finish_opens ? props.race.race_finish_opens.replace("Z", "") : "",
        raceFinishCloses: props.race.race_finish_closes ? props.race.race_finish_closes.replace("Z", "") : "",
        raceAddress: "",
        raceCity: "",
        raceState: "",
        raceZip: ""
    };
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(initialValues, handleFormSubmit);

    useEffect(() => {
        reset();
    }, [props.race.race_name]);

    function handleReset() {
        reset();
    }

    function handleFormSubmit() {
        console.log("submitted form");
    }

    return (
        <Modal show={props.showRaceEditModal}>
            <Modal.Header>
                Edit Race Details
                <button type="button" onClick={() => props.setShowRaceEditModal(false)}>Cancel</button>
            </Modal.Header>
            <Modal.Body>
                <CreateRaceLegForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleReset={handleReset} />
            </Modal.Body>
        </Modal>
    );
}
 
export default RaceEditModal;