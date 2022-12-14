import './TeamScheduleFinishProblem.css'

const TeamScheduleFinishProblem = (props) => {
    return (
        <div className="problem-banner">
            <div>The team is currently projected to finish at <b>{props.teamFinish.replace("Z","").replace("T"," ")}</b>.</div>
            <div>The race finish line opens at <b>{props.raceFinishOpens.replace("Z","").replace("T"," ")}</b> and closes at <b>{props.raceFinishCloses.replace("Z","").replace("T"," ")}</b>.</div>
            <div>Please work with race command to get back on schedule.</div>
        </div>
    );
}
 
export default TeamScheduleFinishProblem;