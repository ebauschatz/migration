import React, { useEffect } from 'react';
import AssignedLegRow from '../AssignedLegRow/AssignedLegRow';

const AssignedLegs = (props) => {
    useEffect(() => {
        props.getAssignedLegs();
    }, []);

    return (
        <div>
            <h2>Assigned Legs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Leg Number</th>
                        <th>Leg Distance</th>
                        <th>Runner Name</th>
                        <th>Runner Pace</th>
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