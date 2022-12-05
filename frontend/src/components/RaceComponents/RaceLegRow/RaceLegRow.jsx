const RaceLegRow = (props) => {
    return (
        <tr>
            <td>{props.leg.leg_number}</td>
            <td>{props.leg.leg_distance}</td>
            <td onClick={() => props.handleShowLegLocation(props.leg)}>View Exchange Location</td>
            <td><i className="fa fa-trash-o" onClick={() => props.deleteRaceLeg(props.leg.id)}></i></td>
        </tr>
    );
}
 
export default RaceLegRow;