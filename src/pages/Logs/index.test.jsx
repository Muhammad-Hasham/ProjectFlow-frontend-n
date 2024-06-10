import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogsTable from './index';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useNavigate } from "react-router-dom";

const mock = new MockAdapter(axios);
// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

// Mock API responses
beforeEach(() => {
  mock.onGet('http://127.0.0.1:3000/api/v1/logs?page=1&userId=&typeofRequest=')
    .reply(200, {
      data: {
        logs: [
          {
            _id: '1',
            typeofRequest: 'create',
            prevData: null,
            newData: { name: 'Test Project' },
            updatedBy: 'user1',
            taskId: 'task1',
            projectId: 'project1',
            createdAt: '2023-06-08T12:00:00Z',
          },
        ],
        totalPages: 1,
      },
    });

  mock.onGet('http://127.0.0.1:3000/api/v1/logs/names')
    .reply(200, {
      users: [
        { id: 'user1', name: 'User One' },
        { id: 'user2', name: 'User Two' },
      ],
    });
});

// Clean up after each test
afterEach(() => {
  mock.reset();
});

describe('LogsTable Component', () => {
  test('renders logs table and filters', async () => {
    render(
      <Router>
        <LogsTable />
      </Router>
    );

    // Check if the main heading is rendered
    expect(screen.getByText(/ProjectFlow Logs/i)).toBeInTheDocument();

    // Check if the filters are rendered
    expect(screen.getByLabelText(/User/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type of Request/i)).toBeInTheDocument();

    // Wait for logs to be fetched and displayed
    await waitFor(() => expect(screen.getByText(/create/i)).toBeInTheDocument());
  });

  test('toggles log details on expand/collapse button click', async () => {
    render(
      <Router>
        <LogsTable />
      </Router>
    );

    // Wait for logs to be fetched and displayed
    await waitFor(() => screen.getByText(/create/i));

    // Expand log details
    fireEvent.click(screen.getByText(/Expand/i));
    await waitFor(() => expect(screen.getByText(/Log Details:/i)).toBeInTheDocument());

    // Collapse log details
    fireEvent.click(screen.getByText(/Collapse/i));
    await waitFor(() => expect(screen.queryByText(/Log Details:/i)).not.toBeInTheDocument());
  });
});
