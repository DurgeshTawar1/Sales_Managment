import React, { useState } from 'react';
import "../styles/Navbar.css";

interface NavbarProps {
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
}

interface User {
    user_name: string;
}

const Navbar: React.FC<NavbarProps> = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Assume we get the user from session storage on component mount
    React.useEffect(() => {
        const userString = sessionStorage.getItem('user');
        if (userString) {
            setUser(JSON.parse(userString));
        }
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        // Remove the token from session storage
        sessionStorage.removeItem('token');
        // Remove the user from session storage
        sessionStorage.removeItem('user');
        // Reset the user state
        setUser(null);
        // Redirect to the logout URL
        window.location.href = 'http://localhost:8080/site/logout';
    };

    return (
        <div className="navbar">
            <h1 className="navbar-heading">Daily Sales Records</h1>
            <div className="navbar-user" onClick={toggleDropdown}>
                <img src="/user.gif" alt="User" className="navbar-user-image" />
                {isDropdownOpen && (
                    <div className="dropdown-card">
                        <div className="dropdown-user-info">
                            <p><strong>Name:</strong> {user ? user.user_name : 'John Doe'}</p>
                            <p><strong>Email:</strong> john.doe@example.com</p>
                        </div>
                        <div className="dropdown-actions">
                            <button className="update-button">Update Profile</button>
                            <button className="logout-button" onClick={handleLogout}
                            
                            >
                                Logout {user && `(${user.user_name})`}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;