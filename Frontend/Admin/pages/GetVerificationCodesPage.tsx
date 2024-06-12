import { getGameCodes } from "../Services/NodeService";
import { IGameCode } from "../Interfaces/IGameCode";
import PageHeader from "../Components/GlobalComponents/PageHeader";
import { useEffect, useState } from "react";

const GetVerificationCodesPage = () => {

    const [amount, setAmount] = useState<number>(1);
    const [codesText, setCodesText] = useState<string>("");
    const [codeData, setCodeData] = useState<IGameCode[]>([]);
    const [counter, setCounter] = useState<number>(0);

    const getCodes = (amount: number) => {

        getGameCodes(amount)
            .then((data) => {
            
                data ? setCodeData(data) : setCodeData([])

            })
        ;
    };

    useEffect(() => {

        codeData.map((obj: IGameCode) => {

            if (counter < 3) {

                setCodesText(prev => prev + obj.code + " ");
                setCounter(prev => prev + 1);

            } else {

                setCounter(0);
                setCodesText(prev => prev + "\n" + obj.code + " ");

            };
        });
    }, [codeData])

    return (
        <>
            <PageHeader title="Verification Codes |" underTitle="Verification codes are used to verify audience members when they connect to a game."/>

            <div className="d-flex flex-column align-items-center">


                <div className="d-flex flex-column align-items-center">
                    <div className="p-3 d-flex flex-column">
                        <span className="d-flex flex-column ">
                            <p>Amount of codes to generate</p>
                            <input onChange={(e) => {setAmount(parseInt(e.target.value))}} type="text" />
                        </span>

                        <button className="btn btn-primary m-3" onClick={() => {getCodes(amount)}}>Fetch Codes</button>
                    </div>
                    

                    <div className="border border-dark p-3 rounded w-25">
                        <p>{codesText}</p>
                    </div>

                </div>
                

            </div>
        </>
    );
}

export default GetVerificationCodesPage;