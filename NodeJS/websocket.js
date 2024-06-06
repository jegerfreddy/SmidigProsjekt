const WebSocket = require('ws');

const websocketServer = () => {
    const wss = new WebSocket.Server({ port: 3000 });

    let gameState = 'START'; // Example game state
    let actEventId = ''; // Example act event ID
    let actId = ''; // Example act ID
    let miniGameRedCount = 0;
    let miniGamePurpleCount = 0;
    let miniGameBlueCount = 0;
    let miniGameGreenCount = 0;

    wss.on('connection', ws => {
        
        console.log('Client connected');

        ws.on('message', message => {
            console.log('Received:', message);

            const data = JSON.parse(message);

            switch (data.type) {

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
                    checkForWinner();
                    break;

                default:
                    console.log('Unknown message type:', data.type);
                    break;
            }
        });

        // Send initial game state to new connections
        ws.send(JSON.stringify({ type: 'GAME_STATE', state: gameState, actEventId, actId }));
        ws.send(JSON.stringify({ type: 'MINIGAME_COUNT', redCount: miniGameRedCount, purpleCount: miniGamePurpleCount, blueCount: miniGameBlueCount, greenCount: miniGameGreenCount }));
    });

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

    const checkForWinner = () => {
        if (miniGameRedCount >= 10) {
            broadcastWinner('red');
            resetGame();
        } else if (miniGamePurpleCount >= 10) {
            broadcastWinner('purple');
            resetGame();
        } else if (miniGameBlueCount >= 10) {
            broadcastWinner('blue');
            resetGame();
        } else if (miniGameGreenCount >= 10) {
            broadcastWinner('green');
            resetGame();
        }
    };

    const broadcastWinner = (winner) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'WINNER', winner }));
            }
        });
    };

    const resetGame = () => {
        miniGameRedCount = 0;
        miniGamePurpleCount = 0;
        miniGameBlueCount = 0;
        miniGameGreenCount = 0;
        broadcastMiniGameCount(miniGameRedCount, miniGamePurpleCount, miniGameBlueCount, miniGameGreenCount);
    };

    console.log('WebSocket server running on ws://localhost:3000');
};

module.exports = websocketServer;
