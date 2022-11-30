import '../styling/singleteam.css'
import Card from 'react-bootstrap/Card';
import TeamContext from "./TeamsContext";
import React, { useState, useEffect, useContext } from "react";

const SingleTeam = () => {
  var htmlRender = [];
  const { clickedTeam, setClickedTeam } = useContext(TeamContext)
  const [personnelData, setPersonnelData] = useState([]);
  const [missionData, setMissionData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  

    //FETCH MISSION DATA
    useEffect(() => {
      fetch("http://localhost:8081/missions")
        .then((res) => res.json())
        .then((data) => {
          let dataSlice = data.map((item) => {
            if (item.start_date) {
              item.start_date = item.start_date.slice(0, 10);
              item.end_date = item.end_date.slice(0, 10);
            }
            return item;
          });
          setMissionData(dataSlice);
          return fetch("http://localhost:8081/teams")
        })
        .then((response => response.json()))
        .then(teamDatum => setTeamData(teamDatum))
        .catch((error) => {
          console.error(error);
          return [];
        });
    }, [refresh]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch("http://localhost:8081/personnel");
        let peeps = await res.json();
        setPersonnelData(peeps);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [])

  if(!clickedTeam || !personnelData) {return <></>} 
  return (
     <><br />
     <div className="row row-cols-2 justify-content-center">
     <Card bg='dark' border='light' text='white' className="team-card">
       <Card.Body className='team-card-body'>
         <Card.Title>{clickedTeam.name} Team </Card.Title>
         <div className="mb-2 text-muted">
         {missionData.forEach(mission => {
            let missionId = mission.id
            let teamMissionId = (clickedTeam['mission_id'])
            if (missionId === teamMissionId) {
              clickedTeam.mission_location = mission.location
            }
          })}
          Current Location: {clickedTeam.mission_location}
          </div>
         <Card.Text className="mb-2 text-muted">Team Size: {clickedTeam.current_size} <br /> </Card.Text>
         <Card.Footer>
           Members:<br />
           <hr />
           {personnelData.map(row => {
             return row.team_id === clickedTeam.id 
                ? <div key={row.id}>{row.rank} {row.first_name} {row.last_name}</div>
                : null
           })}
         </Card.Footer>
       </Card.Body>
     </Card>
     </div>
     <br />
     </>
   )
}

export default SingleTeam



