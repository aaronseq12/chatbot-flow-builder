import React from 'react';

export default function NodesPanel() {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="nodes-panel">
            <div className="panel-description">
                Drag a node to the canvas to get started.
            </div>
            <div
                className="dnd-node"
                onDragStart={(event) => onDragStart(event, 'textMessage')}
                draggable
            >
                <span>💬</span>
                Message
            </div>
        </aside>
    );
}