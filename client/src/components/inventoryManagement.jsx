import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryManagement = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newQuantities, setNewQuantities] = useState({});

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users/getInventory', {
                    headers: { 'Content-Type': 'application/json' },
                });
                setInventory(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    const updateQuantity = async (itemId, newQuantity) => {
        try {
            const response = await axios.post(
                `http://localhost:3001/api/users/updateQuantity?`,
                {
                    itemId: itemId,
                    quantity: newQuantity,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(response.data);

            // Update local inventory state (or refetch inventory if needed)
            setInventory((prevInventory) =>
                prevInventory.map((item) =>
                    item._id === itemId ? { ...item, Item1: { ...item.Item1, quantity: newQuantity } } : item
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const handleInputChange = (itemId, value) => {
        setNewQuantities({ ...newQuantities, [itemId]: value });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Inventory Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item._id}>
                            <td>{item.Item1.name}</td>
                            <td>{item.Item1.quantity}</td>
                            <td>
                                <input
                                    type="number"
                                    placeholder="New quantity"
                                    value={newQuantities[item._id] || ''}
                                    onChange={(e) => handleInputChange(item._id, e.target.value)}
                                />
                                <button
                                    onClick={() =>
                                        updateQuantity(item._id, parseInt(newQuantities[item._id] || item.Item1.quantity, 10))
                                    }
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryManagement;
