import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-slate-900 rounded-xl shadow-xl border border-slate-800 overflow-hidden transition-all hover:shadow-2xl ${className}`}>
      <div className="bg-slate-800/50 py-4 px-5 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};

export default Card;