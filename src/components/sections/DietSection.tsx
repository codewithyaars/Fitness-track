import React from 'react';
import Card from '../ui/Card';
import { dietData } from '../../data/dietData';
import { Utensils } from 'lucide-react';

const DietSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Diet Plan</h1>
        <p className="text-slate-400">Vegetarian meal plan with ghar ka khana options</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dietData.map((meal, index) => (
          <Card key={index} title={meal.title} className="h-full">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${
                  index % 3 === 0 ? 'bg-green-500/20' : 
                  index % 3 === 1 ? 'bg-amber-500/20' : 'bg-blue-500/20'
                }`}>
                  <Utensils className={`
                    ${index % 3 === 0 ? 'text-green-400' : 
                    index % 3 === 1 ? 'text-amber-400' : 'text-blue-400'}`} 
                    size={20} 
                  />
                </div>
                <span className="text-slate-400 text-sm">{meal.time}</span>
              </div>
              
              <ul className="space-y-2">
                {meal.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-emerald-400 mr-2">•</span>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
              
              {index === 0 && (
                <div className="bg-slate-800/50 p-3 rounded-lg text-blue-400 text-sm mt-4 border border-slate-700">
                  Post-workout nutrition is crucial for recovery!
                </div>
              )}
              
              {index === 3 && (
                <div className="bg-slate-800/50 p-3 rounded-lg text-amber-400 text-sm mt-4 border border-slate-700">
                  Keep dinner light and eat at least 2 hours before sleeping.
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      <Card title="Hydration Reminder" className="bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="flex items-center">
          <div className="bg-blue-500/20 p-3 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
              <path d="M5.5 15a3.5 3.5 0 0 1 0-7h13a3.5 3.5 0 0 1 0 7z"></path>
              <path d="M12 9v12"></path>
              <path d="m11 6 2-3 2 3"></path>
              <path d="M18.7 2.255a10 10 0 0 1 2.204 15.16"></path>
              <path d="M5.3 2.255a10 10 0 0 0-2.205 15.16"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-slate-300">Water Intake</h3>
            <p className="text-blue-400">3-4 liters paani har din (10-12 glasses)</p>
          </div>
        </div>
      </Card>
      
      <div className="text-sm text-slate-400 mt-4">
        <p className="italic">* Cheat meal 1 baar per week allowed (Sunday lunch etc.)</p>
      </div>
    </div>
  );
};

export default DietSection;