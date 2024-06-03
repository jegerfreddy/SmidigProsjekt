import React from 'react';
import { ResultItemProps } from '../../Interfaces/IResult';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResultItem: React.FC<ResultItemProps> = ({ result }) => {
  const resultArray = Array.isArray(result) ? result : [];

  return (
    <div className='result-container d-flex align-items-end'>
      {resultArray.map((value, index) => (
        value !== 0 ? (
          <div key={index}>
            <div 
              className={`result-box option-${index + 1}`}
              style={{ height: `${value}vh` }}
              id={`option-${index + 1}`}
            ></div>
            <p className='text-center result-text'>
              {value}
            </p>
          </div>
        ) : (
          null
        )
      ))}
    </div>
  );
};

export default ResultItem;
