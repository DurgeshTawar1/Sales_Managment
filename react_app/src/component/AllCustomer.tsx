import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { TextField, Button, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import { getAllCustomers, deleteCustomerById } from '../api/customer'; // Import API functions

// interface CategoryData {
//   _id: string; // Change to _id
//   CustomerName: string;
//   ContactNo: number;
//   Gender: string;
//   CustomerEmail: string;
//   notes: string;
//   AdvancedPaid: string;
//   discountRate: string;
//   location: string;
// }

const Container = styled(Box)`
  margin-top: 70px;
   padding:10px;
 
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const SearchInput = styled(TextField)`
  width: 50%;
  max-width: 400px;
  border-radius:30px;
`;

const AddButton = styled(Button)`
  && {
    background-color: #4caf50;
    color: white;
    margin-left: 10px;  // Adjust margin-left to create space between the search box and the button
    &:hover {
      background-color: #45a049;
    }
  }
`;
interface Customer {
    _id: string;
    customerName: string;
    customerContact: number;
    gender: string;
    customerEmail: string;
    notes: string;
    AdvancedPaid: string;
    discountRate: string;
    location: string;
  }

const CategoryTable: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');


    
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getAllCustomers();
        console.log(response.data);
        // Ensure categories are set correctly
        setCustomers(response.data || []);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (id: string) => {
    console.log('Edit clicked for id:', id);
    // Implement your edit logic here
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomerById(id);
      setCustomers(customers.filter(customer => customer._id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const filteredCategories = customers.filter((customer) =>
    customer.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || false
  );

  const navigate = useNavigate();

  const handleAddCustomer = ()=>{
    navigate("/add-customer")
  }

  const columns: GridColDef[] = [
    { field: 'customerName', headerName: 'Customer Name', width: 200 },
    { field: 'customerContact', headerName: 'Contact No', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 120 },
    { field: 'customerEmail', headerName: 'Customer Email', width: 200 },
    // { field: 'AdvancedPaid', headerName: 'Advanced Paid', width: 150 },
    // { field: 'discountRate', headerName: 'Discount Rate', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    // { field: 'notes', headerName: 'Notes', width: 200 },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: GridCellParams) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params.row._id)}
            style={{ marginRight: 10 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <Header>
        <Typography variant="h5">Category List</Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SearchInput
            variant="outlined"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <AddButton style={{ width: "200px" }} onClick={handleAddCustomer}>Add Customer</AddButton>
        </div>
      </Header>
      <div style={{ height: 300, width: '80%', marginTop: "2rem", marginLeft: "17rem" }}>
        <DataGrid
          rows={filteredCategories}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id} // Specify the custom ID
        />
      </div>
    </Container>
  );
};

export default CategoryTable;
