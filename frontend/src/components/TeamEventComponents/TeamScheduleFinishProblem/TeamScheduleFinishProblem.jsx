const TeamScheduleFinishProblem = (props) => {
    return (
        <div>
            The team is currently projected to finish at {props.teamFinish}. <br />
            The race finish line opens at {props.raceFinishOpens} and closes at {props.raceFinishCloses}. <br />
            Please work with race command to get back on schedule.
        </div>
    );
}
 
export default TeamScheduleFinishProblem;