import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

const UpdateCustomerInfoModal = ({ isOpen, onClose, customer }) => {
    const [formData, setFormData] = useState({
        userFirstName: '',
        userLastName: '',
        userEmail: '',
        addressStreet: '',
        addressProvince: '',
        addressCountry: '',
        addressZip: '',
        addressPhoneNum: '',
        addressCreditCard: '',
    });

    useEffect(() => {
        if (customer) {
            setFormData({
                userFirstName: customer.userFirstName || '',
                userLastName: customer.userLastName || '',
                userEmail: customer.userEmail || '',
                addressStreet: customer.addressStreet || '',
                addressProvince: customer.addressProvince || '',
                addressCountry: customer.addressCountry || '',
                addressZip: customer.addressZip || '',
                addressPhoneNum: customer.addressPhoneNum || '',
                addressCreditCard: customer.addressCreditCard || '',
            });
        }
    }, [customer]);

    if (!isOpen) return null;

    // Check if customer is null or undefined
    if (!customer) {
        return (
            <div style={modalStyles.overlay}>
                <div style={modalStyles.modal}>
                    <h2>No Customer Information Available</h2>
                    <button onClick={onClose} style={modalStyles.closeButton}>Close</button>
                </div>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            console.log("here");
            console.log(formData);
            const response = await axios.put(
                `https://null4413-backend.onrender.com/api/users/updateCustomerInfo`, // Replace with your actual endpoint
                {
                    ...formData,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            console.log("Customer updated successfully:", response.data);

            alert("Customer information updated successfully!");
            onClose(); // Close the modal after successful submission
        } catch (error) {
            console.error("Error updating customer information:", error.message);
            alert("Failed to update customer information. Please try again.");
        }
    };


    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h2>Update Customer Information</h2>
                <button onClick={onClose} style={modalStyles.closeButton}>Close</button>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="userId" value={formData.userId} />
                    {renderInputField("First Name", "userFirstName", formData.userFirstName, handleChange)}
                    {renderInputField("Last Name", "userLastName", formData.userLastName, handleChange)}
                    {renderInputField("Email", "userEmail", formData.userEmail, handleChange)}
                    {renderInputField("Street", "addressStreet", formData.addressStreet, handleChange)}
                    {renderInputField("Province", "addressProvince", formData.addressProvince, handleChange)}
                    {renderInputField("Country", "addressCountry", formData.addressCountry, handleChange)}
                    {renderInputField("Zip Code", "addressZip", formData.addressZip, handleChange)}
                    {renderInputField("Phone Number", "addressPhoneNum", formData.addressPhoneNum, handleChange)}
                    {renderInputField("Credit Card", "addressCreditCard", formData.addressCreditCard, handleChange)}
                    <button type="submit" style={modalStyles.updateButton}>Update</button>
                </form>
            </div>
        </div>
    );
};

const renderInputField = (label, name, value, onChange) => (
    <div>
        <label>{label}:</label>
        <input type="text" name={name} value={value} onChange={onChange} />
    </div>
);

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
        boxShadow: '0 2px 10px rgba(0, 0,  0, 0, 0.1)',
    },
    closeButton: {
        marginBottom: '10px',
    },
    updateButton: {
        marginTop: '10px',
    },
};

export default UpdateCustomerInfoModal;