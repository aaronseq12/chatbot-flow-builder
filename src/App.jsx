import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';

import NodesPanel from './components/Panels/NodesPanel';
import SettingsPanel from './components/Panels/SettingsPanel';
import Header from './components/Header';
import TextMessageNode from './components/CustomNodes/TextMessageNode';

const nodeTypes = { textMessage: TextMessageNode };

let id = 0;
const getId = () => `dndnode_${id++}`;

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  // Find the selected node directly from the nodes array on every render.
  // This ensures it's always up-to-date.
  const selectedNode = nodes.find((node) => node.selected);

  const onNodeClick = useCallback(
    (event, node) => {
      // Set the 'selected' property on the clicked node
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          selected: n.id === node.id,
        }))
      );
    },
    [setNodes]
  );

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
        id: getId(),
        type,
        position,
        data: { label: `text message` }, // Changed initial text
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onConnect = useCallback(
    (params) => {
      const sourceHandleHasEdge = edges.some(
        (edge) => edge.source === params.source
      );
      if (!sourceHandleHasEdge) {
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [edges, setEdges]
  );

  const handleSave = useCallback(() => {
    const nodesWithEmptyTargets = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    ).length;

    if (nodes.length > 1 && nodesWithEmptyTargets > 1) {
      setSaveStatus('Error: Cannot save flow');
      setTimeout(() => setSaveStatus(''), 3000);
    } else {
      setSaveStatus('Flow Saved!');
      console.log('Flow saved:', { nodes, edges });
      setTimeout(() => setSaveStatus(''), 3000);
    }
  }, [nodes, edges]);

  const clearSelection = () => {
    // Deselect all nodes
    setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));
  };

  return (
    <div className="app-container">
      <Header onSave={handleSave} saveStatus={saveStatus} />
      <div className="dndflow">
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
              nodeTypes={nodeTypes}
              onNodeClick={onNodeClick}
              onPaneClick={clearSelection}
              fitView
            >
              <Controls />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
        <div className="sidebar">
          {/* Use the dynamically found selectedNode for rendering */}
          {selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              setNodes={setNodes}
              onBack={clearSelection}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;