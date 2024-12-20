import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerAccounts = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users/getAllUsers');
                setCustomers(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Customer Accounts</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        {/* <th>Address</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.firstName + " " + customer.lastName}</td>
                            <td>{customer.email}</td>
                            {/* <td>{customer.address}</td> */}
                            <td>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button className='viewOrder'>View Past Orders</button>
                                    <button className='viewOrder'>Update/View Information</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerAccounts;