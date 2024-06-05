import React, { useEffect, useState } from 'react';

const AdminServerToUserPage: React.FC = () => {
  const [actEventId, setActEventId] = useState('');
  const [redCount, setRedCount] = useState(0);
  const [purpleCount, setPurpleCount] = useState(0);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received:', data);

      if (data.type === 'MINIGAME_COUNT') {
        setRedCount(data.redCount);
        setPurpleCount(data.purpleCount);
      } else if (data.type === 'WINNER') {
        setWinner(data.winner);
        alert(`Winner is: ${data.winner}`);
      }
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

  const sendCommand = (command: string, actEventId: string) => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'CHANGE_GAME_STATE', state: command, actEventId }));
      ws.close();
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const handleStartMiniGame = (actEventId: string) => {
    sendCommand('MINIGAME', actEventId);
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <input
        type="text"
        placeholder="actEventId"
        value={actEventId}
        onChange={(e) => setActEventId(e.target.value)}
      />
      <button onClick={() => sendCommand('START', '')}>Start Game</button>
      <button onClick={() => sendCommand('WAITING', '')}>Waiting</button>
      <button onClick={() => sendCommand('VOTING', actEventId)}>Start Voting</button>
      <button onClick={() => sendCommand('RESULT', actEventId)}>Show Results</button>
      <button onClick={() => handleStartMiniGame(actEventId)}>MINIGAME</button>

      <h1>MiniGame Counter</h1>
      <p>Red: {redCount}</p>
      <p>Purple: {purpleCount}</p>
      <h2>Winner: {winner}</h2>
    </div>
  );
};

export default AdminServerToUserPage;
