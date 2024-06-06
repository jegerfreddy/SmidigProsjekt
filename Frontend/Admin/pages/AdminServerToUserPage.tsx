import React, { useContext, useEffect, useState } from 'react';
import { IAdminContext } from '../Interfaces/IAdminContext';
import { AdminContext } from '../Context/AdminContext';
import { useLocation } from 'react-router-dom';
import { Button, Container, Grid, Typography, Box, CircularProgress, Snackbar, Alert, Card, CardContent } from '@mui/material';

const AdminServerToUserPage: React.FC = () => {
  const location = useLocation();
  const actID = location.state;
  const actId = actID.toString();

  const [actEventId, setActEventId] = useState('1');
  const [setActId] = useState('');
  const [actTitle, setActTitle] = useState('');
  const [redCount, setRedCount] = useState(0);
  const [purpleCount, setPurpleCount] = useState(0);
  const [blueCount, setBlueCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [winner, setWinner] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [loading, setLoading] = useState(false);

  const { events, acts } = useContext(AdminContext) as IAdminContext;

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:3000');

    websocket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    websocket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received:', data);

      if (data.type === 'MINIGAME_COUNT') {
        setRedCount(data.redCount);
        setPurpleCount(data.purpleCount);
        setBlueCount(data.blueCount);
        setGreenCount(data.greenCount);
      } else if (data.type === 'WINNER') {
        setWinner(data.winner);
      }
      setLoading(false);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setLoading(false);
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  useEffect(() => {
    const act = acts.find(a => a.actID === Number(actId));
    if (act) {
      setActTitle(act.actName);
    }
  }, [actId, acts]);

  const sendCommand = (command: string, actEventId: string, actId: string) => {
    if (ws) {
      setLoading(true);
      ws.send(JSON.stringify({ type: 'CHANGE_GAME_STATE', state: command, actEventId, actId }));
    } else {
      console.error('WebSocket connection is not open');
    }
  };

  const handleStartMiniGame = () => {
    sendCommand('MINIGAME', actEventId, actId);
  };

  const [sortedEventIDs, setSortedEventIDs] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const actEvents = events.filter((event) => event.actID === Number(actId));
    actEvents.sort((a, b) => a.eventIndex - b.eventIndex);
    setSortedEventIDs(actEvents.map(event => event.acteventID));
    setCurrentIndex(0);
    console.log('Event:', actEvents);
  }, [actId, events]);

  const handleButtonClick = (command: string) => {
    if (sortedEventIDs.length > 0) {
      const eventId = sortedEventIDs[currentIndex].toString();
      sendCommand(command, eventId, actId);
      setActEventId(eventId);
      if (command === 'VOTING') {
        setCurrentIndex(currentIndex + 1);
      }
      console.log('Current index:', currentIndex);
      console.log('Current event:', eventId);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Admin Page
      </Typography>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Act ID:
              </Typography>
              <Typography variant="h4" component="div">
                {actId}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Act Title:
              </Typography>
              <Typography variant="h4" component="div">
                {actTitle}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Act Event ID:
              </Typography>
              <Typography variant="h4" component="div">
                {actEventId}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={6} md={4}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={() => handleButtonClick('START')} 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Start Game'}
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={() => handleButtonClick('VOTING')} 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Start Voting'}
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={() => handleButtonClick('FEEDBACK')} 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Feedback'}
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={() => handleButtonClick('PAUSE')} 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Pause'}
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={() => handleButtonClick('STANDBY')} 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'StandBy'}
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleStartMiniGame} 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'MINIGAME'}
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        MiniGame Counter
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Box textAlign="center" p={2} bgcolor="#f44336" color="white" borderRadius={4}>
            <Typography variant="h6">Red</Typography>
            <Typography variant="h4">{redCount}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box textAlign="center" p={2} bgcolor="#9c27b0" color="white" borderRadius={4}>
            <Typography variant="h6">Purple</Typography>
            <Typography variant="h4">{purpleCount}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box textAlign="center" p={2} bgcolor="#2196f3" color="white" borderRadius={4}>
            <Typography variant="h6">Blue</Typography>
            <Typography variant="h4">{blueCount}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box textAlign="center" p={2} bgcolor="#4caf50" color="white" borderRadius={4}>
            <Typography variant="h6">Green</Typography>
            <Typography variant="h4">{greenCount}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom style={{ marginTop: '2rem' }}>
        Winner: {winner}
      </Typography>
      <Snackbar open={loading} autoHideDuration={6000} onClose={() => setLoading(false)}>
        <Alert onClose={() => setLoading(false)} severity="info">
          Processing your request...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminServerToUserPage;
