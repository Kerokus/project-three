//import components
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';

//import pages
import Home from "./Home";
import Missions from "./Missions";
import Teams from "./Teams";
import NavbarComponent from "../components/NavbarComponent";

function App() {
  return (
    <>
    <NavbarComponent />
    <div className="App-container">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/missions' element={<Missions />} />
        <Route path='/teams' element={<Teams />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
