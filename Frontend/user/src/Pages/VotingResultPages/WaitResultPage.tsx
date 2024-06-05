import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GeneralContext } from '../../Contexts/UserContext';
import { IGeneralContext } from '../../Interfaces/IContext';
import { WinnerItemProps } from '../../Interfaces/IWinner';
import { WinnerService } from '../../Services/GetService';

const WaitResultPage: React.FC = () => {
    const { actEventId } = useParams<{ actEventId: string }>();
    const { getById } = useContext(GeneralContext) as IGeneralContext<WinnerItemProps>;
    const [result, setResult] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const fetchedResult = await WinnerService.getById(Number(actEventId)); // Convert actEventId to number

                if (fetchedResult) {
                    setResult(fetchedResult);
                    console.log("Result fetched:", fetchedResult);
                } else {
                    console.error("Result not found.");
                    setError("Result not found.");
                }
            } catch (e) {
                console.error("Error fetching result:", e);
                setError("Error fetching result.");
            }
        };

        fetchEvent();
    }, [getById, actEventId]);

    useEffect(() => {
        if (result) {
            const winnersCount = result.length;
            if (winnersCount === 1) {
                 navigate(`/tie/${actEventId}`);
             } else if (winnersCount >= 2) {
                 navigate(`/result/${actEventId}`);
             }
        }
    }, [result, navigate, actEventId]);

    if (error) {
        return (
            <main className='position-relative vh-100 bgColor'>
                <div className='position-absolute top-50 start-50 translate-middle'>
                    <p>{error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className='position-relative vh-100 bgColor'>
            <div className='position-absolute top-50 start-50 translate-middle'>
                <p>Venter på resultat...</p>
            </div>
        </main>
    );
};

export default WaitResultPage;
