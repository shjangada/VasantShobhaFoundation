import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Classes from './Classes';
import OurTeam from './OurTeam'; // Import the OurTeam component
import GetInvolved from './GetInvolved';
import Events from './Events';

const AppRouter = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/events" element={<Events />} />
        <Route path="/involved" element={<GetInvolved />} />
      </Routes>
    </div>
  </Router>
);

export default AppRouter;
