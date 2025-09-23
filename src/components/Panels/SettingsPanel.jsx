import React from 'react';

export default function SettingsPanel({ selectedNode, setNodes, onClearSelection }) {
    const handleTextChange = (event) => {
        const newText = event.target.value;
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNode.id) {
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
                <button onClick={onClearSelection} className="back-button">←</button>
                <h3>Message Settings</h3>
            </div>
            <div className="panel-content">
                <label htmlFor="text-input">Text:</label>
                <textarea
                    id="text-input"
                    rows="4"
                    value={selectedNode.data.label}
                    onChange={handleTextChange}
                />
            </div>
        </aside>
    );
}
