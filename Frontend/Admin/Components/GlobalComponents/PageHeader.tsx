import { IPageHeader } from "../Interfaces/IPageHeader";
import { FC } from "react";

const PageHeader : FC<IPageHeader> = ({title, underTitle}) => {

    return (
        <div className="page-header">
            <h1 className="display-5 mt-2" >{title}</h1>
            <p className="mt-4 ml-2 text-secondary">{underTitle}</p>
        </div>
    );
};

export default PageHeader;