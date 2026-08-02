import React from 'react';

interface LogoProps {
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ light = false }) => {
  return (
    <div className="flex flex-col items-center leading-none select-none">
      <div className="flex items-baseline">
        <span className={`${light ? 'text-white' : 'text-blue-900'} font-bold text-3xl tracking-tighter`}>AG</span>
        <span className="text-black italic font-logo-e text-2xl -ml-0.5">e</span>
      </div>
      <div className="bg-slate-200 px-3 py-1 mt-1 rounded-sm shadow-sm">
        <span className="text-[#000080] font-black text-sm tracking-[0.2em] uppercase">Groups</span>
      </div>
    </div>
  );
};

export default Logo;