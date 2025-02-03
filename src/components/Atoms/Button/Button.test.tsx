import { render, screen } from '@testing-library/react';

import { Button } from './Button';

const callback = vi.fn();

describe('Header component', () => {
  it('renders children correctly', () => {
    render(<Button label='Přidej komentář' onClick={() => callback(true)} />);
    expect(screen.getByText('Přidej komentář')).toBeInTheDocument();
  });

  /*   it('renders link with correct styles', () => {
    render(<Button label='Přidej komentář' onClick={() => callback(true)} />);
    const buttonElement = screen.getByText('Přidej komentář');

    // toHaveStyles always report hover style
    // expect(buttonElement).toHaveStyle('color: rgb(255, 255, 255)');
    // expect(buttonElement).toHaveStyle('border: 1px solid white');

    // buttonElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    // expect(buttonElement).toHaveStyle('border: 1px solid black');
  }); */
});
