import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import styled from 'styled-components';
import { getAllSuppliers, deleteSupplier, Supplier } from '../Api/SupplierApi'; // Import Supplier API functions
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

const SupplierTable: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({  
    pageSize: 5,
      page: 0,

  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getAllSuppliers();
        setSuppliers(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load suppliers.');
        setLoading(false);
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (id: string) => {
    console.log('Edit supplier with id:', id);
    navigate(`/edit-supplier/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSupplier(id);
      setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier.id !== id));
    } catch (error) {
      setError('Failed to delete supplier.');
      console.error('Error deleting supplier:', error);
    }
  };

  const handleOpenAddSupplier = () => {
    navigate('/add-supplier');
  };
  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
};
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: 'SNO', headerName: 'ID', width: 70 },
    { field: 'supplierName', headerName: 'Supplier Name', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'address', headerName: 'Address', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <EditButton onClick={() => handleEdit(params.id as string)}>
            <EditIcon fontSize="small" />
          </EditButton>
          <DeleteButton onClick={() => handleDelete(params.id as string)}>
            <DeleteIcon fontSize="small" />
          </DeleteButton>
        </div>
      )
    }
  ];

  const rows = filteredSuppliers.map((supplier, index) => ({
    id: supplier.id,
    SNO: index + 1,
    supplierName: supplier.supplierName,
    phone: supplier.phone,
    email: supplier.email,
    address: supplier.address,
  }));

  return (
    <Container>
      <Header>
        <h2>Supplier List</h2>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <SearchInput
            type="text"
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <AddButton onClick={handleOpenAddSupplier}>Add Supplier</AddButton>
        </div>
      </Header>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ height: 300, width: '100', marginLeft: '300px'}}>

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

export default SupplierTable;
