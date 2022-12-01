import Modal from 'react-bootstrap/Modal';
import RaceLocationMap from '../RaceLocationMap/RaceLocationMap';

const LegLocationModal = (props) => {
    if (props.modalLeg === "") {
        return <div>No Leg Found</div>
    }
    else {
        return (
            <Modal show={props.showLegLocationModal}>
                <Modal.Header>
                    <Modal.Title>Exchange {props.modalLeg.leg_number}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RaceLocationMap placeId={props.modalLeg.leg_end_place_id} />
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" onClick={() => props.setShowLegLocationModal(false)}>Close</button>
                </Modal.Footer>
            </Modal>
        );
    }
}
 
export default LegLocationModal;