import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './JoinTeamModal.css'

const JoinTeamModal = (props) => {
    const navigate = useNavigate();
    const [pace, setPace] = useState("00:00");
    const [teamRole, setTeamRole] = useState({"id":0, "role_name": "Select"});

    function resetForm() {
        setPace("00:00");
        setTeamRole({"id":0, "role_name": "Select"});
    }
     
    async function submitRegistration() {
        let newRunner = {
            "runner_pace": "00:" + pace,
            "user_id": props.userId,
            "team_id": props.selectedTeam.id,
            "team_role_id": teamRole.id
        }
        try {
            let response = await axios.post("http://44.210.130.199:8000/api/runners/new/",
                newRunner,
                {headers: {
                      Authorization: "Bearer " + props.token,
                    },
                  }
                );
            if (response.status === 201) {
                resetForm();
                props.setShowJoinModal(false);
                navigate("/")
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    function cancelRegistration() {
        resetForm();
        props.setShowJoinModal(false);
    }

    return (
        <Modal show={props.showJoinModal} size="lg">
            <Modal.Header>
                <Modal.Title>Join {props.selectedTeam.team_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div onSubmit={submitRegistration} className="join-team-form-container">
                    <form className="join-team-form">
                        <label>
                            Enter your mile pace in MM:SS
                        </label>
                        <input
                            type="text"
                            required={true}
                            onChange={(event) => setPace(event.target.value)}
                            value={pace}
                        />
                        <label>
                            Select your role
                        </label>
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
                    <button type="button" onClick={cancelRegistration} className="join-team-form-button">Cancel</button>
                    <button type="submit" onClick={submitRegistration} className="join-team-form-button">Submit</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
 
export default JoinTeamModal;