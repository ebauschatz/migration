import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import CreateRaceLegForm from '../CreateRaceLegForm/CreateRaceLegForm';
import useCustomForm from '../../../hooks/useCustomForm';
import RaceLocationMap from '../RaceLocationMap/RaceLocationMap';

const LegEditModal = (props) => {
    const [endPlaceId, setEndPlaceId] = useState(props.modalLeg.leg_end_place_id);
    const initialValues = {
        "legNumber": props.modalLeg.leg_number,
        "legDistance": props.modalLeg.leg_distance,
        "address": props.modalLeg.leg_end_address,
        "city": props.modalLeg.leg_end_city,
        "state": props.modalLeg.leg_end_state,
        "zip": props.modalLeg.leg_end_zip
    }
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(initialValues, handleFormSubmit);

    useEffect(() => {
        handleFormReset();
    }, [props.modalLeg])

    function handleFormReset() {
        reset();
        setEndPlaceId(props.modalLeg.leg_end_place_id);
    }

    async function handleFormSubmit() {
        let updatedLeg = {
            "leg_number": formData.legNumber,
            "leg_distance": formData.legDistance,
            "leg_end_place_id": endPlaceId,
            "leg_end_address": formData.address,
            "leg_end_city": formData.city,
            "leg_end_state": formData.state,
            "leg_end_zip": formData.zip,
            "race_id": props.modalLeg.race.id
        }
        try {
            let response = await axios.put(`http://127.0.0.1:8000/api/race_legs/${props.modalLeg.id}/`,
                updatedLeg,
                {headers: {
                    Authorization: "Bearer " + props.token,
                    },
                }
            );
            if (response.status === 200) {
                handleFormReset();
                props.getRaceLegs();
                props.setShowLegEditModal(false);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal show={props.showLegEditModal}>
            <Modal.Header>
                <h4>Edit Leg Details</h4>
                <button type="button" onClick={() => props.setShowLegEditModal(false)}>Cancel</button>
            </Modal.Header>
            <Modal.Body>
                <CreateRaceLegForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleFormReset={handleFormReset} setPlaceId={setEndPlaceId} handleValidateAddress={props.handleValidateAddress} />
                <RaceLocationMap placeId={endPlaceId} />
            </Modal.Body>
        </Modal>
    );
}
 
export default LegEditModal;