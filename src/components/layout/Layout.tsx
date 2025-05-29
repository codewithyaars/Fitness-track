import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TimeTableSection from '../sections/TimeTableSection';
import WorkoutSection from '../sections/WorkoutSection';
import DietSection from '../sections/DietSection';
import CodingRoutineSection from '../sections/CodingRoutineSection';
import RulesSection from '../sections/RulesSection';
import ResultsSection from '../sections/ResultsSection';
import ProgressSection from '../sections/ProgressSection';
import { Menu, X } from 'lucide-react';

const Layout: React.FC = () => {
  const [activeSection, setActiveSection] = useState('timetable');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'timetable':
        return <TimeTableSection />;
      case 'workout':
        return <WorkoutSection />;
      case 'diet':
        return <DietSection />;
      case 'coding':
        return <CodingRoutineSection />;
      case 'rules':
        return <RulesSection />;
      case 'results':
        return <ResultsSection />;
      case 'progress':
        return <ProgressSection />;
      default:
        return <TimeTableSection />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Header />
      
      <div className="md:hidden p-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center p-2 bg-slate-800 rounded-lg text-white"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="ml-2">{sidebarOpen ? 'Close Menu' : 'Menu'}</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="md:hidden">
            <Sidebar activeSection={activeSection} setActiveSection={(section) => {
              setActiveSection(section);
              setSidebarOpen(false);
            }} />
          </div>
        )}
        
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
        
        <main className="flex-1 p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Layout;