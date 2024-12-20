import React, { useState } from 'react';
import NavBar from '../components/navBar';
import SalesHistory from '../components/salesHistory';
import CustomerAccounts from '../components/customerAccounts';
import InventoryManagement from '../components/inventoryManagement';
import './pages.css';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('sales');

    return (
        <div>
            <NavBar />
            <div className="tabs">
                <button onClick={() => setActiveTab('sales')} className={activeTab === 'sales' ? 'active-tab' : ''}>
                    Sales History
                </button>
                <button onClick={() => setActiveTab('customers')} className={activeTab === 'customers' ? 'active-tab' : ''}>
                    Customer Accounts
                </button>
                <button onClick={() => setActiveTab('inventory')} className={activeTab === 'inventory' ? 'active-tab' : ''}>
                    Inventory Management
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'sales' && <SalesHistory />}
                {activeTab === 'customers' && <CustomerAccounts />}
                {activeTab === 'inventory' && <InventoryManagement />}
            </div>
        </div>
    );
};

export default AdminPage;