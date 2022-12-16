import React, { useState } from 'react';
import RaceLocationMap from "../RaceLocationMap/RaceLocationMap";
import RaceEditModal from '../RaceEditModal/RaceEditModal';
import './RaceDetail.css'

const RaceDetail = (props) => {
    const [showRaceEditModal, setShowRaceEditModal] = useState(false);

    return (
        <div>
            <div className="section-header">Details</div>
            <div className="detail-container">
                <div className="text-details">
                    <div className="detail"><span className="detail-label">Name: </span>{props.race.race_name}</div>
                    <div className="detail"><span className="detail-label">Start Date: </span>{props.race.race_start_date}</div>
                    <div className="detail"><span className="detail-label">Finish Opens: </span>{props.race.race_finish_opens ? props.race.race_finish_opens.replace("Z","").replace("T"," ") : ""}</div>
                    <div className="detail"><span className="detail-label">Finish Closes: </span>{props.race.race_finish_closes ? props.race.race_finish_closes.replace("Z","").replace("T"," ") : ""}</div>
                    <div className="detail"><span className="detail-label">Start Location: </span>{props.race.race_start_address}, {props.race.race_start_city}, {props.race.race_start_state}, {props.race.race_start_zip}</div>
                </div>
                <RaceLocationMap placeId={props.race.race_start_place_id} />
                <button type="button" onClick={() => setShowRaceEditModal(true)} className="edit-button">Edit</button>
            </div>
            <RaceEditModal race={props.race} showRaceEditModal={showRaceEditModal} setShowRaceEditModal={setShowRaceEditModal} token={props.token} getRaceInfo={props.getRaceInfo} />
        </div>
    );
}
 
export default RaceDetail;