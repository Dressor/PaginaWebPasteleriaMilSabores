import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Layout con Bootstrap', () => {
  it('usa clases container/row/col en alguna parte', () => {
    render(<App />);
    const containers = document.querySelectorAll('.container, .container-fluid');
    expect(containers.length).toBeGreaterThan(0);
  });
});
