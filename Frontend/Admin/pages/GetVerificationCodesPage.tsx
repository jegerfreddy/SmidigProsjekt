import { getGameCodes } from "../Services/NodeService";
import { IGameCode } from "../Interfaces/IGameCode";
import PageHeader from "../Components/GlobalComponents/PageHeader";
import { useEffect, useState } from "react";

const GetVerificationCodesPage = () => {

    const [amount, setAmount] = useState<number>(1);
    const [codesText, setCodesText] = useState<string>();
    const [codeData, setCodeData] = useState<IGameCode[]>([]);

    const getCodes = (amount: number) => {

        setCodesText("");
        

        getGameCodes(amount)
            .then((data) => {
            
                data ? setCodeData(data) : setCodeData([])

            })
        ;
    };

    // This use effect trigger
    useEffect(() => {

        if (codeData.length > 0) {

            codeData.map((obj: IGameCode) => {

                setCodesText( prevText =>  prevText + obj.code + " ");
    
            });

        };

    }, [codeData]);

    return (
        <>
            <div className="min-height-100">
                <PageHeader title="Verification Codes |" underTitle="Verification codes are used to verify audience members when they connect to a game."/>

                <div className="verify-codes-content">

                    <div className="d-flex flex-column align-items-center">
                        <div className="p-3 d-flex flex-column align-items-center">
                            <span className="d-flex flex-column align-items-center">
                                <h3 className="display-4">Choose amount of codes to generate</h3>
                                <p><i>default amount is 1 code.</i></p>
                                <input onChange={(e) => {setAmount(parseInt(e.target.value))}} type="text" />
                            </span>

                            <button className="btn btn-primary mt-5  w-50" onClick={() => {getCodes(amount)}}>Fetch Codes</button>
                        </div>
                        

                        <div className="border border-dark rounded codes-container">
                            <p>{codeData.length > 0 ? codesText : "Codes are pasted here..."}</p>
                        </div>

                    </div>
                
                </div>
            </div>
        </>
    );
}

export default GetVerificationCodesPage;