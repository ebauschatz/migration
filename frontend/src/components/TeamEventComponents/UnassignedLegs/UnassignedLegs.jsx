import React, { useEffect } from 'react';
import UnassignedLegRow from "../UnassignedLegRow/UnassignedLegRow";
import './UnassignedLegs.css'

const UnassignedLegs = (props) => {
    useEffect(() => {
        props.getUnassignedLegs();
    }, []);

    return (
        <div>
            <div className="section-header">Unassigned Legs</div>
            <table className="unassigned-table">
                <thead>
                    <tr>
                        <th className="unassigned-element">Leg Number</th>
                        <th className="unassigned-element">Leg Distance</th>
                        <th className="unassigned-element"></th>
                        <th className="unassigned-element"></th>
                        <th className="unassigned-element"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.unassignedLegs.map((leg) => {
                        return <UnassignedLegRow key={leg.id} leg={leg} runners={props.runners} assignRunnerLeg={props.assignRunnerLeg} />
                    })}
                </tbody>
            </table>
        </div>
    );
}
 
export default UnassignedLegs;