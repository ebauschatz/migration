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
    const [raceStarted, setRaceStarted] = useState(false);

    useEffect(() => {
        getRunnerLegs();
        getTeam();
    }, [props.token, props.teamId]);

    async function getTeam() {
        try {
            let response = await axios.get(`http://44.210.130.199:8000/api/teams/${props.teamId}/`, {
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
            let response = await axios.get(`http://44.210.130.199:8000/api/runner_legs/team/${props.teamId}/`, {
                headers: {
                Authorization: "Bearer " + props.token,
                },
            });
            if (response.status === 200) {
                let unsortedLegs = response.data;
                let sortedLegs = [...unsortedLegs].sort((a, b) => a.race_leg.leg_number - b.race_leg.leg_number)
                setRunnerLegs(sortedLegs);
                if (sortedLegs.length > 0) {
                    if (sortedLegs[0].is_completed === true || sortedLegs[0].is_in_progress === true) {
                        setRaceStarted(true);
                    }
                }
                else {
                    setRaceStarted(false)
                }
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function recalculateExchanges(start_time, legIds) {
        let recalculateData = {
            "first_leg_start": start_time,
            "legs": legIds
        }
        try {
            let response = await axios.patch(`http://44.210.130.199:8000/api/teams/recalculate/${props.teamId}/`, 
                recalculateData,
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

    async function startTeamRace() {
        let currentDateTime = new Date().toLocaleString("sv-SE")
        let raceStartData = {
            "team_start": currentDateTime,
            "runner_leg_id": runnerLegs[0].id
        }
        try {
            let response = await axios.patch(`http://44.210.130.199:8000/api/teams/begin/${props.teamId}/`, 
                raceStartData,
                {headers: {
                    Authorization: "Bearer " + props.token,
                    },
            });
            if (response.status === 200) {
                let legIds = runnerLegs.map((runnerLeg) => runnerLeg.id);
                recalculateExchanges(currentDateTime, legIds);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    async function exchangeRunners(exchangeTime) {
        let legs = runnerLegs.filter((runnerLeg) => runnerLeg.is_completed === false);
        let legIds = legs.map((runnerLeg) => runnerLeg.id);
        let exchangeData = {
            "exchange_time": exchangeTime,
            "legs": legIds
        };
        try {
            let response = await axios.patch(`http://44.210.130.199:8000/api/teams/exchange/${props.teamId}/`, 
                exchangeData,
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
            {teamFinshTimeIssue && raceStarted && <TeamScheduleFinishProblem teamFinish={team.team_end} raceFinishOpens={team.race.race_finish_opens} raceFinishCloses={team.race.race_finish_closes} />}
            <div className="start-button">
                {!raceStarted && <button type="button" onClick={() => startTeamRace()}>Start Race</button>}
            </div>
            <TeamScheduleTable runnerLegs={runnerLegs} getRunnerLegs={getRunnerLegs} token={props.token} exchangeRunners={exchangeRunners} />
        </div>
    );
}
 
export default TeamScheduleTab;