import { useState, useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  DefaultEdgeOptions,
  NodeTypes,
  Connection,
  MiniMap,
  FitViewOptions,
  useReactFlow,
  OnInit,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './Customnode';
import { ConnectionData } from '../../Interfaces/INode';
import { IEventItem } from '../../Interfaces/IEventItem';


const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const Flow = ({ events, onConnectionsChange, saveChoice }: { events: IEventItem[], onConnectionsChange: (connections: ConnectionData[]) => void, saveChoice: (parentId: number, optionId: number, selectedEventId: number) => void }) => {
  const [connections, setConnections] = useState<ConnectionData[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const nodesInitialized = useRef(false);

  const onInit: OnInit = (instance) => {
    if (nodes.length > 0) {
      instance.fitView(fitViewOptions);
    }
  };

  useEffect(() => {
    if (!nodesInitialized.current) {
      const initialNodes = events.map((event, index) => ({
        id: String(event.acteventID),
        data: {
          title: event.eventTitle,
          actID: event.actID,
          options: [event.option1, event.option2, event.option3, event.option4],
        },
        position: { y: 300, x: 600 * index},
        type: 'custom',
      }));
      setNodes(initialNodes);
      nodesInitialized.current = true;
    }
  }, [events]);

  useEffect(() => {
    onConnectionsChange(connections);
  }, [connections, onConnectionsChange]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    []
  );

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));

      const { source, sourceHandle, target } = connection;
      const optionNumber = sourceHandle ? String(Number(sourceHandle.split('-')[1]) + 1) : '1';
      const newConnection = { sourceEvent: source, optionNumber, targetEvent: target };
      setConnections((prev) => [...prev, newConnection]);

      const parentId = Number(source);
      const optionId = optionNumber ? Number(optionNumber) : 1;
      const selectedEventId = Number(target);
      saveChoice(parentId, optionId, selectedEventId);

      console.log("Connection made:", newConnection);
    },
    [saveChoice]
  );

  return (
    <div style={{ width: '100%', height: '70vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onInit={onInit}
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        style={{ width: '100%', height: '100%' }}
      >
        <div className='minimap-container'>
          <MiniMap />
        </div>
      </ReactFlow>
    </div>
  );
};

export default Flow;
