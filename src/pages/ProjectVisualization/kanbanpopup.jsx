import React, { useState } from 'react';
import { Text, Button } from '../../components';
import { useSpring, animated } from 'react-spring';

const KanbanPopup = ({ assigne, onClose, onAddTask }) => {
  const [assign, setAssign] = useState('');
  const [editedTask, setEditedTask] = useState({
    name: '',
    end_date: '',
    description: '',
    assigne: assign
  });

  const popupAnimation = useSpring({
    from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
    to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
  });

  const handleInputChange = (field, value) => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  const handleAssigneeChange = (e) => {
    const selectedAssigneeId = e.target.value;
    setAssign(selectedAssigneeId);
  };

  const handleAddTask = () => {
    const formData = {
      name: editedTask.name,
      end_date: editedTask.end_date,
      description: editedTask.description,
      assignee: assign,
    };

    // Call the onAddTask function with the updated task data
    onAddTask(formData);

    // Close the popup
    onClose();
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(5px)',
          zIndex: 1,
        }}
      ></div>

      {/* Popup */}
      <animated.div
        className="popup-container"
        style={{
          ...popupAnimation,
          zIndex: 2,
        }}
      >
        <div
          className="bg-gray-50 popup-content"
          style={{
            width: '80%',
            padding: '20px',
            borderRadius: '10px',
            position: 'relative',
            top: '5%',
            left: '100%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Text style={{ fontFamily: 'Poppins', fontSize: '16px', marginBottom: '10px' }}>
            Name: {' '}
            <input
              type="text"
              value={editedTask.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              style={{ fontSize: '16px', fontFamily: 'Poppins', border: 'none', outline: 'none', background: 'none' }}
            />
          </Text>
          <div style={{ marginBottom: '10px' }}>
            <Text style={{ fontSize: '16px', fontFamily: 'Poppins' }}>
              Due Date:{' '}
              <input
                type="date"
                value={editedTask.end_date}
                onChange={(e) => handleInputChange('end_date', e.target.value)}
                style={{ fontSize: '16px', fontFamily: 'Poppins', border: 'none', outline: 'none', background: 'none' }}
              />
            </Text>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <Text style={{ fontSize: '16px', fontFamily: 'Poppins' }}>
              Task Assignee:{' '}
              <select
                value={assign}
                onChange={handleAssigneeChange}
                style={{ fontSize: '16px', fontFamily: 'Poppins', border: 'none', outline: 'none', background: 'none' }}
              >
                <option>Select a task assignee</option>
                {assigne.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </Text>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <Text style={{ fontSize: '16px', fontFamily: 'Poppins' }}>
              Description:{' '}
              <input
                type="text"
                value={editedTask.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                style={{ fontSize: '16px', fontFamily: 'Poppins', border: 'none', outline: 'none', background: 'none' }}
              />
            </Text>
          </div>

          <div className="flex flex-row justify-end">
            <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleAddTask}>
              Add
            </Button>
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default KanbanPopup;
