import { NodeProps, Handle, Position } from 'reactflow';
import { NodeData } from '../../Interfaces/INode';




function CustomNode({ data }: NodeProps<NodeData>) {
  const containerStyle = {
    width: data.width || 500, 
    height: data.height || 250, 
  };

  return (
    <div className="custom-node" style={containerStyle}>
      <div className="custom-node-container" style={containerStyle}>
        <div className="custom-node-title-container">
          <p className='custom-node-title'>
            {data.title}
            </p>
            </div>
        <div>Act ID: {data.actID}</div>
        <div className="custom-node-options">
          {data.options.map((option, index) => (
            option && (
              <div key={index} className={`custom-node-option custom-node-option-color-${index + 1}`}>
                <p className='custom-node-option-text'>
                  {option}
                  </p>
                <Handle
                  type="source"
                  position={Position.Bottom}
                  id={`option-${index}`}
                  className="custom-node-option-handle"
                />
              </div>
            )
          ))}
        </div>
        <Handle
          type="target"
          position={Position.Top}
          className='custom-node-target-handle'
        />
      </div>
    </div>
  );
}

export default CustomNode;
