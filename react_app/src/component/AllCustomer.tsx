import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import styled from 'styled-components';
import { getAllCustomers, Customer } from '../Api/CustomerApi'; // Make sure this path is correct
import { deleteCustomerById } from '../Api/CustomerApi'; // Make sure this path is correct
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Styled components
const SearchInput = styled.input`
    width: 100%;
    max-width: 200px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 1em;
    margin-bottom: 20px;
`;

const AddButton = styled.button`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
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

const EditButton = styled.button`
    background-color: #FFC107;
    border: none;
    color: white;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e0a800;
    }
`;

const DeleteButton = styled.button`
    background-color: #F44336;
    border: none;
    color: white;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c62828;
    }
`;

const Container = styled.div`
    margin-top: 70px; /* Adjust as needed */
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

const AllCustomer: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 5,
        page: 0,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getAllCustomers();
                setCustomers(data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load customers.');
                setLoading(false);
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = (id: number) => {
        console.log('Edit customer with id:', id);
        // Implement edit functionality here
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteCustomerById(id.toString()); // Call delete API
            setCustomers((prevCustomers) =>
                prevCustomers.filter((customer) => customer.customerContact !== id)
            ); // Remove deleted customer from state
        } catch (error) {
            setError('Failed to delete customer.');
            console.error('Error deleting customer:', error);
        }
    };

    const handleOpenAddCustomer = () => {
        navigate("/add-customer");
    };

    const handlePaginationModelChange = (newModel: GridPaginationModel) => {
        setPaginationModel(newModel);
    };

    const filteredCustomers = customers.filter(customer =>
        customer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'SNO', headerName: 'S.No', width: 70 },
        { field: 'CustomerName', headerName: 'Name', width: 150 },
        { field: 'ContactNo', headerName: 'Contact No', width: 150 },
        { field: 'Gender', headerName: 'Gender', width: 100 },
        { field: 'Email', headerName: 'Email', width: 200 },
        { field: 'DiscountRate', headerName: 'Discount Rate', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <EditButton onClick={() => handleEdit(params.row.id)}>
                        <EditIcon fontSize="small" />
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon fontSize="small" />
                    </DeleteButton>
                </div>
            )
        }
    ];

    const rows = filteredCustomers.map((customer, index) => ({
        id: customer.customerContact,
        SNO: index + 1,
        CustomerName: customer.customerName,
        ContactNo: customer.customerContact,
        Gender: customer.gender,
        Email: customer.customerEmail,
        DiscountRate: customer.discountRate,
    }));
    
    return (
        <Container>
            <Header>
                <h2>Customer List</h2>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <SearchInput
                        type="text"
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <AddButton onClick={handleOpenAddCustomer}>Add Customer</AddButton>
                </div>
            </Header>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ height: 400, width: '70%', marginLeft: '300px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationModelChange}
                    pageSizeOptions={[5, 10, 15]}
                    checkboxSelection
                    sx={{ overflow: 'clip' }}
                />
            </div>
        </Container>
    );
};

export default AllCustomer;