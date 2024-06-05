import React, { useEffect } from 'react';

const AdminServerToUserPage: React.FC = () => {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received:', data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendCommand = (command: string) => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'CHANGE_GAME_STATE', state: command }));
      ws.close();
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={() => sendCommand('START')}>Start Game</button>
      <button onClick={() => sendCommand('VOTING')}>Start Voting</button>
      <button onClick={() => sendCommand('RESULT')}>Show Results</button>
    </div>
  );
};

export default AdminServerToUserPage;