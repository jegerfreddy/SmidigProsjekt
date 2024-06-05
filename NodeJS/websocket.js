const WebSocket = require('ws');

const websocketServer = () => {
    const wss = new WebSocket.Server({ port: 3000 });

    let gameState = 'START'; // Example game state

    wss.on('connection', ws => {
        console.log('Client connected');

        ws.on('message', message => {
            console.log('Received:', message);

            const data = JSON.parse(message);

            switch (data.type) {
                case 'CHANGE_GAME_STATE':
                    gameState = data.state;
                    broadcastGameState(gameState);
                    break;
                default:
                    console.log('Unknown message type:', data.type);
            }
        });

        // Send initial game state to new connections
        ws.send(JSON.stringify({ type: 'GAME_STATE', state: gameState }));
    });

    const broadcastGameState = (state) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'GAME_STATE', state }));
            }
        });
    };

    console.log('WebSocket server running on ws://localhost:3000');
};

module.exports = websocketServer;
