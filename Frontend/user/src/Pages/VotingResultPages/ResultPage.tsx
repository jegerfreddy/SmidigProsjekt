import { useParams } from "react-router-dom";
import { GeneralProvider } from "../../Contexts/UserContext";
import { ResultService } from "../../Services/GetService";
import ResultList from "../../Components/Result/ResultList";


const ResultPage: React.FC = () => {
    const { actEventId } = useParams<{ actEventId: string }>();
    const id = actEventId ?? '';

    console.log('actEventId:', id);


    return (
        <main className='position-relative userPage bgColor'>
            <div className='position-absolute top-50 start-50 translate-middle'>
                <GeneralProvider service={ResultService}>
                    <ResultList actEventId={(id)} />
                </GeneralProvider>
            </div>
        </main>
    );
};

export default ResultPage;
