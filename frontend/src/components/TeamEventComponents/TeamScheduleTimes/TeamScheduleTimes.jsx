import React, { useState } from 'react';
import axios from 'axios';
import TeamScheduleChangeDateTime from '../TeamScheduleChangeDateTime/TeamScheduleChangeDateTime';
import './TeamScheduleTimes.css'

const TeamScheduleTimes = (props) => {
    const [showStartTimeEditModal, setShowStartTimeEditModal] = useState(false);
    const [showEndTimeEditModal, setShowEndTimeEditModal] = useState(false);

    function updateTeamStartTime(newStartTime) {
        let updatedTeamData = {
            "team_name": props.team.team_name,
            "team_start": newStartTime,
            "team_end": props.team.team_end,
            "race_id": props.team.race.id
        }
        updateTeam(updatedTeamData);
        setShowStartTimeEditModal(false);
    }

    function updateTeamEndTime(newEndTime) {
        let updatedTeamData = {
            "team_name": props.team.team_name,
            "team_start": props.team.team_start,
            "team_end": newEndTime,
            "race_id": props.team.race.id
        }
        updateTeam(updatedTeamData);
        setShowEndTimeEditModal(false);
    }

    async function updateTeam(team) {
        try {
            let response = await axios.put(`http://127.0.0.1:8000/api/teams/${props.team.id}/`,
                team,
                {headers: {
                Authorization: "Bearer " + props.token,
                },
            });
            if (response.status === 200) {
                props.setTeam(response.data);
                props.checkTeamFinishTime(response.data.team_end, response.data.race.race_finish_opens, response.data.race.race_finish_closes);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }
    
    return (
        <div className="times-container">
            <div>
                <b>Team Start Time:</b> <span onClick={() => setShowStartTimeEditModal(true)} className="team-time">{props.team.team_start}</span>
                <TeamScheduleChangeDateTime showTimeEditModal={showStartTimeEditModal} setShowTimeEditModal={setShowStartTimeEditModal} initialValue={props.team.team_start} handleSubmit={updateTeamStartTime} />
            </div>
            <div>
                <b>Team End Time:</b> <span onClick={() => setShowEndTimeEditModal(true)} className="team-time">{props.team.team_end}</span>
                <TeamScheduleChangeDateTime showTimeEditModal={showEndTimeEditModal} setShowTimeEditModal={setShowEndTimeEditModal} initialValue={props.team.team_end} handleSubmit={updateTeamEndTime} />
            </div>
        </div>
    );
}
 
export default TeamScheduleTimes;