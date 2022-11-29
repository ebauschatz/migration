import React, { useState, useEffect } from 'react';
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import JoinRacesList from '../../components/JoinEventComponents/JoinRacesList/JoinRacesList';
import JoinTeamsList from '../../components/JoinEventComponents/JoinTeamsList/JoinTeamsList';
import JoinTeamModal from '../../components/JoinEventComponents/JoinTeamModal/JoinTeamModal';
import CreateTeamModal from '../../components/JoinEventComponents/CreateTeamModal/CreateTeamModal';

const JoinEventPage = (props) => {
    const [user, token] = useAuth();
    const [races, setRaces] = useState([]);
    const [raceId, setRaceId] = useState();
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState({});
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
    const [allTeamRoles, setAllTeamRoles] = useState([]);

    useEffect(() => {
        const getAllRaces = async () => {
            try {
                let response = await axios.get("http://127.0.0.1:8000/api/races/all/", {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                });
                setRaces(response.data);
              }
            catch (error) {
                console.log(error.response.data);
            }
        }
        getAllRaces();
    }, [token])
    
    useEffect(() => {
        const fetchRunnerRoles = async () => {
            try {
                let response = await axios.get("http://127.0.0.1:8000/api/team_roles/all/", {
                    headers: {
                    Authorization: "Bearer " + token,
                    },
                });
                setAllTeamRoles(response.data);
            }
            catch (error) {
                console.log(error.response.data);
            }
        }
        fetchRunnerRoles();
    }, [token]);
    
    useEffect(() => {
        const getRaceTeams = async () => {
            if (raceId > 0) {
                try {
                    let response = await axios.get(`http://127.0.0.1:8000/api/teams/race/${raceId}/`, {
                        headers: {
                            Authorization: "Bearer " + token,
                          },
                        });
                    setTeams(response.data);
                }
                catch (error) {
                    console.log(error.response.data);
                }
            }
        }
        getRaceTeams();
    }, [raceId, token]);

    return (
        <div>
            <JoinRacesList races={races} setRaceId={setRaceId} />
            {raceId && <JoinTeamsList token={token} raceId={raceId} teams={teams} setTeams={setTeams} setSelectedTeam={setSelectedTeam} setShowJoinModal={setShowJoinModal} showCreateTeamModal={showCreateTeamModal} setShowCreateTeamModal={setShowCreateTeamModal} />}
            <JoinTeamModal allTeamRoles={allTeamRoles} selectedTeam={selectedTeam} showJoinModal={showJoinModal} setShowJoinModal={setShowJoinModal} userId={user.id} token={token} />
            <CreateTeamModal raceId={raceId} allTeamRoles={allTeamRoles} userId={user.id} token={token} showCreateTeamModal={showCreateTeamModal} setShowCreateTeamModal={setShowCreateTeamModal} />
        </div>
    );
}
 
export default JoinEventPage;