import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Text } from '../../components';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AppsIcon from '@mui/icons-material/Apps';

const Navigation = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMenuItemClick = (route) => {
    navigate(route);
  };

  let userrole=localStorage.getItem("role")

  const iconStyles = {
    color: '#FFF7F1',
    cursor: 'pointer',
    padding: '10px',
    display: 'flex',
    marginLeft: '40px',
  };

  const textStyles = {
    textAlign: 'left',
    marginRight: '60px',
  };

  const handleMouseEnter = (menuItem) => {
    setHoveredItem(menuItem);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div style={{ width: '20%', position: 'fixed', height: '100%' }}>
      <Sidebar
        style={{
          width: '100%',
          height: '100%',
          background: '#332941',
          cursor: 'pointer',
        }}
      >
        <Menu>
          <Text
            style={{
              color: '#FFF7F1',
              marginTop: '30px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
            }}
            className="font-bold text-[22px] text-center sm:text-lg md:text-xl"
          >
            ProjectFlow
          </Text>
          <MenuItem
            style={{ ...iconStyles, marginTop: '80px', transform: hoveredItem === '/dashboard' ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s ease-in-out',}}
            onMouseEnter={() => handleMouseEnter('/dashboard')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMenuItemClick('/dashboard')}
          >
            <DashboardIcon style={{ marginRight: '20px' }} />
            <div style={{ ...textStyles, marginRight: 'auto' }}>Dashboard</div>
          </MenuItem>
          <MenuItem
            style={{...iconStyles, transform: hoveredItem === '/myprojects' ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s ease-in-out', }}
            onMouseEnter={() => handleMouseEnter('/myprojects')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMenuItemClick('/myprojects')}
          >
            <AssignmentIcon style={{ marginRight: '20px'}} />
            <div style={{ ...textStyles, marginRight: 'auto' }}>Projects</div>
          </MenuItem>
          {userrole!=="Client" &&(
          <MenuItem
            style={{...iconStyles, transform: hoveredItem === '/mytasks' ? 'scale(1.1)' : 'scale(1)' , transition: 'transform 0.2s ease-in-out',}}
            onMouseEnter={() => handleMouseEnter('/mytasks')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMenuItemClick('/mytasks')}
          >
            
            <ListAltIcon style={{ marginRight: '20px'}} />
           
            <span style={{ ...textStyles, marginRight: 'auto' }}>My Tasks</span>
           
          </MenuItem>
           )}
          <MenuItem
            style={{...iconStyles,transform: hoveredItem === '/apps' ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s ease-in-out',  }}
            onMouseEnter={() => handleMouseEnter('/apps')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMenuItemClick('/apps')}
          >
            <AppsIcon style={{ marginRight: '20px' }} />
            <span style={{ ...textStyles, marginRight: 'auto' }}>Apps</span>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Navigation;
