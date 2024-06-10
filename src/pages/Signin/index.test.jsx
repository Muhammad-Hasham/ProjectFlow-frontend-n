// src/pages/SigninPage/index.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SigninPage from './index';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: Router });
};


describe('SigninPage', () => {
  test('renders email and password input fields and sign in button', () => {
    renderWithRouter(<SigninPage />);

    expect(screen.getByText(/email address/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('allows user to type into input fields', () => {
    renderWithRouter(<SigninPage />);
  
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
  
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password');
  });

  test('successful login redirects to the correct page', async () => {
    axios.post.mockResolvedValue({
      data: {
        token: 'fake-token',
        data: {
          user: {
            _id: 'user-id',
            name: 'John Doe',
            email: 'john.doe@example.com',
            photo: 'photo-url',
            role: 'user'
          }
        }
      }
    });
  
    renderWithRouter(<SigninPage />);
  
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  
    expect(window.location.pathname).toBe('/');
  });

  test('displays error message on login failure', async () => {
    axios.post.mockRejectedValue(new Error('Login failed'));
  
    renderWithRouter(<SigninPage />);
  
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Login failed', expect.any(Error));
    });
  });
});
