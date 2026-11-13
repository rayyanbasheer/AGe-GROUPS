import React, { useState } from 'react';

interface LogoProps {
  light?: boolean;
  className?: string;
}

const LOGO_SRC = '/assets/aistudio/image_63e59713.png';

const Logo: React.FC<LogoProps> = ({ light = false, className = 'h-11 sm:h-12' }) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src={LOGO_SRC}
        alt="AGe Groups Construction"
        onError={() => setImgError(true)}
        className={`${className} w-auto object-contain select-none shrink-0 rounded-xs`}
      />
    );
  }

  return (
    <span className="inline-flex items-baseline gap-1.5 leading-none select-none whitespace-nowrap shrink-0">
      <span className="inline-flex items-baseline">
        <span className={`${light ? 'text-white' : 'text-[#000080]'} font-display font-bold text-2xl tracking-tight`}>
          AG
        </span>
        <span className={`${light ? 'text-blue-200' : 'text-slate-900'} italic font-logo-e text-2xl -ml-0.5`}>
          e
        </span>
      </span>
      <span className={`${light ? 'text-slate-200' : 'text-slate-800'} font-display font-semibold text-base tracking-tight`}>
        Groups
      </span>
    </span>
  );
};

export default Logo;