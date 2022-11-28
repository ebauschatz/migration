import Modal from 'react-bootstrap/Modal';

const CreateTeamModal = (props) => {
    
    return (
        <Modal show={props.showCreateTeamModal}>
            <Modal.Header>
                <Modal.Title>Create A Team</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                test text
                {/* <div>
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
                </div> */}
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <button type="button" onClick={props.setShowCreateTeamModal(false)}>Cancel</button>
                    <button type="submit">Submit</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
 
export default CreateTeamModal;