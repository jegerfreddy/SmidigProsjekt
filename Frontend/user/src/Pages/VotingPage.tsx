import React from 'react';
import VotingList from '../Components/Voting/VotingList';
import { ActEventService } from '../Services/GetService';
import { GeneralProvider } from '../Contexts/UserContext';
import LoadingComponent from '../Components/Header/LoadingCircle';
import PhoneInfo from '../Components/Phone/PhoneInfo';

const VotingPage: React.FC = () => {

    const { orientation } = PhoneInfo();
    
    return (
        <main className={`position-relative vh-100 ${orientation === 'vertical' ? 'bgColor vertical-layout' : 'horizontalbg1 bgVectors horizontal-layout'}`}>
            <section>
                {orientation === 'vertical' && <LoadingComponent/>}
            </section>
       
            <section className='position-absolute top-50 start-50 translate-middle'>
                <GeneralProvider service={ActEventService}>
                    <VotingList />
                </GeneralProvider>
            </section>
        </main>
    );
};

export default VotingPage;