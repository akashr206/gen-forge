"use client"

import React, { createContext, useContext } from 'react';

export const VisibilityContext = createContext(null);

const PageBreakable = ({ id, children, className = '' }) => {
  const visibleIds = useContext(VisibilityContext);
  const isVisible = visibleIds ? visibleIds.has(id) : true;

  if (!isVisible) {
    return (
      <div id={id} className={`page-breakable print:break-inside-avoid ${className}`} style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }

  return (
    <div id={id} className={`page-breakable print:break-inside-avoid ${className}`}>
      {children}
    </div>
  );
};

export default PageBreakable;
