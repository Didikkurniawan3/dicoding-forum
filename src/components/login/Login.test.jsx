/**
 * test scenarios for Login component
 *
 * - Login component
 *   - should render email, password input, and login button
 *   - should show error toast if email or password is empty
 *   - should call login function with email and password
 *   - should show error toast if login fails
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './login';
import { toast } from 'react-toastify';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('Login component', () => {
  let mockLogin;

  beforeEach(() => {
    mockLogin = vi.fn();
  });

  it('should render email, password input, and login button', () => {
    render(
      <MemoryRouter>
        <Login login={mockLogin} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show error toast if email or password is empty', async () => {
    render(
      <MemoryRouter>
        <Login login={mockLogin} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Gunakan await untuk memastikan toast muncul setelah klik
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email dan password tidak boleh kosong');
    });
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('should call login function with email and password', async () => {
    render(
      <MemoryRouter>
        <Login login={mockLogin} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Pastikan login dipanggil dengan parameter yang benar
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123',
      });
    });
  });

  it('should show error toast if login fails', async () => {
    const errorMessage = 'Invalid credentials';
    mockLogin.mockRejectedValue(new Error(errorMessage));

    render(
      <MemoryRouter>
        <Login login={mockLogin} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Gunakan await untuk memastikan toast muncul setelah login gagal
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });
});
