import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header component', () => {
  it('renders children correctly', () => {
    render(<Header>Test Header</Header>);
    expect(screen.getByText('Test Header')).toBeInTheDocument();
  });

  it('applies additional props to the header element', () => {
    render(<Header className='custom-class'>Test Header</Header>);
    const headerElement = screen.getByText('Test Header').parentElement;
    expect(headerElement).toHaveClass('custom-class');
    expect(headerElement).toHaveStyle('color: rgb(255, 255, 255)');
    expect(headerElement).toHaveStyle('background: rgb(85, 85, 85)');
  });

  /*   it('renders link with correct styles', () => {
    render(
      <Header>
        <a href='#'>Test Link</a>
      </Header>
    );
    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveStyle('color: white');
    linkElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    expect(linkElement).toHaveStyle('color: lime');
  }); */
});
