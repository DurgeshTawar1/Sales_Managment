import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable, { TableColumn } from 'react-data-table-component';
import styled from 'styled-components';
import Loader from './Loader'; // Import the Loader component

interface CustomerData {
  id: number;
  name: string;
  contact: string;
  email: string;
  advancedPaid: number;
}

const AddButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 20px 40px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Container = styled.div`
  margin-top: 50px; /* Increased top margin */
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px; /* Increased bottom margin */
`;

const AllProduct: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state
  const [data, setData] = useState<CustomerData[]>([]);

  const handleAddCustomer = () => {
    navigate('/add-customer');
  };

  useEffect(() => {
    setTimeout(() => {
      const dummyData: CustomerData[] = [
        {
          id: 1,
          name: "John Doe",
          contact: "123-456-7890",
          email: "john@example.com",
          advancedPaid: 500,
        },
        {
          id: 2,
          name: "Jane Smith",
          contact: "987-654-3210",
          email: "jane@example.com",
          advancedPaid: 750,
        },
        // Add more dummy data if needed
      ];
      setData(dummyData);
      setLoading(false); // Set loading to false after data is fetched
    }, 2000); // Simulate a 2-second delay
  }, []);

  const columns: TableColumn<CustomerData>[] = [
    {
      name: 'Product Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: row => row.contact,
    },
    {
      name: 'Cost',
      selector: row => row.email,
    },
    {
      name: 'Sell',
      selector: row => row.advancedPaid,
      sortable: true,
      right: true,
      format: row => `$${row.advancedPaid.toFixed(2)}`,
    },
    {
      name: 'Date',
      selector: row => row.email, // Placeholder for date, adjust as necessary
    },
  ];

  const customStyles = {
    table: {
      style: {
        minWidth: '300px',
        maxWidth: '800px',
        margin: '0 auto',
      },
    },
    headRow: {
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    rows: {
      style: {
        fontSize: '13px',
        minHeight: '40px',
      },
    },
  };

  return (
    <Container>
      <Header>
        <h2>Customer List</h2>
        <AddButton onClick={handleAddCustomer}>Add Customer</AddButton>
      </Header>
      {loading ? (
        <Loader /> 
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
          highlightOnHover
          striped
          responsive
          customStyles={customStyles}
          dense
        />
      )}
    </Container>
  );
};

export default AllProduct;
