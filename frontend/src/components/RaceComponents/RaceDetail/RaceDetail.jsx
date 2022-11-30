const RaceDetail = (props) => {
    return (
        <div>
            Race Name: {props.race.race_name}<br />
            Start Date: {props.race.race_start_date}<br />
            Finish Opens: {props.race.race_finish_opens}<br />
            Finish Closes: {props.race.race_finish_closes}<br />
        </div>
    );
}
 
export default RaceDetail;