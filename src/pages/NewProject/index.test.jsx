import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NewProjectPage from './index';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

const props = {
  children: 'Project Created Successfully!', // Assuming your animated div directly renders text content
  enabled: true, // Assuming you want to test the animation when it's enabled
};

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: { success: true } })),
  }));

  // Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
  
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: Router });
};

test('renders project name and description input fields and buttons', () => {
    renderWithRouter(<NewProjectPage />);

    expect(screen.getByText(/project name/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/start date/i)).toBeInTheDocument()
    expect(screen.getByText(/due date/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /invite/i })).toBeInTheDocument();
  });

  test('displays error message when required fields are missing', async () => {
    renderWithRouter(<NewProjectPage />);

    fireEvent.click(screen.getByText(/create/i));

    await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith('Please fill out all required fields.');
    });
});
