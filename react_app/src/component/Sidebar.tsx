// Sidebar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";
import {
  FaHome,
  FaTachometerAlt,
  FaUsers,
  FaBox,
  FaTags,
  FaShoppingCart,
  FaDollarSign,
  FaChartPie,
  FaCogs,
  FaBars,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "../styles/Sidebar.css";

interface MenuItem {
  icon: IconType;
  label: string;
  link?: string;
  subItems?: { label: string; link: string }[];
}

const menuItems: MenuItem[] = [
  { icon: FaHome, label: "Home", link: "/" },
  { icon: FaTachometerAlt, label: "Dashboard", link: "/dashBoard" },
  {
    icon: FaUsers,
    label: "Customers",
    subItems: [
      { label: "All Customers", link: "/all-customer" },
      { label: "Add Customer", link: "/add-customer" },
    ],
  },
  {
    icon: FaBox,
    label: "Products",
    subItems: [
      { label: "All Products", link: "/all-product" },
      { label: "Add Product", link: "/add-product" },
    ],
  },
  {
    icon: FaTags,
    label: "Categories",
    subItems: [
      { label: "Add Category", link: "/add-category" },
      { label: "All Categories", link: "/all-category" },
    ],
  },
  {
    icon: FaShoppingCart,
    label: "Purchases",
    subItems: [
      { label: "Add Purchase", link: "/add-purchase" },
      { label: "All Purchases", link: "/all-purchase" },
    ],
  },
  {
    icon: FaDollarSign,
    label: "Sales",
    subItems: [
      { label: "Add Sale", link: "/add-sale" },
      { label: "All Sales", link: "/all-sale" },
      { label: "Add Expense", link: "/add-expense" },
      { label: "Add Income", link: "/add-income" },
    ],
  },
  {
    icon: FaCogs,
    label: "Suppliers",
    subItems: [
      { label: "All Suppliers", link: "/all-supplier" },
      { label: "Add Supplier", link: "/add-supplier" },
    ],
  },
  {
    icon: FaChartPie,
    label: "Reports",
    subItems: [
      { label: "Business Report", link: "/business-report" },
      { label: "Stock Report", link: "/stock-report" },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <FaBars className="sidebar-toggle" onClick={toggleSidebar} />
        {isOpen && <h1 className="sidebar-heading">Menu</h1>}
      </div>
      {menuItems.map((item) => (
        <div key={item.label}>
          {item.subItems ? (
            <div
              className="menu-item"
              onClick={() => toggleSubmenu(item.label)}
            >
              <item.icon />
              {isOpen && (
                <>
                  <span>{item.label}</span>
                  {openSubmenu === item.label ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </>
              )}
            </div>
          ) : (
            <Link to={item.link || "#"} className="menu-item">
              <item.icon />
              {isOpen && <span>{item.label}</span>}
            </Link>
          )}
          {item.subItems && openSubmenu === item.label && isOpen && (
            <div className="submenu">
              {item.subItems.map((subItem) => (
                <Link key={subItem.label} to={subItem.link} className="submenu-item">
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;