import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from "react-router-dom";
import TeamScheduleTab from "../../components/TeamEventComponents/TeamScheduleTab/TeamScheduleTab";
import TeamRunnerAssignmentTab from "../../components/TeamEventComponents/TeamRunnerAssignmentTab/TeamRunnerAssignmentTab";
import './TeamEventPage.css'

const TeamEventPage = (props) => {
    const {teamId} = useParams();

    return (
        <Tabs
            defaultActiveKey="schedule"
            transition={true}
            id="teamEventTabGroup"
            className="tabs"
        >
            <Tab eventKey="schedule" title="Schedule">
                <TeamScheduleTab token={props.token} teamId={teamId} />
            </Tab>
            <Tab eventKey="runnerAssignment" title="Runners">
                <TeamRunnerAssignmentTab token={props.token} teamId={teamId} />
            </Tab>
        </Tabs>
    );
}
 
export default TeamEventPage;