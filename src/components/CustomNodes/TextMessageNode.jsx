import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const TextMessageNode = ({ data, isConnectable, selected }) => {
    return (
        <div className={`text-message-node ${selected ? 'selected' : ''}`}>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
            />
            <div className="node-header">
                <span>💬 Send Message</span>
            </div>
            <div className="node-body">
                <p>{data.label || 'Text message'}</p>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
            />
        </div>
    );
};

export default memo(TextMessageNode);