import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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


    const filteredOrders = orders.filter(order => {
        const customerMatch = customerFilter
            ? customers[order.FK_CustomerID]?.toLowerCase().includes(customerFilter.toLowerCase())
            : true;

        const productMatch = productFilter
            ? (
                order.productName &&
                (() => {
                    try {
                        const products = JSON.parse(order.productName);
                        return products.some(product =>
                            product?.name?.toLowerCase().includes(productFilter.toLowerCase())
                        );
                    } catch (e) {
                        console.error("Failed to parse productName:", order.productName, e);
                        return false;
                    }
                })()
            )
            : true;
        const dateMatch = dateFilter ? new Date(order.Date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString() : true;

        return customerMatch && productMatch && dateMatch;
    });


    const generateReport = () => {
        const doc = new jsPDF();
        let totalRevenue = 0;
        const productCount = {};
        const customerSet = new Set();

        filteredOrders.forEach(order => {
            totalRevenue += order.TotalPrice;
            customerSet.add(customers[order.FK_CustomerID] || 'Unknown');

            if (order.productName) {
                const products = JSON.parse(order.productName);
                products.forEach(product => {
                    productCount[product.name] = (productCount[product.name] || 0) + product.qty;
                });
            }
        });

        doc.text("Sales Report", 20, 10);
        doc.text(`Total Revenue: $${totalRevenue.toFixed(2)}`, 20, 20);
        doc.text(`Unique Customers: ${customerSet.size}`, 20, 30);
        doc.text("Top Products:", 20, 40);


        const topProducts = Object.entries(productCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const productTableData = topProducts.map((product, index) => [index + 1, product[0], product[1]]);

        doc.autoTable({
            head: [['#', 'Product Name', 'Quantity Sold']],
            body: productTableData,
            startY: 50,
            theme: 'grid',
        });

        doc.addPage();
        doc.text("Detailed Orders", 20, 10);

        const orderTableData = filteredOrders.map(order => [
            order._id,
            customers[order.FK_CustomerID] || 'Unknown',
            order.productName ? JSON.parse(order.productName).map(product => product.name).join(', ') : 'N/A',
            `$${order.TotalPrice.toFixed(2)}`,
            new Date(order.Date).toLocaleDateString()
        ]);

        doc.autoTable({
            head: [['Order ID', 'Customer', 'Product', 'Total Price', 'Date']],
            body: orderTableData,
            startY: 20,
            theme: 'grid',
        });

        doc.save("sales_report.pdf");
    };

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
                <button onClick={generateReport}>Generate Report</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Total Price</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{customers[order.FK_CustomerID] || 'Unknown'}</td>
                            <td>{order.productName ? JSON.parse(order.productName).map(product => product.name).join(', ') : 'N/A'}</td>
                            <td>${order.TotalPrice.toFixed(2)}</td>
                            <td>{order.Date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesHistory;