import React from 'react';


const GameLobby: React.FC = () => {
    return (
        <div>
            <h1>waiting</h1>
            <div className='position-absolute bottom-0 start-50 translate-middle m-3'>
                <button className='pinButton' onClick={() => window.location.href = '/voting'}>Fortsett</button>
            </div>
        </div>
    );
};

export default GameLobby;