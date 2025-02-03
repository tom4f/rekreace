import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';

import { Header } from './Header';

const RouterWrapper = ({ children }: { children: ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe('Header component', () => {
  it('renders children correctly', () => {
    render(<Header>Test Header</Header>);
    expect(screen.getByText('Test Header')).toBeInTheDocument();
  });

  it('renders NavLink with correct styles', () => {
    render(
      <RouterWrapper>
        <Header>
          <NavLink to='/'>Start</NavLink>
        </Header>
      </RouterWrapper>
    );
    const headerElement = screen.getByText('Start').parentElement;
    // expect(headerElement).toHaveClass('custom-class');
    expect(headerElement).toHaveStyle('color: rgb(255, 255, 255)');
    expect(headerElement).toHaveStyle('background: rgb(85, 85, 85)');
  });

  it('renders link with correct styles', () => {
    render(
      <Header>
        <a href='#'>Test Link</a>
      </Header>
    );
    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveStyle('color: rgb(0, 255, 0)');
    linkElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    expect(linkElement).toHaveStyle('color: rgb(0, 255, 0)');
  });
});
