import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesHistory = () => {
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [customerFilter, setCustomerFilter] = useState('');
    const [productFilter, setProductFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

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
            const response = await axios.get('http://localhost:3001/api/users/getAllUsers');
            const customerMap = {};
            response.data.forEach(customer => {
                customerMap[customer._id] = customer.firstName + " " + customer.lastName;
            });
            setCustomers(customerMap);
        };

        fetchOrders();
        fetchCustomers();
    }, []);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;

    // Filter orders based on the filters
    const filteredOrders = orders.filter(order => {
        const customerMatch = customerFilter ? customers[order.FK_CustomerID]?.toLowerCase().includes(customerFilter.toLowerCase()) : true;
        const productMatch = productFilter ? (order.productName && JSON.parse(order.productName).some(product => product.name.toLowerCase().includes(productFilter.toLowerCase()))) : true;
        const dateMatch = dateFilter ? new Date(order.Date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString() : true;

        return customerMatch && productMatch && dateMatch;
    });

    return (
        <div>
            <h2>Sales History</h2>
            <div>
                <input
                    type="text"
                    placeholder="Filter by Customer"
                    value={customerFilter}
                    onChange={(e) => setCustomerFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by Product"
                    value={productFilter}
                    onChange={(e) => setProductFilter(e.target.value)}
                />
                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Products</th>
                        <th>Date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order, index) => {
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
                                <td>{customers[order.FK_CustomerID] || 'Unknown'}</td>
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
        </div>
    );
};

export default SalesHistory;