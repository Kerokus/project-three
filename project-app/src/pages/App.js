//import components
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import '../styling/app.css';

//import pages
import Home from "./Home";
import Missions from "./Missions";
import Teams from "./Teams";
import NavbarComponent from "../components/NavbarComponent";
import SingleMission from "./SingleMission";
import SingleTeam from "./SingleTeam";
import SinglePerson from "./SinglePerson"
import PersonnelList from "./PersonnelList";
import TeamContext from "./TeamsContext";
import MissionContext from "./MissionContext"
import FooterComponent from '../components/FooterComponent'

function App() {
  const [clickedMission, setClickedMission] = useState(null)
  const [clickedTeam, setClickedTeam] = useState(null)
  return (
    <div className='webpage'>
      <MissionContext.Provider value={{clickedMission, setClickedMission}}>
      <TeamContext.Provider value={{clickedTeam, setClickedTeam}}>
      <NavbarComponent />
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/missions' element={<Missions />} />
          <Route path="/missions/:missionid" element={<SingleMission/>} />
          <Route path='/teams' element={<Teams />} />
          <Route path="/teams/:teamid" element={<SingleTeam/>} />
          <Route path='/personnel' element={<PersonnelList />} />
          <Route path="/personnel/:personid" element={<SinglePerson/>} />
        </Routes>
      </div>
      </TeamContext.Provider>
      </MissionContext.Provider>
      <FooterComponent />
    </div>
  );
}

export default App;
