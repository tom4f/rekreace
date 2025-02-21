import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { CustomNavLink } from './CustomNavLink';

describe('CustomNavLink', () => {
  it('renders the link with correct text', () => {
    render(
      <MemoryRouter>
        <CustomNavLink to='/home' header='Home' />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('applies active class when the link is active', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route
            path='/home'
            element={<CustomNavLink to='/home' header='Home' />}
          />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByText('Home');
    expect(link).toHaveClass('bg-black');
  });

  it('does not apply active class when the link is inactive', () => {
    render(
      <MemoryRouter initialEntries={['/home', '/other']} initialIndex={1}>
        <Routes>
          <Route
            path='/other'
            element={<CustomNavLink to='/home' header='Home' />}
          />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByText('Home');
    expect(link).not.toHaveClass('bg-black');
  });

  it('uses custom active class when provided', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route
            path='/home'
            element={
              <CustomNavLink
                to='/home'
                header='Home'
                activeClassName='bg-gray-500 text-white'
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByText('Home');
    expect(link).toHaveClass('bg-gray-500 text-white');
  });
});
