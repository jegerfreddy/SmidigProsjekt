import React from 'react';
import ResultList from '../Components/Result/ResultList';
import { GeneralProvider } from '../Contexts/UserContext';
import { ResultService } from '../Services/GetService';
import { useParams } from 'react-router-dom';

const ResultPage: React.FC = () => {
    const { actEventId } = useParams<{ actEventId: string }>();
    const id = actEventId ?? '';


    return (
        <main className='position-relative vh-100 bgColor'>
            <div className='position-absolute top-50 start-50 translate-middle'>
                <GeneralProvider service={ResultService}>
                    <ResultList actEventId={(id)} />
                </GeneralProvider>
            </div>
        </main>
    );
};

export default ResultPage;
