import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import styled from 'styled-components';
import { getAllPurchases, deletePurchase,  } from '../Api/PurchaseApi'; // Import API functions
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
interface Purchase {
  _id: string;
  product: string;
  supplier: string;
  quantity: string;
  productCost: string;
  sellPrice: string;
  purchaseDate: string;
  productExpiry: string;
}

const PurchaseTable: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({  
    pageSize: 5,
      page: 0,

  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const data = await getAllPurchases();
        setPurchases(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load purchases.');
        setLoading(false);
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (id: string) => {
    console.log('Edit purchase with id:', id);
    navigate(`/edit-purchase/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePurchase(id);
      setPurchases(prevPurchases => prevPurchases.filter(purchase => purchase._id !== id));
    } catch (error) {
      setError('Failed to delete purchase.');
      console.error('Error deleting purchase:', error);
    }
  };

  const handleOpenAddPurchase = () => {
    navigate('/add-purchase');
  };
  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
};
  const filteredPurchases = purchases.filter(purchase =>
    purchase.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: 'SNO', headerName: 'ID', width: 70 },
    { field: 'ProductName', headerName: 'Product Name', width: 150 },
    { field: 'Supplier', headerName: 'Supplier', width: 150 },
    { field: 'Quantity', headerName: 'Quantity', width: 100 },
    {
      field: 'productCost',
      headerName: 'Product Cost',
      width: 150,
      // valueFormatter: ({ value }) => {
      //   return value ? `$${value.toFixed(2)}` : '$0.00';
      // }
    },
    {
      field: 'sellPrice',
      headerName: 'Sell Price',
      width: 150,
      // valueFormatter: ({ value }) => {
      //   return value ? `$${value.toFixed(2)}` : '$0.00';
      // }
    },
    { field: 'PurchaseDate', headerName: 'Purchase Date', width: 150 },
    { field: 'ProductExpiry', headerName: 'Expiry Date', width: 150 },
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

  const rows = filteredPurchases.map((purchase, index) => ({
    id: purchase._id,
    SNO: index + 1,
    ProductName: purchase.product,
    Supplier: purchase.supplier,
    Quantity: purchase.quantity,
    productCost: purchase.productCost,
    sellPrice: purchase.sellPrice,
    PurchaseDate: purchase.purchaseDate,
    ProductExpiry: purchase.productExpiry,
  }));

  return (
    <Container>
      <Header>
        <h2>Purchase List</h2>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <SearchInput
            type="text"
            placeholder="Search purchases..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <AddButton onClick={handleOpenAddPurchase}>Add Purchase</AddButton>
        </div>
      </Header>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ height: 400, width: '100', marginLeft: '300px'}}>

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

export default PurchaseTable;
