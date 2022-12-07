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
            Start Location: {props.race.race_start_address}, {props.race.race_start_city}, {props.race.race_start_state}, {props.race.race_start_zip}<br />
            <RaceLocationMap placeId={props.race.race_start_place_id} />
            <button type="button" onClick={() => setShowRaceEditModal(true)}>Edit</button>
            <RaceEditModal race={props.race} showRaceEditModal={showRaceEditModal} setShowRaceEditModal={setShowRaceEditModal} token={props.token} />
        </div>
    );
}
 
export default RaceDetail;