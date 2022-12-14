import React, { useEffect } from 'react';
import AssignedLegRow from '../AssignedLegRow/AssignedLegRow';
import './AssignedLegs.css'

const AssignedLegs = (props) => {
    useEffect(() => {
        props.getAssignedLegs();
    }, []);

    return (
        <div>
            <div className="section-header">Assigned Legs</div>
            <table className="assigned-table">
                <thead>
                    <tr>
                        <th className="assigned-element">Leg Number</th>
                        <th className="assigned-element">Leg Distance</th>
                        <th className="assigned-element">Runner Name</th>
                        <th className="assigned-element">Runner Pace</th>
                        <th  className="assigned-element"></th>
                        <th  className="assigned-element"></th>
                        <th  className="assigned-element"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.assignedLegs.map((runnerLeg) => {
                        return <AssignedLegRow key={runnerLeg.id} runnerLeg={runnerLeg} runners={props.runners} reassignRunnerLeg={props.reassignRunnerLeg} />
                    })}
                </tbody>
            </table>
            
        </div>
    );
}
 
export default AssignedLegs;