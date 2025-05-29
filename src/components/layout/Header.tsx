import React from 'react';
import { Dumbbell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white py-4 shadow-lg border-b border-slate-800">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Dumbbell size={28} className="text-emerald-400" />
          <h1 className="text-2xl font-bold">FitLife Pro</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">30-Day Plan</span>
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">Vegetarian</span>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium">Home Meals</span>
        </div>
      </div>
    </header>
  );
};

export default Header;