const RaceDetail = (props) => {
    return (
        <div>
            <h4>Race Details</h4>
            Race Name: {props.race.race_name}<br />
            Start Date: {props.race.race_start_date}<br />
            Finish Opens: {props.race.race_finish_opens}<br />
            Finish Closes: {props.race.race_finish_closes}<br />
        </div>
    );
}
 
export default RaceDetail;