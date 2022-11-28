import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const JoinTeamModal = (props) => {
    const navigate = useNavigate();
    const [allTeamRoles, setAllTeamRoles] = useState([]);
    const [pace, setPace] = useState("");
    const [teamRole, setTeamRole] = useState({"id":0, "role_name": "Select"});

    useEffect(() => {
        const fetchRunnerRoles = async () => {
            try {
                let response = await axios.get("http://127.0.0.1:8000/api/team_roles/all/", {
                    headers: {
                    Authorization: "Bearer " + props.token,
                    },
                });
                setAllTeamRoles(response.data);
            }
            catch (error) {
                console.log(error.response.data);
            }
        }
        fetchRunnerRoles();
    }, [props.token]);

    function resetForm() {
        setPace("");
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
            let response = await axios.post("http://127.0.0.1:8000/api/runners/new/",
                newRunner,
                {headers: {
                      Authorization: "Bearer " + props.token,
                    },
                  }
                );
        }
        catch (error) {
            console.log(error.response.data);
        }
        resetForm();
        props.setShowJoinModal(false);
        navigate("/")
    }

    function cancelRegistration() {
        resetForm();
        props.setShowJoinModal(false);
    }

    return (
        <Modal show={props.showJoinModal}>
            <Modal.Header>
                <Modal.Title>Join {props.selectedTeam.team_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div onSubmit={submitRegistration}>
                    <div>
                        <label>
                            Enter your mile pace in MM:SS
                        </label>
                    </div>
                    <div>
                        <input
                            type="text"
                            required={true}
                            onChange={(event) => setPace(event.target.value)}
                            value={pace}
                        />
                    </div>
                    <div>
                        <label>
                            Select your role
                        </label>
                        <DropdownButton id="role-dropdown" title={teamRole.role_name}>
                            {allTeamRoles.map((teamRole) => {
                                return <Dropdown.Item key={teamRole.id} onClick={() => setTeamRole(teamRole)}>{teamRole.role_name}</Dropdown.Item>
                            })}
                        </DropdownButton>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <button type="button" onClick={cancelRegistration}>Cancel</button>
                    <button type="submit" onClick={submitRegistration}>Submit</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
 
export default JoinTeamModal;