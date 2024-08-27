// Navbar.tsx
import React from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import "../styles/Navbar.css";

interface NavbarProps {
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
    return (
        <div className="navbar">
           
            <h1 className="navbar-heading">Daily Sales Records</h1>
            <div className="navbar-user">
                <FaUserCircle size={24} />
            </div>
        </div>
    );
};

export default Navbar;
