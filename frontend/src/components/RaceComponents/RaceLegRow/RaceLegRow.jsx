const RaceLegRow = (props) => {
    return (
        <tr>
            <td>{props.leg.leg_number}</td>
            <td>{props.leg.leg_distance}</td>
        </tr>
    );
}
 
export default RaceLegRow;