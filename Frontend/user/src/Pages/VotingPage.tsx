import React from 'react';
import VotingList from '../Components/Voting/VotingList';
import { ActEventService } from '../Services/GetService';
import { GeneralProvider } from '../Contexts/UserContext';
import LoadingComponent from '../Components/Header/LoadingCircle';

const VotingPage: React.FC = () => {



    return (
        <main className='position-relative vh-100'>

            <LoadingComponent/>
       
            <div className='position-absolute top-50 start-50 translate-middle'>
            <GeneralProvider service={ActEventService}>
                <VotingList />
            </GeneralProvider>
            </div>
        </main>
    );
};

export default VotingPage;