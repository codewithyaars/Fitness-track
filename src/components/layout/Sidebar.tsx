import React from 'react';
import { Calendar, Clock, Utensils, Code, ClipboardList, TrendingUp, LineChart } from 'lucide-react';
import Dumbbell from '../ui/Dumbbell';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'timetable', label: 'Daily Schedule', icon: <Clock size={20} /> },
    { id: 'workout', label: 'Workout Plan', icon: <Dumbbell size={20} /> },
    { id: 'diet', label: 'Meal Plan', icon: <Utensils size={20} /> },
    { id: 'coding', label: 'Coding Schedule', icon: <Code size={20} /> },
    { id: 'rules', label: 'Guidelines', icon: <ClipboardList size={20} /> },
    { id: 'results', label: 'Expected Results', icon: <TrendingUp size={20} /> },
    { id: 'progress', label: 'Progress Tracker', icon: <LineChart size={20} /> },
  ];

  return (
    <aside className="bg-slate-900 text-slate-300 w-full md:w-64 p-4 md:min-h-screen border-r border-slate-800">
      <div className="flex items-center justify-center md:justify-start mb-8 mt-2">
        <Calendar className="text-emerald-400 mr-2" />
        <h2 className="text-xl font-semibold text-white">30-Day Plan</h2>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-slate-800/80 text-emerald-400 shadow-lg'
                    : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;