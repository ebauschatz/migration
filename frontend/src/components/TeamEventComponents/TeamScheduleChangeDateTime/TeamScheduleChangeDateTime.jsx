import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './TeamScheduleChangeDateTime.css'

const TeamScheduleChangeDateTime = (props) => {
    const initialFormValue = props.initialValue ? props.initialValue.replace("Z","") : "";
    const [newValue, setNewValue] = useState(initialFormValue);

    useEffect(() => {
        setNewValue(initialFormValue)
    }, [props.initialValue]);

    return (
        <Modal show={props.showTimeEditModal} size="sm">
            <Modal.Header><b>Edit Timestamp</b></Modal.Header>
            <Modal.Body>
                <div className="time-input">
                    <input
                        type="datetime-local"
                        required={true}
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    ></input>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={() => props.setShowTimeEditModal(false)}>Cancel</button>
                <button type="submit" onClick={() => props.handleSubmit(newValue)}>Save</button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default TeamScheduleChangeDateTime;