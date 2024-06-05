const WebSocket = require('ws');

const websocketServer = () => {
    const wss = new WebSocket.Server({ port: 3000 });

    let gameState = 'START'; // Example game state
    let actEventId = ''; // Example act event ID
    let miniGameRedCount = 0;
    let miniGamePurpleCount = 0;

    wss.on('connection', ws => {
        console.log('Client connected');

        ws.on('message', message => {
            console.log('Received:', message);

            const data = JSON.parse(message);

            switch (data.type) {
                case 'CHANGE_GAME_STATE':
                    gameState = data.state;
                    actEventId = data.actEventId;
                    broadcastGameState(gameState, actEventId);
                    break;
                case 'INCREMENT_MINIGAME_COUNTER':
                    if (data.color === 'red') {
                        miniGameRedCount++;
                    } else if (data.color === 'purple') {
                        miniGamePurpleCount++;
                    }
                    broadcastMiniGameCount(miniGameRedCount, miniGamePurpleCount);
                    checkForWinner();
                    break;
                default:
                    console.log('Unknown message type:', data.type);
            }
        });

        // Send initial game state to new connections
        ws.send(JSON.stringify({ type: 'GAME_STATE', state: gameState, actEventId }));
        ws.send(JSON.stringify({ type: 'MINIGAME_COUNT', redCount: miniGameRedCount, purpleCount: miniGamePurpleCount }));
    });

    const broadcastGameState = (state, actEventId) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'GAME_STATE', state, actEventId }));
            }
        });
    };

    const broadcastMiniGameCount = (redCount, purpleCount) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'MINIGAME_COUNT', redCount, purpleCount }));
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
        broadcastMiniGameCount(miniGameRedCount, miniGamePurpleCount);
    };

    console.log('WebSocket server running on ws://localhost:3000');
};

module.exports = websocketServer;
