import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from '@xyflow/react'; // Updated import
import '@xyflow/react/dist/style.css'; // Updated import

import NodesPanel from './components/Panels/NodesPanel';
import SettingsPanel from './components/Panels/SettingsPanel';
import Header from './components/Header';
import TextMessageNode from './components/CustomNodes/TextMessageNode';

import './App.css';

const nodeTypes = { textMessage: TextMessageNode };
let id = 1;
const getUniqueNodeId = () => `text-node-${id++}`;

const FlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  // This callback is triggered when a node is clicked, or the selection changes.
  const onSelectionChange = useCallback((elements) => {
    const selected = elements.nodes[0];
    if (selected) {
      setSelectedNode(selected);
    } else {
      setSelectedNode(null);
    }
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getUniqueNodeId(),
        type,
        position,
        data: { label: 'New message' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onConnect = useCallback(
    (params) => {
      const sourceHandleHasEdge = edges.some(edge => edge.source === params.source);
      if (!sourceHandleHasEdge) {
        setEdges((eds) => addEdge(params, eds));
      } else {
        console.warn("Source handle already has a connection.");
      }
    },
    [edges, setEdges]
  );

  const handleSave = useCallback(() => {
    const nodesWithNoTargetEdge = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );

    if (nodes.length > 1 && nodesWithNoTargetEdge.length > 1) {
      setSaveStatus('Error: More than one node has an empty target.');
      setTimeout(() => setSaveStatus(''), 3000);
    } else {
      setSaveStatus('Flow Saved Successfully!');
      console.log('Flow saved:', { nodes, edges });
      setTimeout(() => setSaveStatus(''), 3000);
    }
  }, [nodes, edges]);

  return (
    <div className="app-container">
      <Header onSave={handleSave} saveStatus={saveStatus} />
      <main className="flow-builder-main">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onSelectionChange={onSelectionChange}
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
        <aside className="sidebar">
          {selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              setNodes={setNodes}
              onClearSelection={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel />
          )}
        </aside>
      </main>
    </div>
  );
};

export default FlowBuilder;
