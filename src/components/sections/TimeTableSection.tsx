import React from 'react';
import Card from '../ui/Card';
import { timeTableData } from '../../data/timeTableData';
import { Clock, Sun, Coffee, Moon } from 'lucide-react';

const TimeTableSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Daily Schedule</h1>
        <p className="text-slate-400">Your optimized daily routine for maximum productivity and health</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Morning Routine" className="bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="space-y-4">
            {timeTableData
              .filter(entry => entry.time.includes('AM'))
              .map((entry, index) => (
                <div 
                  key={index}
                  className={`flex items-center p-4 rounded-lg transition-all ${
                    entry.isHighlighted 
                      ? 'bg-emerald-500/10 border border-emerald-500/20' 
                      : 'bg-slate-800/50 hover:bg-slate-800'
                  }`}
                >
                  <div className={`p-3 rounded-full mr-4 ${
                    entry.isHighlighted ? 'bg-emerald-500/20' : 'bg-slate-700'
                  }`}>
                    <Sun className={entry.isHighlighted ? 'text-emerald-400' : 'text-slate-400'} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${entry.isHighlighted ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {entry.time}
                      </span>
                      <span className={entry.isHighlighted ? 'text-emerald-300' : 'text-slate-400'}>
                        {entry.activity}
                      </span>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </Card>

        <Card title="Evening Routine" className="bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="space-y-4">
            {timeTableData
              .filter(entry => entry.time.includes('PM'))
              .map((entry, index) => (
                <div 
                  key={index}
                  className={`flex items-center p-4 rounded-lg transition-all ${
                    entry.isHighlighted 
                      ? 'bg-purple-500/10 border border-purple-500/20' 
                      : 'bg-slate-800/50 hover:bg-slate-800'
                  }`}
                >
                  <div className={`p-3 rounded-full mr-4 ${
                    entry.isHighlighted ? 'bg-purple-500/20' : 'bg-slate-700'
                  }`}>
                    <Moon className={entry.isHighlighted ? 'text-purple-400' : 'text-slate-400'} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${entry.isHighlighted ? 'text-purple-400' : 'text-slate-300'}`}>
                        {entry.time}
                      </span>
                      <span className={entry.isHighlighted ? 'text-purple-300' : 'text-slate-400'}>
                        {entry.activity}
                      </span>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Schedule Tips" className="bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="font-medium text-emerald-400 mb-2 flex items-center">
              <Sun size={18} className="mr-2" />
              Morning Focus
            </h3>
            <p className="text-slate-300">Start your day with exercise and healthy breakfast to maximize energy</p>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="font-medium text-blue-400 mb-2 flex items-center">
              <Coffee size={18} className="mr-2" />
              Afternoon Balance
            </h3>
            <p className="text-slate-300">Mix productive work with regular breaks and healthy snacks</p>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="font-medium text-purple-400 mb-2 flex items-center">
              <Moon size={18} className="mr-2" />
              Evening Routine
            </h3>
            <p className="text-slate-300">Wind down with light activities and prepare for quality sleep</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TimeTableSection;