import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/users/getAllOrders", {
                    headers: { 'Content-Type': 'application/json' },
                });
                setOrders(response.data);
            } catch (err) {
                setError('Failed to fetch orders. Please try again later.');
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Sales History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.FK_CustomerID}</td>
                            <td>{order.productName}</td>
                            <td>{new Date(order.Date).toLocaleDateString()}</td>
                            <td>{order.TotalPrice}</td>
                            <td>{order.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesHistory;
