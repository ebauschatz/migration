import './RaceLegRow.css'

const RaceLegRow = (props) => {
    return (
        <tr className="leg-row">
            <td className="leg-data-element">{props.leg.leg_number}</td>
            <td className="leg-data-element">{props.leg.leg_distance}</td>
            <td className="leg-data-element leg-exchange-view" onClick={() => props.handleShowLegLocation(props.leg)}>View Exchange</td>
            <td className="leg-data-element leg-view-edit" onClick={() => props.handleShowLegEdit(props.leg)}>Edit</td>
            <td className="leg-data-element"><i className="fa fa-trash-o leg-delete-icon" onClick={() => props.deleteRaceLeg(props.leg.id)}></i></td>
        </tr>
    );
}
 
export default RaceLegRow;