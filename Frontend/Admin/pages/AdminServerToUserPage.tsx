import React, { useContext, useEffect, useState } from 'react';
import { IAdminContext } from '../Interfaces/IAdminContext';
import { AdminContext } from '../Context/AdminContext';
import { useLocation } from 'react-router-dom';
import { Button, Container, Grid, Typography, Box, CircularProgress, Card, CardContent, Alert, Snackbar } from '@mui/material';
import { getMiniGameWinnerEvent, getWinner } from '../Services/NodeService';

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
      } else if (data.type === 'MINIGAME_WINNER') {
        setWinner(data.winner);
        handleMiniGameWinner(data.winner, actEventId);
        setLoading(false);
      }
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
    handleGetWinningEvent(actEventId);
  };

  const handleButtonClick = (command: string) => {
    sendCommand(command, actEventId, actId);
    if (command === 'VOTING') {
      // handle specific logic if needed
      setLoading(false);
    }
    console.log('Current event:', actEventId);
  };

  const handleGetWinningEvent = async (actEventId: string) => {
    console.log('Saving choice:', actEventId);
    try {
      const result = await getWinner(actEventId);
      console.log('Winner event ID:', result.acteventID);
      setActEventId(result.acteventID);
    } catch (error) {
      console.error('Error saving choice:', error);
      sendCommand('MINIGAME', actEventId, actId);
    }
  };

  const handleMiniGameWinner = async (winner: string, actEventId: string) => {
    let option = '';

    switch (winner) {
      case 'red':
        option = '1';
        break;
      case 'purple':
        option = '2';
        break;
      case 'blue':
        option = '3';
        break;
      case 'green':
        option = '4';
        break;
      default:
        console.error('Invalid winner color:', winner);
        return;
    }

    try {
      const result = await getMiniGameWinnerEvent(option, actEventId);
      console.log('Mini game winner event ID:', result);
       setActEventId(result.acteventID);
     } catch (error) {
      console.error('Error getting mini game winner event:', error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Admin Page
      </Typography>

      <Grid container spacing={2} mb={4}>
  <Grid item xs={12} md={4}>
    <Card variant="outlined" sx={{ backgroundColor: 'lightblue' }}>
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
    <Card variant="outlined" sx={{ backgroundColor: 'lightgreen' }}>
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
    <Card variant="outlined" sx={{ backgroundColor: 'lightcoral' }}>
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
      sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
      fullWidth
      onClick={() => handleButtonClick('START')}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} /> : 'Restart Game'}
    </Button>
  </Grid>
  <Grid item xs={6} md={4}>
    <Button
      variant="contained"
      sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
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
      sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
      fullWidth
       onClick={handleStartMiniGame}
       disabled={loading}
    >
      {loading ? <CircularProgress size={24} /> : 'MINIGAME'}
    </Button>
  </Grid>
  <Grid item xs={6} md={4}>
    <Button
      variant="contained"
      sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#fb8c00' } }}
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
      sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#fb8c00' } }}
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
      sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#fb8c00' } }}
      fullWidth
      onClick={() => handleButtonClick('FEEDBACK')}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} /> : 'Feedback'}
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
