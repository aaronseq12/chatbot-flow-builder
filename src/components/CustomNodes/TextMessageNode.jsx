import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react'; // CORRECTED IMPORT

const TextMessageNode = ({ data, selected }) => {
    // isConnectable prop is handled by React Flow internally, no need to pass it down
    return (
        <div className={`text-message-node ${selected ? 'selected' : ''}`}>
            <Handle
                type="target"
                position={Position.Left}
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
            />
        </div>
    );
};

export default memo(TextMessageNode);
