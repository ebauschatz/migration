const JoinRacesList = (props) => {

    return (
        <table>
            <thead>
                <tr>
                    <td>Race Name</td>
                    <td>Start Date</td>
                </tr>
            </thead>
            <tbody>
                {props.races.map((race) => {
                    return <tr key={race.id} onClick={() => props.setRaceId(race.id)}>
                        <td>{race.race_name}</td>
                        <td>{race.race_start_date}</td>
                    </tr>
                })}
            </tbody>
            
        </table>
    );
}
 
export default JoinRacesList;