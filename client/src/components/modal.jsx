// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, orders }) => {
    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h3>Past Orders</h3>
                <button onClick={onClose} style={modalStyles.closeButton}>Close</button>
                <ul>
                    {orders.map(order => (
                        <li key={order._id}>{order.description} - {order.date}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        background: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '300px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    closeButton: {
        marginBottom: '10px',
    },
};

export default Modal;