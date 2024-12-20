import React from 'react';

const PastOrderModal = ({ isOpen, onClose, orders }) => {
    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h3>Past Orders</h3>
                <button onClick={onClose} style={modalStyles.closeButton}>Close</button>
                <div style={modalStyles.tableContainer}>
                    {orders.length === 0 ? (
                        <p>No orders found.</p> // Message when no orders are available
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Products</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => {
                                    let products = [];
                                    try {
                                        if (order.productName) {
                                            products = JSON.parse(order.productName);
                                        }
                                    } catch (error) {
                                        console.error('Error parsing productName:', error);
                                    }

                                    return (
                                        <tr key={index}>
                                            <td>
                                                {products.length > 0 ? (
                                                    <ul>
                                                        {products.map((product, productIndex) => (
                                                            <li className="productList" key={productIndex} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <span>{product.name}</span>
                                                                <span>{product.qty}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No products available</p>
                                                )}
                                            </td>
                                            <td>{order.Date}</td>
                                            <td>{order.TotalPrice.toFixed(2)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
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
        width: 'auto',
        minWidth: '600px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        height: '75vh',
        overflow: 'hidden', 
    },
    closeButton: {
        marginBottom: '10px',
    },
    tableContainer: {
        maxHeight: '60vh',
        overflowY: 'auto', 
    },
};

export default PastOrderModal;