const WebSocket = require('ws');
const axios = require('axios');

const websocketServer = () => {
    const wss = new WebSocket.Server({ port: 3000 });

    let gameState = 'START'; // Example game state
    let actEventId = ''; // Example act event ID
    let actId = ''; // Example act ID
    let miniGameRedCount = 0;
    let miniGamePurpleCount = 0;
    let miniGameBlueCount = 0;
    let miniGameGreenCount = 0;

    const voteCounts = { option1: 0, option2: 0, option3: 0, option4: 0 };

    const broadcastUserCount = () => {
        const userCount = wss.clients.size;
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'USER_COUNT', userCount }));
            }
        });
    };

    wss.on('connection', ws => {
        console.log('Client connected');
        broadcastUserCount();

        ws.on('message', message => {
            console.log('Received:', message);

            const data = JSON.parse(message);

            switch (data.type) {
                case "SETUP":
                    setup({ type: "SETUP", actData: data.actData });
                    break;
                case 'CHANGE_GAME_STATE':
                    gameState = data.state;
                    actEventId = data.actEventId;
                    actId = data.actId;
                    broadcastGameState(gameState, actEventId, actId);
                    break;
                case 'INCREMENT_MINIGAME_COUNTER':
                    if (data.color === 'red') {
                        miniGameRedCount++;
                    } else if (data.color === 'purple') {
                        miniGamePurpleCount++;
                    } else if (data.color === 'blue') {
                        miniGameBlueCount++;
                    } else if (data.color === 'green') {
                        miniGameGreenCount++;
                    }

                    broadcastMiniGameCount(miniGameRedCount, miniGamePurpleCount, miniGameBlueCount, miniGameGreenCount);
                    checkForMiniGameWinner();
                    break;
                case 'VOTE':
                    if (voteCounts.hasOwnProperty(`option${data.option}`)) {
                        voteCounts[`option${data.option}`]++;
                        broadcastVoteCounts();
                        saveVote(data);
                        console.log('Vote from socket:', data);
                    }
                    break;
                case 'USER_CONNECTED':
                    broadcastUserCount();
                    break;
                default:
                    console.log('Unknown message type:', data.type);
                    break;
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
            broadcastUserCount();
        });

        // Send initial game state and counts to new connections
        ws.send(JSON.stringify({ type: 'GAME_STATE', state: gameState, actEventId, actId }));
        ws.send(JSON.stringify({ type: 'MINIGAME_COUNT', redCount: miniGameRedCount, purpleCount: miniGamePurpleCount, blueCount: miniGameBlueCount, greenCount: miniGameGreenCount }));
        ws.send(JSON.stringify({ type: 'VOTE_COUNTS', counts: voteCounts }));
        ws.send(JSON.stringify({ type: 'USER_COUNT', userCount: wss.clients.size }));
    });

    const setup = (data) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    };

    const broadcastGameState = (state, actEventId, actId) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'GAME_STATE', state, actEventId, actId }));
            }
        });
    };

    const broadcastMiniGameCount = (redCount, purpleCount, blueCount, greenCount) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'MINIGAME_COUNT', redCount, purpleCount, blueCount, greenCount }));
            }
        });
    };

    const broadcastVoteCounts = () => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'VOTE_COUNTS', counts: voteCounts }));
            }
        });
    };

    const checkForMiniGameWinner = () => {
        if (miniGameRedCount >= 100) {
            broadcastMiniGameWinner('red');
            resetMiniGame();
        } else if (miniGamePurpleCount >= 100) {
            broadcastMiniGameWinner('purple');
            resetMiniGame();
        } else if (miniGameBlueCount >= 100) {
            broadcastMiniGameWinner('blue');
            resetMiniGame();
        } else if (miniGameGreenCount >= 100) {
            broadcastMiniGameWinner('green');
            resetMiniGame();
        }
    };

    const broadcastMiniGameWinner = (winner) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'MINIGAME_WINNER', winner }));
            }
        });
    };

    const resetMiniGame = () => {
        miniGameRedCount = 0;
        miniGamePurpleCount = 0;
        miniGameBlueCount = 0;
        miniGameGreenCount = 0;
        broadcastMiniGameCount(miniGameRedCount, miniGamePurpleCount, miniGameBlueCount, miniGameGreenCount);
    };

    const saveVote = async (voteData) => {
        const newVote = {
            act: { actID: voteData.actId },
            actEvent: { acteventID: voteData.actEventId, act: { actID: voteData.actId } },
            user: { userID: voteData.userId },
            option: voteData.option
        };
        console.log('Saving new vote:', newVote);

        try {
            const result = await axios.post('http://localhost:4000/api/vote/new', newVote);
            console.log('New vote saved:', result.data);
        } catch (error) {
            console.error('Error occurred while saving vote:', error);
        }
    };

    console.log('WebSocket server running on ws://localhost:3000');
};

module.exports = websocketServer;
