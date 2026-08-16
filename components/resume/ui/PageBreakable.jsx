"use client"

import React, { createContext, useContext } from 'react';

export const VisibilityContext = createContext(null);

const PageBreakable = ({ id, children, className = '' }) => {
  const visibleIds = useContext(VisibilityContext);
  const isVisible = visibleIds ? visibleIds.has(id) : true;

  if (!isVisible) {
    return <div id={id} className={`page-breakable ${className}`} style={{ display: 'none' }} />;
  }

  return (
    <div id={id} className={`page-breakable ${className}`}>
      {children}
    </div>
  );
};

export default PageBreakable;
