import React from 'react';
import Card from '../ui/Card';
import { codingRoutineData } from '../../data/codingRoutineData';
import { Code, Clock, Brain } from 'lucide-react';

const CodingRoutineSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Coding Routine</h1>
        <p className="text-slate-400">Balance your fitness journey with productive coding sessions</p>
      </div>
      
      <Card title="Daily Coding Schedule" className="mb-6">
        <div className="divide-y divide-slate-700">
          {codingRoutineData.map((item, index) => (
            <div key={index} className="py-4 flex items-start">
              <div className="bg-purple-500/20 p-2 rounded-full mr-4">
                <Clock className="text-purple-400" size={20} />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="font-medium text-slate-300">{item.time}</h3>
                  <span className="text-purple-400 font-medium">{item.activity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Learning Tips" className="h-full">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-amber-500/20 p-2 rounded-full mr-3 mt-1">
                <Brain className="text-amber-400" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-slate-300">Maximize Morning Focus</h3>
                <p className="text-slate-400">Morning 9-12 session is for deep learning - tackle the hardest problems when your mind is fresh.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-amber-500/20 p-2 rounded-full mr-3 mt-1">
                <Brain className="text-amber-400" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-slate-300">Afternoon Projects</h3>
                <p className="text-slate-400">Post-lunch time is ideal for practical application - work on projects and tutorials.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-amber-500/20 p-2 rounded-full mr-3 mt-1">
                <Brain className="text-amber-400" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-slate-300">Evening Review</h3>
                <p className="text-slate-400">Keep evening learning light - perfect for revision and watching educational content.</p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="Coding Environment Setup" className="h-full">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-500/20 p-2 rounded-full mr-3 mt-1">
                <Code className="text-blue-400" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-slate-300">Setup Pomodoro Timer</h3>
                <p className="text-slate-400">Work in 25-minute focused blocks with 5-minute breaks to maintain productivity.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500/20 p-2 rounded-full mr-3 mt-1">
                <Code className="text-blue-400" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-slate-300">Minimize Distractions</h3>
                <p className="text-slate-400">Put your phone on silent, close social media tabs, and create a focused environment.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-500/20 p-2 rounded-full mr-3 mt-1">
                <Code className="text-blue-400" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-slate-300">Track Progress Daily</h3>
                <p className="text-slate-400">Keep a coding journal to track what you've learned and accomplished each day.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CodingRoutineSection;