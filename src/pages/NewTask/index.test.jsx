// Mock the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: { projects: [] } }), // Adjust the response as needed
    })
  );

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewTaskPage from './index';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock axios post
jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: { success: true } })),
  }));

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
  };


test('renders task name and description input fields and buttons', () => {
  renderWithRouter(<NewTaskPage />);

  expect(screen.getByText(/Task Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Task Description/i)).toBeInTheDocument();
  expect(screen.getByText(/Task Assignee/i)).toBeInTheDocument();
  expect(screen.getByText(/Priority/i)).toBeInTheDocument();
  expect(screen.getByText(/Pre Dependency/i)).toBeInTheDocument();
  expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
  expect(screen.getByText(/Due Date/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Create/i })).toBeInTheDocument();
});

it('successful task creation redirects to the correct page', async () => {
    const { getByTestId } = renderWithRouter(<NewTaskPage />);

    fireEvent.change(getByTestId('task-name'), { target: { value: 'Test Task' } });
    fireEvent.change(getByTestId('description'), { target: { value: 'Test Description' } });

    
    fireEvent.click(getByTestId('create-button'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(window.location.pathname).toBe('/mytasks');
    })
})