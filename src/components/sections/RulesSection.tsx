import React from 'react';
import Card from '../ui/Card';
import { rulesData } from '../../data/rulesData';
import { CheckCircle, XCircle } from 'lucide-react';

const RulesSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Rules to Follow</h1>
        <p className="text-slate-400">Important guidelines for your fitness journey</p>
      </div>
      
      <Card title="Critical Rules" className="mb-6">
        <div className="space-y-4">
          {rulesData.map((rule, index) => (
            <div key={index} className="flex items-start p-3 bg-slate-800/50 rounded-lg">
              <div className="bg-green-500/20 p-2 rounded-full mr-3 flex-shrink-0">
                <CheckCircle className="text-green-400" size={20} />
              </div>
              <div>
                <p className="text-slate-300 font-medium">{rule.rule}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <Card title="Things to Avoid" className="mb-6">
        <div className="space-y-4">
          <div className="flex items-start p-3 bg-slate-800/50 rounded-lg">
            <div className="bg-red-500/20 p-2 rounded-full mr-3 flex-shrink-0">
              <XCircle className="text-red-400" size={20} />
            </div>
            <div>
              <p className="text-slate-300 font-medium">Fried foods and junk food (chips, samosa, etc.)</p>
            </div>
          </div>
          
          <div className="flex items-start p-3 bg-slate-800/50 rounded-lg">
            <div className="bg-red-500/20 p-2 rounded-full mr-3 flex-shrink-0">
              <XCircle className="text-red-400" size={20} />
            </div>
            <div>
              <p className="text-slate-300 font-medium">Sugary drinks and sweets (cold drinks, mithai)</p>
            </div>
          </div>
          
          <div className="flex items-start p-3 bg-slate-800/50 rounded-lg">
            <div className="bg-red-500/20 p-2 rounded-full mr-3 flex-shrink-0">
              <XCircle className="text-red-400" size={20} />
            </div>
            <div>
              <p className="text-slate-300 font-medium">Irregular meals and sleeping schedule</p>
            </div>
          </div>
        </div>
      </Card>
      
      <Card title="Consistency Tips" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-400 mb-2">Track Progress</h3>
            <p className="text-slate-300">Keep a journal of your daily activities and weight changes</p>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h3 className="font-medium text-green-400 mb-2">Stay Accountable</h3>
            <p className="text-slate-300">Share your journey with a friend or family member</p>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h3 className="font-medium text-amber-400 mb-2">Be Flexible</h3>
            <p className="text-slate-300">If you miss a workout, don't stress - just walk that day</p>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h3 className="font-medium text-purple-400 mb-2">Stay Hydrated</h3>
            <p className="text-slate-300">Keep a water bottle with you at all times</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RulesSection;