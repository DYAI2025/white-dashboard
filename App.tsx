import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Projects } from './pages/Projects';
import { MetricsPage } from './pages/Metrics';
import { ProjectDetail } from './pages/ProjectDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="metrics" element={<MetricsPage />} />
          {/* Placeholder for settings */}
          <Route path="settings" element={<div className="text-slate-500 p-8">System Configuration: Restricted Access</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;