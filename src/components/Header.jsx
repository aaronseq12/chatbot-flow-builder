import React from 'react';

export default function Header({ onSave, saveStatus }) {
    return (
        <header className="header">
            {saveStatus && <div className="save-status-message">{saveStatus}</div>}
            <button className="save-button" onClick={onSave}>
                Save Changes
            </button>
        </header>
    );
}