import React from 'react';

const Dumbbell: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 24, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6.5 6.5 11 11"></path>
      <path d="m21 21-1-1"></path>
      <path d="m3 3 1 1"></path>
      <path d="m18 22 4-4"></path>
      <path d="m2 6 4-4"></path>
      <path d="m3 10 7-7"></path>
      <path d="m14 21 7-7"></path>
    </svg>
  );
};

export default Dumbbell;