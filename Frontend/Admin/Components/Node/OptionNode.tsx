import React from 'react';

interface Option {
  id: number;
  text: string;
}

interface OptionNodeProps {
  option: Option;
}

const OptionNode: React.FC<OptionNodeProps> = ({ option }) => {
  return (
    <div className={`option-node event${option.id}`}>
      <p>{option.text}</p>
    </div>
  );
};

export default OptionNode;
