import { getGameCodes } from "../Services/NodeService";
import { IGameCode } from "../Interfaces/IGameCode";
import PageHeader from "../Components/GlobalComponents/PageHeader";
import { useState } from "react";

const GetGameCodesPage = () => {

    const [amount, setAmount] = useState<number>(1);
    const [codesText, setCodesText] = useState<string>("");
    const [codeData, setCodeData] = useState<IGameCode[]>([]);

    const getCodes = (amount: number) => {

        getGameCodes(amount)
            .then((data) => {
            
                let codes: string = "";
                let count = 0;
                

                data ? setCodeData(data) : setCodeData([])

                codeData.map((obj: IGameCode) => {

                    if (count < 3) {

                        codes += obj.code + "  ";
                        count++;

                    } else {

                        count = 0;
                        codes += "\n" + obj.code + "  ";

                    };

                });
                
                setCodesText(codes);

            })
        ;
    };

    return (
        <>
            <PageHeader title="Generate Game Codes |" underTitle="Game codes are used to verify audience members when they connect to a game."/>

            <div className="d-flex flex-column align-items-center">


                <div className="d-flex flex-column">
                    <div className="p-3 d-flex flex-column">
                        <span className="d-flex flex-column ">
                            <p>Amount of codes to generate</p>
                            <input onChange={(e) => {setAmount(parseInt(e.target.value))}} type="text" />
                        </span>

                        <button className="btn btn-primary m-3" onClick={() => {getCodes(amount)}}>Fetch Codes</button>
                    </div>
                    

                    <div className="border border-dark p-3 rounded">
                        <p>{codesText}</p>
                    </div>

                </div>
                

            </div>
        </>
    );
}

export default GetGameCodesPage;