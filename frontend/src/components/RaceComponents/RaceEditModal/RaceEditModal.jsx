import Modal from 'react-bootstrap/Modal';
import CreateRaceLegForm from '../CreateRaceLegForm/CreateRaceLegForm';

const RaceEditModal = (props) => {
    return (
        <Modal show={props.showRaceEditModal}>
            <Modal.Header>
                Edit Race Details
            </Modal.Header>
            <Modal.Body>
                <CreateRaceLegForm />
            </Modal.Body>
        </Modal>
    );
}
 
export default RaceEditModal;