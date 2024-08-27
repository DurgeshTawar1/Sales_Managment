import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Customer {
  id: number;
  name: string;
  contact: string;
  email: string;
  advancedPaid: number;
}

interface CustomerSelectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (customer: Customer) => void;
}

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  margin-right: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const CustomerSelectPopup: React.FC<CustomerSelectPopupProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: "John Doe", contact: "123-456-7890", email: "john@example.com", advancedPaid: 500 },
    { id: 2, name: "Jane Smith", contact: "987-654-3210", email: "jane@example.com", advancedPaid: 750 },
    // Add more dummy data if needed
  ]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCustomers(
        customers.filter(customer =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCustomers([]);
    }
  }, [searchTerm, customers]);

  if (!isOpen) return null;

  return (
    <PopupOverlay>
      <PopupContent>
        <h2>Select Customer</h2>
        <Input
          type="text"
          placeholder="Search customer by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          {filteredCustomers.length > 0 ? (
            <ul>
              {filteredCustomers.map(customer => (
                <li key={customer.id} style={{ marginBottom: '10px' }}>
                  <div>
                    <strong>{customer.name}</strong>
                    <p>{customer.contact}</p>
                    <p>{customer.email}</p>
                    <Button onClick={() => onSelect(customer)}>Select</Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No customers found</p>
          )}
        </div>
        <Button onClick={onClose}>Save</Button>

        <Button onClick={onClose}>Close</Button>
      </PopupContent>
    </PopupOverlay>
  );
};

export default CustomerSelectPopup;
