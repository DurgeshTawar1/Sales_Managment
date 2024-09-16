// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';
import './styles/Sidebar.css';
import './styles/Navbar.css';
import AddCustomerForm from './component/AddCustomer';
import AllCustomer from './component/AllCustomer';
import AddProduct from './component/AddProduct';
import AllProduct from './component/AllProduct';
import AddCategory from './component/AddCategory';
import AllcategoryTable from './component/AllCategory';
import AddPurchase from './component/AddPurchase';
import PurchaseTable from './component/AllPurchase';
import AddSale from './component/AddSale';
import SalesTable from './component/AllSale';
import AddExpense from './component/AddExpense';
import AddIncome from './component/AddIncome';
import AddSupplier from './component/AddSupplier';
import SupplierTable from './component/AllSupplier';
import DashBoard from './component/DashBoard';
import SalesReport from './component/Salesreport';
import PrivateRoute from './component/PrivateRoute';
import Chat from './component/Chat';
// import ScreenshotTaker from './component/ScreenshotTaker';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('authToken');
    return token !== null;
  };
  
  return (
    <Router basename='/react'>
      <div>
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
{/*          <Chat/> */}
       {/* <ScreenshotTaker/> */}
        <Routes>
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated()}  element={<DashBoard />} /> }  />
          <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated()}  element={<DashBoard />} /> }/>
          {/* <Route path="/" element={<h1>Home Page</h1>} /> */}
                {/* <Route path="/add-customer" element={<PrivateRoute isAuthenticated={isAuthenticated()} element={<AddCustomerForm />} />} /> */}
 
          <Route path="/add-customer" element={<PrivateRoute isAuthenticated={isAuthenticated()} element={<AddCustomerForm />} /> }/>
          <Route path="/all-customer" element={<PrivateRoute isAuthenticated={isAuthenticated()}  element={<AllCustomer />} /> }/>
          <Route path="/add-product"  element={<PrivateRoute isAuthenticated={isAuthenticated()}  element={<AddProduct />}  /> }/>
          <Route path="/all-product" element={<PrivateRoute isAuthenticated={isAuthenticated()} element={<AllProduct />} /> } />
          <Route path="/add-category" element={<PrivateRoute isAuthenticated={isAuthenticated()}   element={<AddCategory />} /> }/>
          <Route path="/all-category" element={<PrivateRoute isAuthenticated={isAuthenticated()}  element={<AllcategoryTable />} /> } />
          <Route path="/add-purchase" element={<PrivateRoute isAuthenticated={isAuthenticated()}  element={<AddPurchase />} /> }/>
          <Route path="/all-purchase" element={<PrivateRoute isAuthenticated={isAuthenticated()} element={<PurchaseTable />} /> }/>
          <Route path="/add-sale" element={<PrivateRoute isAuthenticated={isAuthenticated()} element={<AddSale />} /> } />
          <Route path="/all-sale" element={<PrivateRoute isAuthenticated={isAuthenticated()}  element={<SalesTable />} /> }/>
          <Route path="/add-expense" element={<PrivateRoute isAuthenticated={isAuthenticated()}  element={<AddExpense />} /> }/>
          <Route path="/add-income" element={<PrivateRoute isAuthenticated={isAuthenticated()}  element={<AddIncome />}  /> }/>
          <Route path="/add-supplier"  element={<PrivateRoute isAuthenticated={isAuthenticated()} element={<AddSupplier />} /> }/>
          <Route path="/all-supplier" element={<PrivateRoute isAuthenticated={isAuthenticated()}  element={<SupplierTable />} /> }/>
          <Route path="/saslesreport" element={<PrivateRoute isAuthenticated={isAuthenticated()}  element={<SalesReport />} /> }/>
        </Routes>
        </div>
      
    </Router>
  );
};

export default App;
