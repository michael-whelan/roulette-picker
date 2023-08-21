import React from "react";
import './modal.css';

interface ModalProps {
    name: string;
    url?: string;
    onClose: () => void;
}

export function Modal({ name, url, onClose }: ModalProps): JSX.Element {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    X
                </button>
                <h2>And the web sherriff is: {name}</h2>
                <img src={url} alt={name} />
            </div>
        </div>
    );
}
