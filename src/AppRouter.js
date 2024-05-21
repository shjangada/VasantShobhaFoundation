import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import YouthClasses from './YouthClasses';
import AdultClasses from './AdultClasses';
import OurTeam from './OurTeam'; // Import the OurTeam component
import GetInvolved from './GetInvolved';

const AppRouter = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/youth" element={<YouthClasses />} />
        <Route path="/adult" element={<AdultClasses />} />
        <Route path="/team" element={<OurTeam />} /> {/* Add the Our Team route */}
        <Route path="/involved" element={<GetInvolved />} /> {/* Add the Our Team route */}
      </Routes>
    </div>
  </Router>
);

export default AppRouter;
