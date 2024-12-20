import React, { useState, useEffect} from 'react';
import NavBar from '../components/navBar';
import SalesHistory from '../components/salesHistory';
import CustomerAccounts from '../components/customerAccounts';
import InventoryManagement from '../components/inventoryManagement';
import './pages.css';
import '../components/components.css';
import { useCookie } from '../global/CookieContext'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('sales');

      const { cookieData } = useCookie();

      const navigate = useNavigate();

    useEffect(() => {
        if (!cookieData)
            return;
        if (cookieData.role !== 'admin'){
            alert("You don't have admin permission");
            navigate("/");
        }
    }, [cookieData])

    return (
        <div>
            <NavBar />
            <div className='adminContent'>
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
                <div className="adminTab-content">
                    {activeTab === 'sales' && <SalesHistory />}
                    {activeTab === 'customers' && <CustomerAccounts />}
                    {activeTab === 'inventory' && <InventoryManagement />}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;