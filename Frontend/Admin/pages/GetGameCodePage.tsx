import { getGameCodes } from "../Services/NodeService";
import { IGameCode } from "../Interfaces/IGameCode";
import { useState } from "react";

const GetGameCodesPage = () => {

    const [amount, setAmount] = useState<number>(0);
    const  [codesText, setCodesText] = useState<string>("");

    const getCodes = (amount: number) => {

        getGameCodes(amount)
        .then((data) => {

            let codes: string = "";
            let count = 0;
        
        
            data.map((obj: IGameCode) => {
                if (count < 3) {

                    codes += obj.code + " ";

                } else {

                    count = 0;
                    codes += "\n" + obj.code + " ";

                };

                setCodesText(codes);
            });
        })
    };

    return (
        <>
            <div className="d-flex flex-column">

                <input onChange={(e) => {setAmount(parseInt(e.target.value))}} type="text" />
                <button className="btn btn-primary" onClick={() => {getCodes(amount)}}>Fetch Codes</button>

                <div>
                    <p>{codesText}</p>
                </div>

            </div>
        </>
    );
}

export default GetGameCodesPage;