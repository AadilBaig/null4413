import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesHistory = () => {
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState({});
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

        const fetchCustomers = async () => {
            const response = await axios.get('http://localhost:3001/api/users/getAllUsers'); // Adjust the endpoint as necessary
            const customerMap = {};
            response.data.forEach(customer => {
                customerMap[customer._id] = customer.firstName + " " + customer.lastName; // Assuming customer object has _id and name
            });
            setCustomers(customerMap);
        };

        fetchOrders();
        fetchCustomers();
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
                        <th>Products</th>
                        <th>Date</th>
                        <th>Price</th>
                        {/* <th>Details</th> */}
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => {
                        let products = [];
                        try {
                            // Check if productName is defined and parse it
                            if (order.productName) {
                                products = JSON.parse(order.productName);
                            }
                        } catch (error) {
                            console.error('Error parsing productName:', error);
                        }

                        return (
                            <tr key={index}>
                                <td>{customers[order.FK_CustomerID] || 'Unknown'}</td>
                                <td>
                                    {/* Check if products array is not empty */}
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
                                <td>{new Date(order.Date).toLocaleDateString()}</td>
                                <td>{order.TotalPrice.toFixed(2)}</td>
                                {/* <td><button className='viewOrder'>View Order</button></td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default SalesHistory;