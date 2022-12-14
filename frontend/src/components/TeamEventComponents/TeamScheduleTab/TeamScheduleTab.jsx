import React, { useState, useEffect } from 'react';
import axios from "axios";
import TeamScheduleTable from "../TeamScheduleTable/TeamScheduleTable";
import TeamScheduleTimes from "../TeamScheduleTimes/TeamScheduleTimes";
import TeamScheduleFinishProblem from '../TeamScheduleFinishProblem/TeamScheduleFinishProblem';
import './TeamScheduleTab.css'

const TeamScheduleTab = (props) => {
    const [runnerLegs, setRunnerLegs] = useState([]);
    const [team, setTeam] = useState("");
    const [teamFinshTimeIssue, setTeamFinishTimeIssue] = useState(false);

    useEffect(() => {
        getRunnerLegs();
        getTeam();
    }, [props.token, props.teamId]);

    async function getTeam() {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/teams/${props.teamId}/`, {
                headers: {
                Authorization: "Bearer " + props.token,
                },
            });
            if (response.status === 200) {
                setTeam(response.data);
                checkTeamFinishTime(response.data.team_end, response.data.race.race_finish_opens, response.data.race.race_finish_closes);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function getRunnerLegs() {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/runner_legs/team/${props.teamId}/`, {
                headers: {
                Authorization: "Bearer " + props.token,
                },
            });
            if (response.status === 200) {
                let unsortedLegs = response.data;
                let sortedLegs = [...unsortedLegs].sort((a, b) => a.race_leg.leg_number - b.race_leg.leg_number)
                setRunnerLegs(sortedLegs);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function startTeamRace() {
        let raceStartData = {
            "team_start": new Date().toLocaleString("sv-SE"),
            "runner_leg_id": runnerLegs[0].id
        }
        try {
            let response = await axios.patch(`http://127.0.0.1:8000/api/teams/begin/${props.teamId}/`, 
                raceStartData,
                {headers: {
                    Authorization: "Bearer " + props.token,
                    },
            });
            if (response.status === 200) {
                getRunnerLegs();
                getTeam();
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    function checkTeamFinishTime(teamFinishTime, raceFinishOpens, raceFinishCloses) {
        if (teamFinishTime < raceFinishOpens || teamFinishTime > raceFinishCloses) {
            setTeamFinishTimeIssue(true);
        }
        else {
            setTeamFinishTimeIssue(false);
        }
    }

    return (
        <div>
            <TeamScheduleTimes team={team} token={props.token} checkTeamFinishTime={checkTeamFinishTime} setTeam={setTeam} />
            {teamFinshTimeIssue && <TeamScheduleFinishProblem teamFinish={team.team_end} raceFinishOpens={team.race.race_finish_opens} raceFinishCloses={team.race.race_finish_closes} />}
            <div className="start-button"><button type="button" onClick={() => startTeamRace()}>Start Race</button></div>
            <TeamScheduleTable runnerLegs={runnerLegs} getRunnerLegs={getRunnerLegs} token={props.token} />
        </div>
    );
}
 
export default TeamScheduleTab;