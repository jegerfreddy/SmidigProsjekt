import React from 'react';
import VotingList from '../Components/Voting/VotingList';
import { ActEventService } from '../Services/GetService';
import { GeneralProvider } from '../Contexts/UserContext';

const VotingPage: React.FC = () => {

    const loadingPhotoStyle = {
        animation: 'loading-animation 2s infinite linear',
    };

    return (
        <main className='position-relative vh-100'>
            <div className='position-absolute top-0 start-50 translate-middle-x mt-5'>
                <img id='Loading-photo' src="images/Loading.png" alt="Loading" style={loadingPhotoStyle} />
            </div>

            <div className='position-absolute top-50 start-50 translate-middle'>
            <GeneralProvider service={ActEventService}>
                <VotingList />
            </GeneralProvider>
            </div>
        </main>
    );
};

export default VotingPage;