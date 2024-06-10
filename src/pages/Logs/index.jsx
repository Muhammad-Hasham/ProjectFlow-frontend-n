import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Divider, Button, TextField, MenuItem, Collapse } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const theme = createTheme({
  spacing: 2,
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
  },
});

const LogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userIdFilter, setUserIdFilter] = useState('');
  const [typeofRequestFilter, setTypeofRequestFilter] = useState('');
  const [expandedLogId, setExpandedLogId] = useState('');
  const [allUsers, setAllUsers] = useState([]); // State to hold all users data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        let token = localStorage.getItem('token');
        const response = await axios.get(`https://projectflow-cgjn.onrender.com/api/v1/logs?page=${currentPage}&userId=${userIdFilter}&typeofRequest=${typeofRequestFilter}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.data && response.data.data && Array.isArray(response.data.data.logs)) {
          setLogs(response.data.data.logs);
          setTotalPages(response.data.totalPages);
        } else {
          console.error('Invalid response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, [currentPage, userIdFilter, typeofRequestFilter]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        let token = localStorage.getItem('token');
        const response = await axios.get('https://projectflow-cgjn.onrender.com/api/v1/logs/names', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.data && Array.isArray(response.data.users)) {
          setAllUsers(response.data.users);
        } else {
          console.error('Invalid response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleLogout = async () => {
    try {
      let token = localStorage.getItem('token');
      const response = await fetch("https://projectflow-cgjn.onrender.com/api/v1/users/logout", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('photo');
        navigate("/signin");
      } else {
        console.error("Error logging out:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === 'userId') {
      setUserIdFilter(value);
    } else if (name === 'typeofRequest') {
      setTypeofRequestFilter(value);
    }
    // Apply filtering when the filter changes
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const toggleExpand = (logId) => {
    setExpandedLogId(expandedLogId === logId ? '' : logId);
  };

  const getUserIdFromUsername = (username) => {
    const user = allUsers.find(user => user.name === username);
    return user ? user.id : '';
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            ProjectFlow Logs
          </Typography>
          <Button color="primary" variant="outlined" onClick={handleLogout}>Logout</Button>
        </Box>
        <Divider />
        {/* Filters */}
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <TextField
            name="userId"
            select
            label="User"
            value={userIdFilter}
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ minWidth: 150 }} // Adjust width as needed
          >
            <MenuItem value="">All</MenuItem>
            {allUsers.map(user => (
              <MenuItem key={user.id} value={getUserIdFromUsername(user.name)}>
              {user.name}
            </MenuItem>
            ))}
          </TextField>
          <TextField
            name="typeofRequest"
            select
            label="Type of Request"
            value={typeofRequestFilter}
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ minWidth: 150 }} // Adjust width as needed
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="create">Create</MenuItem>
            <MenuItem value="update">Update</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
          </TextField>
        </Box>
        {/* Logs */}
        {logs.map((log, index) => (
          <Paper key={log._id} elevation={3} style={{ backgroundColor: index % 2 === 0 ? '#f3f3f3' : '#e0e0e0', padding: '16px', margin: '16px 0', borderRadius: '8px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              {/* Apply color based on log type */}
              <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: log.typeofRequest === 'delete' ? theme.palette.error.main : (log.typeofRequest === 'update' ? theme.palette.primary.main : theme.palette.success.main) }}>{log.typeofRequest}</Typography>
              {expandedLogId === log._id ? (
                <Button onClick={() => toggleExpand(log._id)} color="primary" endIcon={<ExpandLessIcon />}>Collapse</Button>
              ) : (
                <Button onClick={() => toggleExpand(log._id)} color="primary" endIcon={<ExpandMoreIcon />}>Expand</Button>
              )}
            </Box>
            <Collapse in={expandedLogId === log._id} timeout="auto" unmountOnExit>
              {/* Log Details */}
              <Box maxHeight={200} overflow="auto">
              <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Log Details:</Typography>

              {log.prevData && (
                <Typography variant="body1" gutterBottom><strong>Previous Data:</strong> {log.prevData ? JSON.stringify(log.prevData) : '-'}</Typography>
              )}

              {log.newData && (
                <Typography variant="body1" gutterBottom><strong>New Data:</strong> {log.newData ? JSON.stringify(log.newData) : '-'}</Typography>
              )}

              {log.updatedBy && (
                <Typography variant="body1" gutterBottom><strong>Updated By:</strong> {log.updatedBy ? log.updatedBy : '-'}</Typography>
              )}

              {log.taskId && (
                <Typography variant="body1" gutterBottom><strong>Task ID:</strong> {log.taskId ? log.taskId : '-'}</Typography>
              )}

              {log.projectId && (
                <Typography variant="body1" gutterBottom><strong>Project ID:</strong> {log.projectId ? log.projectId : '-'}</Typography>
              )}

              {log.typeofRequest === "create" && (
                <Typography variant="body1" gutterBottom><strong>Created At:</strong> {log.createdAt ? new Date(log.createdAt).toLocaleString() : '-'}</Typography>
              )}

              {log.typeofRequest === "update" && (
                <Typography variant="body1" gutterBottom><strong>Updated At:</strong> {log.updatedAt ? new Date(log.updatedAt).toLocaleString() : '-'}</Typography>
              )}
              </Box>
            </Collapse>
          </Paper>
        ))}
        {/* Pagination */}
        <Box mt={4} display="flex" justifyContent="center" alignItems="center">
        <Button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          variant="outlined"
          color="primary"
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ mx: 2 }}>
          Page {currentPage} out of {totalPages}
        </Typography>
        <Button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          variant="outlined"
          color="primary"
        >
          Next
        </Button>
      </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LogsTable;
