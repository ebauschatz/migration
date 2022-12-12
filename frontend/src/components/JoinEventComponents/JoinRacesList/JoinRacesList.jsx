import './JoinRacesList.css';

const JoinRacesList = (props) => {
    return (
        <div>
            <div className="section-header">Available Races</div>
            <table className="join-race-table">
                <thead>
                    <tr>
                        <th className="join-race-element">Race Name</th>
                        <th className="join-race-element">Start Date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.races.map((race) => {
                        return <tr key={race.id} onClick={() => props.setRaceId(race.id)} className="join-race-row">
                            <td className="join-race-data">{race.race_name}</td>
                            <td className="join-race-data">{race.race_start_date}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            </div>
    );
}
 
export default JoinRacesList;