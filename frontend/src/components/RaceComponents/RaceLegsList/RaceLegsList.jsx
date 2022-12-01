import RaceLegRow from "../RaceLegRow/RaceLegRow";
import React, { useState } from 'react';
import LegLocationModal from "../LegLocationModal/LegLocationModal";

const RaceLegsList = (props) => {
    const [showLegLocationModal, setShowLegLocationModal] = useState(false);
    const [modalLeg, setModalLeg] = useState("");

    function handleShowLegLocation(leg) {
        setModalLeg(leg);
        setShowLegLocationModal(true);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Leg Number</th>
                        <th>Leg Distance</th>
                    </tr>
                </thead>
                <tbody>
                    {props.legs.map((leg) => {
                        return <RaceLegRow key={leg.id} leg={leg} handleShowLegLocation={handleShowLegLocation} />
                    })}
                </tbody>
            </table>
            <LegLocationModal modalLeg={modalLeg} showLegLocationModal={showLegLocationModal} setShowLegLocationModal={setShowLegLocationModal} />
        </div>
    );
}
 
export default RaceLegsList;