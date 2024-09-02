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
import styled from "styled-components";

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
      { label: "Sales Report", link: "/saslesreport" },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: ${props => props.isOpen ? "250px" : "60px"};
  background-color: #2c3e50;
  color: #ecf0f1;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  transition: all 0.3s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: ${props => props.isOpen ? "200px" : "60px"};
    transform: ${props => props.isOpen ? "translateX(0)" : "translateX(-200px)"};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #34495e;
`;

const SidebarToggle = styled(FaBars)`
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 15px;
  color: #ecf0f1;
`;

const SidebarHeading = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const MenuItemLink = styled(Link)<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #ecf0f1;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #34495e;
  }

  svg {
    font-size: 1.2rem;
    margin-right: ${props => props.isOpen ? "15px" : "0"};
  }

  span {
    display: ${props => props.isOpen ? "inline" : "none"};
  }
`;

const MenuItemDiv = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #ecf0f1;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }

  svg {
    font-size: 1.2rem;
    margin-right: ${props => props.isOpen ? "15px" : "0"};
  }

  span {
    display: ${props => props.isOpen ? "inline" : "none"};
  }
`;

const SubMenu = styled.div`
  background-color: #34495e;
  padding-left: 20px;
`;

const SubMenuItem = styled(Link)`
  display: block;
  padding: 10px 15px;
  color: #ecf0f1;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2c3e50;
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <SidebarToggle onClick={toggleSidebar} />
        {isOpen && <SidebarHeading>SalesZone</SidebarHeading>}
      </SidebarHeader>
      {menuItems.map((item) => (
        <div key={item.label}>
          {item.subItems ? (
            <MenuItemDiv onClick={() => toggleSubmenu(item.label)} isOpen={isOpen}>
              <item.icon />
              {isOpen && (
                <>
                  <span>{item.label}</span>
                  {openSubmenu === item.label ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </>
              )}
            </MenuItemDiv>
          ) : (
            <MenuItemLink to={item.link || "#"} isOpen={isOpen}>
              <item.icon />
              {isOpen && <span>{item.label}</span>}
            </MenuItemLink>
          )}
          {item.subItems && openSubmenu === item.label && isOpen && (
            <SubMenu>
              {item.subItems.map((subItem) => (
                <SubMenuItem key={subItem.label} to={subItem.link}>
                  {subItem.label}
                </SubMenuItem>
              ))}
            </SubMenu>
          )}
        </div>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
