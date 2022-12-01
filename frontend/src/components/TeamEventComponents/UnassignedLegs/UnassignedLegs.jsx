import React, { useEffect } from 'react';
import UnassignedLegRow from "../UnassignedLegRow/UnassignedLegRow";

const UnassignedLegs = (props) => {
    useEffect(() => {
        props.getUnassignedLegs();
    }, []);

    return (
        <div>
            <h2>Unassigned Legs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Leg Number</th>
                        <th>Leg Distance</th>
                    </tr>
                </thead>
                <tbody>
                    {props.unassignedLegs.map((leg) => {
                        return <UnassignedLegRow key={leg.id} leg={leg} />
                    })}
                </tbody>
            </table>
        </div>
    );
}
 
export default UnassignedLegs;