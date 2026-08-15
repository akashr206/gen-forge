"use client"

import React, { createContext, useContext } from 'react';

export const VisibilityContext = createContext(null);

const PageBreakable = ({ id, children, className = '' }) => {
  const visibleIds = useContext(VisibilityContext);
  const isVisible = visibleIds ? visibleIds.has(id) : true;

  return (
    <div 
      id={id} 
      className={`page-breakable ${className}`} 
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {children}
    </div>
  );
};

export default PageBreakable;
