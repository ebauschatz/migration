const RaceLegRow = (props) => {
    return (
        <tr>
            <td>{props.leg.leg_number}</td>
            <td>{props.leg.leg_distance}</td>
            <td onClick={() => props.handleShowLegLocation(props.leg)}>View Exchange Location</td>
        </tr>
    );
}
 
export default RaceLegRow;