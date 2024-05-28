import React from 'react';

const ChooseUserNamePage: React.FC = () => {
      const [username, setUsername] = React.useState('');

      const handleNextBtnClick = () => {
          setUsername(username);
          history.pushState(username, '', '/avatar');
      };

    return (
        <main className='min-vh-100'>
            <h1>Registrering</h1>
            <input 
                type="text" 
                placeholder='Brukernavn'
                className='position-absolute bottom-50 start-50 translate-middle m-3 userNameInput'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <div className='position-absolute bottom-0 start-50 translate-middle m-3'>
                <button className='pinButton' onClick={handleNextBtnClick}>
                    Fortsett
                </button>
            </div>
        </main>
    );
};

export default ChooseUserNamePage;