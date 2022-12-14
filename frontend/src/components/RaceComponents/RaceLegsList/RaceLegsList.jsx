import RaceLegRow from "../RaceLegRow/RaceLegRow";
import React, { useState } from 'react';
import LegLocationModal from "../LegLocationModal/LegLocationModal";
import LegEditModal from '../LegEditModal/LegEditModal';
import './RaceLegsList.css'

const RaceLegsList = (props) => {
    const [showLegLocationModal, setShowLegLocationModal] = useState(false);
    const [showLegEditModal, setShowLegEditModal] = useState(false);
    const [modalLeg, setModalLeg] = useState("");    

    function handleShowLegLocation(leg) {
        setModalLeg(leg);
        setShowLegLocationModal(true);
    }

    function handleShowLegEdit(leg) {
        setModalLeg(leg);
        setShowLegEditModal(true);
    }

    return (
        <div>
            <table className="leg-table">
                <thead>
                    <tr>
                        <th className="leg-element">Number</th>
                        <th className="leg-element">Distance</th>
                        <th className="leg-element">Location</th>
                        <th className="leg-element"></th>
                        <th className="leg-element"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.legs.map((leg) => {
                        return <RaceLegRow key={leg.id} leg={leg} handleShowLegLocation={handleShowLegLocation} handleShowLegEdit={handleShowLegEdit} deleteRaceLeg={props.deleteRaceLeg} />
                    })}
                </tbody>
            </table>
            <LegEditModal modalLeg={modalLeg} showLegEditModal={showLegEditModal} setShowLegEditModal={setShowLegEditModal} handleValidateAddress={props.handleValidateAddress} token={props.token} getRaceLegs={props.getRaceLegs} />
            <LegLocationModal modalLeg={modalLeg} showLegLocationModal={showLegLocationModal} setShowLegLocationModal={setShowLegLocationModal} />
        </div>
    );
}
 
export default RaceLegsList;