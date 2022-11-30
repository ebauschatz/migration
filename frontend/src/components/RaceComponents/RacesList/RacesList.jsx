const RacesList = (props) => {
    return (
        <div>
            {props.races.map((race) => {
                return <div key={race.id}>{race.race_name}</div>
            })}
        </div>
    );
}
 
export default RacesList;