import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import KanbanComponent from './kanban'; // Adjust import path
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  mockDndSpacing,
} from 'react-beautiful-dnd-test-utils';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: { projects: [] } }), // Adjust the response as needed
  })
);

// Initialize MockAdapter for axios
const mock = new MockAdapter(axios);

// Mock react-router-dom useNavigate and useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useParams: () => ({ projectId: '123' }),
}));

// Mock localStorage
const localStorageMock = (function () {
  let store = {
    token: 'test-token',
    role: 'Project Manager',
    userid: 'user-id'
  };

  const renderKanbanComponent = () => {
    const { container } = render(
      <Router>
        <KanbanComponent />
      </Router>
    );
    mockDndSpacing(container);
  };

  const verifyTaskOrderInColumn = (
    columnTestId,
    orderedTasks
  ) => {
    const texts = within(screen.getByTestId(columnTestId))
      .getAllByTestId('task')
      .map(x => x.textContent);
    expect(texts).toEqual(orderedTasks);
  };

  return {
    getItem: function (key) {
      return store[key];
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key) {
      delete store[key];
    },
    renderKanbanComponent, // Expose renderKanbanComponent
    verifyTaskOrderInColumn // Expose verifyTaskOrderInColumn
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('KanbanComponent', () => {
  beforeEach(() => {
    mock.reset();

    mock.onGet('http://127.0.0.1:3000/api/v1/projects/123').reply(200, {
      data: {
        project: {
          tasks: [
            { id: 'task-1', name: 'Task 1', status: 'todo' },
            { id: 'task-2', name: 'Task 2', status: 'todo' },
            { id: 'task-3', name: 'Task 3', status: 'inProgress' },
            { id: 'task-4', name: 'Task 4', status: 'completed' },
          ],
          Members: [],
        },
      },
    });

    mock.onPatch(/http:\/\/127.0.0.1:3000\/api\/v1\/tasks\/\d+/).reply(200);
  });

  it('renders without crashing', async () => {
    render(
      <Router>
        <KanbanComponent />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('TODO')).toBeInTheDocument();
      expect(screen.getByText('IN PROGRESS')).toBeInTheDocument();
      expect(screen.getByText('COMPLETED')).toBeInTheDocument();
    });
  });

});
