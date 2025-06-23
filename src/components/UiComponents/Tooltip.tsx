import React, { useState } from "react";

const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      tabIndex={0}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      <span
        className={`absolute z-50 left-1/2 -translate-x-1/2 mt-3 px-4 py-2 bg-white text-gray-900 text-xs rounded-full border border-gray-200 shadow-lg min-w-[120px] max-w-xs transition-opacity duration-200 whitespace-pre-line break-words ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ wordBreak: 'break-word', whiteSpace: 'pre-line', top: '100%' }}
        aria-hidden={!show}
      >
        {content}
      </span>
    </span>
  );
};

export default Tooltip; 