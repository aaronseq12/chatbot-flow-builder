import React from 'react';

export default function SettingsPanel({ selectedNode, setNodes, onBack }) {
    const handleTextChange = (event) => {
        const newText = event.target.value;
        setNodes((nds) =>
            nds.map((node) => {
                // Find the node to update
                if (node.id === selectedNode.id) {
                    // Create a new node object with the updated data, instead of mutating the old one
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            label: newText,
                        },
                    };
                }
                return node;
            })
        );
    };

    return (
        <aside className="settings-panel">
            <div className="panel-header">
                <button onClick={onBack} className="back-button">←</button>
                <h3>Message Settings</h3>
            </div>
            <div className="panel-content">
                <label>Text:</label>
                <textarea
                    rows="4"
                    value={selectedNode.data.label}
                    onChange={handleTextChange}
                />
            </div>
        </aside>
    );
}