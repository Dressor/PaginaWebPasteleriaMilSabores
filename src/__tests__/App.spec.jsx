import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';

describe('App (smoke)', () => {
  it('renderiza sin lanzar errores', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const root = createRoot(div);
    expect(() => root.render(<App />)).not.toThrow();
    root.unmount();
    document.body.removeChild(div);
  });
});
