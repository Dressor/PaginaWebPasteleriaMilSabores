// src/components/SectionHeader.jsx
import React from 'react';

export default function SectionHeader({ title, subtitle }) {
  return (
    <header className="section-header rounded-3 mb-4">
      <div className="container py-4">
        <h1 className="brand-font text-choco mb-1">{title}</h1>
        {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
      </div>
    </header>
  );
}
