import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input component', () => {
  it('renders label correctly', () => {
    render(<Input label='Test Label' id='test-input' />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('passes props to input element', () => {
    render(
      <Input label='Test Label' id='test-input' placeholder='Enter text' />
    );
    const inputElement = screen.getByLabelText('Test Label');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter text');
  });

  it('renders input with correct type', () => {
    render(<Input label='Test Label' id='test-input' type='password' />);
    const inputElement = screen.getByLabelText('Test Label');
    expect(inputElement).toHaveAttribute('type', 'password');
  });
});
