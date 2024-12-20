import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PastOrderModal from './pastOrderModal';
import UpdateCustomerInfoModal from './updateCustomerInfoModal'; 

const CustomerAccounts = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [errorOrders, setErrorOrders] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); 
    const [selectedCustomer, setSelectedCustomer] = useState(null); 

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

    const fetchCustomersOrders = async (customerId) => {
        setLoadingOrders(true);
        setErrorOrders(null); 
        try {
            const response = await axios.get(`http://localhost:3001/api/users/getUsersOrders?userId=${customerId}`);
            setOrders(response.data);
            setIsModalOpen(true); // Open the modal after fetching orders
        } catch (err) {
            setErrorOrders(err.message);
        } finally {
            setLoadingOrders(false);
        }
    };

    const fetchCustomerInfo = async (email, customerId) => {
        setIsUpdateModalOpen(true);
        try {
            const response = await axios.get(`http://localhost:3001/api/users/getUserInfo?email=${email}&userId=${customerId}`);
            setSelectedCustomer(response.data);
            setIsUpdateModalOpen(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setOrders([]);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedCustomer(null);
    };

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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer._id}>
                            <td>{customer.firstName + " " + customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button className='viewOrder' onClick={() => fetchCustomersOrders(customer._id)}>
                                        View Past Orders
                                    </ button>
                                    <button className='viewOrder' onClick={() => fetchCustomerInfo(customer.email, customer._id)}>Update/View Information</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for displaying orders */}
            <PastOrderModal isOpen={isModalOpen} onClose={closeModal} orders={orders} />
            <UpdateCustomerInfoModal
                isOpen={isUpdateModalOpen}
                onClose={closeUpdateModal}
                customer={selectedCustomer}
            />

            {loadingOrders && <div>Loading orders...</div>}
            {errorOrders && <div>Error fetching orders: {errorOrders}</div>}
        </div>
    );
};

export default CustomerAccounts;