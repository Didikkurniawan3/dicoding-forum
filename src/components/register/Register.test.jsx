/**
 * test scenarios for Register component
 *
 * - Register component
 *   - should render name, email, password inputs and register button
 *   - should update state when inputs change
 *   - should call register function with name, email, and password when register button is clicked
 *   - should have a link to the login page
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';  // Untuk memastikan Link bekerja dalam pengujian
import Register from './register';

describe('Register component', () => {
  let mockRegister;

  beforeEach(() => {
    mockRegister = vi.fn();
  });

  it('should render name, email, password inputs and register button', () => {
    render(
      <MemoryRouter>
        <Register register={mockRegister} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('should update state when inputs change', () => {
    render(
      <MemoryRouter>
        <Register register={mockRegister} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });

    expect(screen.getByPlaceholderText(/name/i).value).toBe('John Doe');
    expect(screen.getByPlaceholderText(/email/i).value).toBe('johndoe@example.com');
    expect(screen.getByPlaceholderText(/password/i).value).toBe('password123');
  });

  it('should call register function with name, email, and password when register button is clicked', () => {
    render(
      <MemoryRouter>
        <Register register={mockRegister} />
      </MemoryRouter>
    );

    // Mengisi input
    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });

    // Mengklik tombol register
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Mengecek bahwa mockRegister dipanggil dengan data yang benar
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });
  });

  it('should have a link to the login page', () => {
    render(
      <MemoryRouter>
        <Register register={mockRegister} />
      </MemoryRouter>
    );

    // Mengecek apakah link login ada dan benar
    expect(screen.getByText(/login/i).closest('a')).toHaveAttribute('href', '/login');
  });
});
