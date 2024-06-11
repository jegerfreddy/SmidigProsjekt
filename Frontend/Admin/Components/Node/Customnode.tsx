import { NodeProps, Handle, Position } from 'reactflow';
import { NodeData } from '../../Interfaces/INode';



// Define the CustomNode component
function CustomNode({ data }: NodeProps<NodeData>) {
  const containerStyle = {
    width: data.width || 1000, // Default width or custom width
    height: data.height || 500, // Default height or custom height
  };

  return (
    <div className="custom-node" style={containerStyle}>
      <div className="custom-node-container" style={containerStyle}>
        <div className="custom-node-title">{data.title}</div>
        <div>Act ID: {data.actID}</div>
        <div className="custom-node-options">
          {data.options.map((option, index) => (
            option && (
              <div key={index} className="custom-node-option">
                {option}
                <Handle
                  type="source"
                  position={Position.Bottom}
                  id={`option-${index}`}
                  className="custom-node-option-handle"
                  style={{ background: '#00ff00', transform: 'scale(5)' }} // Example transformation
                />
              </div>
            )
          ))}
        </div>
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: '#555', transform: 'scale(5)' }} // Example transformation
        />
      </div>
    </div>
  );
}

export default CustomNode;
