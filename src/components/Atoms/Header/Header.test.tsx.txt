import { render, screen } from '@testing-library/react';
import { Header } from './Header'; // Adjust the import path as needed
import '@testing-library/jest-dom';

describe('Header component', () => {
  test('renders children correctly', () => {
    render(<Header>Test Header</Header>);
    expect(screen.getByText('Test Header')).toBeInTheDocument();
  });

  test('applies additional props to the header element', () => {
    render(<Header className='custom-class'>Test Header</Header>);
    const headerElement = screen.getByText('Test Header').parentElement;
    expect(headerElement).toHaveClass('custom-class');
  });

  test('renders link with correct styles', () => {
    render(
      <Header>
        <a href='#'>Test Link</a>
      </Header>
    );
    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveStyle('color: white');
    linkElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    expect(linkElement).toHaveStyle('color: lime');
  });
});
