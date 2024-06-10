import React from 'react';
import { Text, Button } from 'components';
import { useSpring, animated } from 'react-spring';

const TaskDetailsPopup = ({ task, onClose }) => {
  const popupAnimation = useSpring({
    from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
    to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
  });

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
          background: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity as needed
          backdropFilter: 'blur(5px)', // Add the blur effect
          zIndex: 1, // Set a higher zIndex than the popup container
        }}
      ></div>

      {/* Popup */}
      <animated.div
        className="popup-container"
        style={{
          ...popupAnimation,
          zIndex: 2, // Ensure the popup appears on top of the overlay
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div
          className="bg-gray-50 popup-content"
          style={{
            width: '80%',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <Text className="text-indigo-800" style={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>
            {task.name}
          </Text>
          <div style={{ marginBottom: '10px' }}>
            <Text style={{ fontSize: '16px' }}>Due Date: {task.end_date.substring(0, 10)}</Text>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Text style={{ fontSize: '16px' }}>Category: {task.userStoryDescription}</Text>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <Text style={{ fontSize: '16px' }}>Priority: {task.priority}</Text>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Text style={{ fontSize: '16px' }}>Status: {task.status}</Text>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Text style={{ fontSize: '16px' }}>Task Assignee: {task.assignee.name}</Text>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Text style={{ fontSize: '16px' }}>Subtasks: {task.subtasks && task.subtasks.length > 0 ? task.subtasks.join(', ') : 'None'}</Text>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <Text style={{ fontSize: '16px' }}>Description: {task.description}</Text>
          </div>
          <div className="flex flex-row justify-end">
            <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={onClose}>Done</Button>
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default TaskDetailsPopup;
