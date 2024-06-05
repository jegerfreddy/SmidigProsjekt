import React, { act } from 'react';
import LoadingComponent from '../../Components/Header/LoadingCircle';
import PhoneInfo from '../../Components/Phone/PhoneInfo';
import VotingList from '../../Components/Voting/VotingList';
import { GeneralProvider } from '../../Contexts/UserContext';
import { ActEventService } from '../../Services/GetService';
import { useParams } from 'react-router-dom';


const VotingPage: React.FC = () => {
    const { actEventId } = useParams<{ actEventId: string }>();

    const { orientation } = PhoneInfo();
    
    return (
        <main className={`position-relative vh-100 ${orientation === 'vertical' ? 'bgColor vertical-layout' : 'horizontalbg1 bgVectors horizontal-layout'}`}>
            <section>
                {orientation === 'vertical' && <LoadingComponent/>}
            </section>
       
            <section className='position-absolute top-50 start-50 translate-middle'>
                <GeneralProvider service={ActEventService}>
                    <VotingList actEventId={Number(actEventId)}/>
                </GeneralProvider>
            </section>
        </main>
    );
};

export default VotingPage;