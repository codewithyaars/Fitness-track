import React from 'react';
import Card from '../ui/Card';
import { resultsData } from '../../data/resultsData';
import { TrendingUp, Award, BarChart } from 'lucide-react';

const ResultsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Expected Results</h1>
        <p className="text-slate-400">What to expect after consistently following the 1-month plan</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {resultsData.map((result, index) => (
          <Card key={index} title={`Result ${index + 1}`} className="h-full">
            <div className="flex items-center h-full">
              <div className={`p-3 rounded-full mr-4 ${
                index === 0 ? 'bg-purple-500/20' : 
                index === 1 ? 'bg-red-500/20' : 
                'bg-green-500/20'
              }`}>
                {index === 0 ? (
                  <BarChart className="text-purple-400\" size={24} />
                ) : index === 1 ? (
                  <TrendingUp className="text-red-400" size={24} />
                ) : (
                  <Award className="text-green-400" size={24} />
                )}
              </div>
              <p className="text-slate-300 font-medium">{result.description}</p>
            </div>
          </Card>
        ))}
      </div>
      
      <Card title="Progress Tracking Tips" className="mb-6">
        <div className="space-y-4">
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h3 className="font-medium text-indigo-400 mb-2">Take Weekly Photos</h3>
            <p className="text-slate-300">Visual progress is often more motivating than numbers on a scale</p>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-400 mb-2">Measure Key Areas</h3>
            <p className="text-slate-300">Track waist, chest, and hip measurements weekly</p>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h3 className="font-medium text-amber-400 mb-2">Note Energy Levels</h3>
            <p className="text-slate-300">Keep track of how your energy and mood improve over time</p>
          </div>
        </div>
      </Card>
      
      <Card title="Important Reminder" className="bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="p-2 text-center">
          <p className="text-lg text-slate-300 font-medium">
            Results require consistency! 
            <span className="block text-emerald-400 mt-1">
              30 days of discipline = visible transformation
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ResultsSection;