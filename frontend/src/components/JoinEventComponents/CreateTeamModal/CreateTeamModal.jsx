import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import useCustomForm from '../../../hooks/useCustomForm';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreateTeamModal.css';

const CreateTeamModal = (props) => {
    const navigate = useNavigate();
    const [teamRole, setTeamRole] = useState({"id":0, "role_name": "Select"});
    const initialValues = {
        "teamNameText": "",
        "teamStart": "",
        "paceText": "00:00"
    };
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(initialValues, handleFormSubmit);

    function resetForm() {
        reset();
        setTeamRole({"id":0, "role_name": "Select"});
    }

    function handleCancel() {
        resetForm();
        props.setShowCreateTeamModal(false)
    }

    async function handleFormSubmit() {
        let newTeamRunner = {
            "team_name": formData.teamNameText,
            "team_start": formData.teamStart,
            "team_end": formData.teamStart,
            "race_id": props.raceId,
            "runner_pace": formData.paceText,
            "user_id": props.userId,
            "team_role_id": teamRole.id
        };
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/runners/team/new/",
                newTeamRunner,
                {headers: {
                    Authorization: "Bearer " + props.token,
                    },
                }
            );
            if (response.status === 201) {
                resetForm();
                props.setShowCreateTeamModal(false);
                navigate("/")
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }
    
    return (
        <Modal show={props.showCreateTeamModal} size="lg">
            <Modal.Header>
                <Modal.Title>Create and Join a Team</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="create-team-form-container">
                    <form onSubmit={handleSubmit} className="create-team-form">
                        <label>Enter your team name:</label>
                        <input className="create-team-form-field"
                            type="text"
                            name="teamNameText"
                            required={true}
                            onChange={handleInputChange}
                            value={formData.teamNameText}
                        />
                        <label>Enter your team start date and time:</label>
                        <input className="create-team-form-field"
                            type="datetime-local"
                            name="teamStart"
                            required={true}
                            onChange={handleInputChange}
                            value={formData.teamStart}
                        />
                        <label>Enter your mile pace in MM:SS</label>
                        <input className="create-team-form-field"
                            type="text"
                            name="paceText"
                            required={true}
                            onChange={handleInputChange}
                            value={formData.paceText}
                        />
                        <label>Select your role:</label>
                        <DropdownButton id="role-dropdown" title={teamRole.role_name} variant="success">
                            {props.allTeamRoles.map((teamRole) => {
                                return <Dropdown.Item key={teamRole.id} onClick={() => setTeamRole(teamRole)}>{teamRole.role_name}</Dropdown.Item>
                            })}
                        </DropdownButton>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <button type="button" onClick={handleCancel} className="create-team-form-button">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="create-team-form-button">Submit</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
 
export default CreateTeamModal;