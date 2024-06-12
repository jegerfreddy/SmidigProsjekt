import { IPageHeader } from "../../Interfaces/IPageHeader.ts";
import { FC } from "react";

const PageHeader : FC<IPageHeader> = ({title, underTitle}) => {

    return (
        <div className="page-header">
            <h2 className="display-5 mt-2" >{title}</h2>
            <p className="mt-4 ml-2 text-secondary">{underTitle}</p>
        </div>
    );
};

export default PageHeader;