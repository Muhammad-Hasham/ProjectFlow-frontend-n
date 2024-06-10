import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import SignupPage from './index'; 
jest.mock('axios');

const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

test('allows user to type into input fields', () => {
  renderWithRouter(<SignupPage />);

  const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const nameInput = screen.getByTestId("name")
    const confirmInput = screen.getByTestId("confirm-password")
  
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmInput, {target: {value: 'password'}})
  
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password');
    expect(confirmInput.value).toBe('password');
});

test('successful signup redirects to the correct page', async () => {
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

  renderWithRouter(<SignupPage />);
  fireEvent.change(screen.getByTestId('name'), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
  fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'password' } });
  fireEvent.click(screen.getByRole('button', { name: /next/i }));

  expect(window.location.pathname).toBe('/signuprole');

});
