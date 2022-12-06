import React, { useState } from 'react';
import RaceLocationMap from "../RaceLocationMap/RaceLocationMap";
import RaceEditModal from '../RaceEditModal/RaceEditModal';

const RaceDetail = (props) => {
    const [showRaceEditModal, setShowRaceEditModal] = useState(false);

    return (
        <div>
            <h4>Race Details</h4>
            Race Name: {props.race.race_name}<br />
            Start Date: {props.race.race_start_date}<br />
            Finish Opens: {props.race.race_finish_opens}<br />
            Finish Closes: {props.race.race_finish_closes}<br />
            <RaceLocationMap placeId={props.race.race_start_place_id} />
            <button type="button" onClick={() => setShowRaceEditModal(true)}>Edit</button>
            <RaceEditModal race={props.race} showRaceEditModal={showRaceEditModal} setShowRaceEditModal={setShowRaceEditModal} />
        </div>
    );
}
 
export default RaceDetail;