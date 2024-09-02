import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAllPurchases, deletePurchase,  } from '../Api/PurchaseApi'; 
import { FaEdit, FaTrash } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  margin-left: 240px;
`;

const Banner = styled.div`
  background: linear-gradient(135deg, #6879db 0%, #2981b9 100%);
  color: white;
  padding: 40px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BannerTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  margin-bottom: 10px;
`;

const BannerSubtitle = styled.p`
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const AddButton = styled.button`
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #27ae60;
  }
`;

const Alert = styled.div`
  background-color: green;
  color: white;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AlertIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 10px;
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

const AlertDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ActionButton = styled.button`
  border: none;
  cursor: pointer;
  margin: 0 5px;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
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
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const data = await getAllPurchases();
        setPurchases(data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load purchases.');
        setLoading(false);
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, []);

 
  const handleEdit = (id: string) => {
    console.log('Edit purchase with id:', id);
    navigate(`/edit-purchase/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePurchase(id);
      setPurchases(prevPurchases => prevPurchases.filter(purchase => purchase._id !== id));
    } catch (error) {
      toast.error('Failed to delete purchase.');
      console.error('Error deleting purchase:', error);
    }
  };

  const handleOpenAddPurchase = () => {
    navigate('/add-purchase');
  };
 

  const columns = [
    { name: 'Purchase Name', selector: (row: Purchase) => row.product, sortable: true },
    { name: 'Contact No', selector: (row: Purchase) => row.supplier, sortable: true },
    { name: 'Quantity', selector: (row: Purchase) => row.quantity, sortable: true },
    { name: 'Product Cost', selector: (row: Purchase) => row.productCost, sortable: true },
    { name: 'Sell Price', selector: (row: Purchase) => row.sellPrice, sortable: true },
    { name: 'Expiry', selector: (row: Purchase) => row.productExpiry, sortable: true },
    // { name: 'purchaseDate', selector: (row: Purchase) => new Date(row.createdAt).toLocaleDateString(), sortable: true },
    {
      name: 'Actions',
      cell: (row: Purchase) => (
        <>
          <ActionButton onClick={() => handleEdit(row._id)}><FaEdit /></ActionButton>
          <ActionButton onClick={() => handleDelete(row._id)}><FaTrash /></ActionButton>
        </>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f1f8ff',
        borderBottomWidth: '2px',
        borderBottomColor: '#d1e8ff',
        fontWeight: 'bold',
      },
    },
    headCells: {
      style: {
        color: '#2c3e50',
        fontSize: '1rem',
        padding: '16px',
      },
    },
    rows: {
      style: {
        backgroundColor: '#ffffff',
        '&:nth-of-type(even)': {
          backgroundColor: '#f9f9f9',
        },
        '&:hover': {
          backgroundColor: '#e8f4ff',
          transition: 'background-color 0.3s ease',
        },
      },
    },
    cells: {
      style: {
        color: '#34495e',
        fontSize: '0.9rem',
        padding: '16px',
      },
    },
  };

  return (

    <Container>
    <Banner>
      <BannerTitle>Product Purchase</BannerTitle>
      <BannerSubtitle>Manage your Product Purchase efficiently</BannerSubtitle>
    </Banner>
    <ButtonContainer>
      <AddButton onClick={handleOpenAddPurchase}>Add Product</AddButton>
    </ButtonContainer>

    <Alert>
        <AlertIcon>⚠️</AlertIcon>
        <AlertContent>
          <AlertTitle>Customer Update</AlertTitle>
          <AlertDescription>
            New Customer have been added to the inventory. Please review and update stock levels as needed.
          </AlertDescription>
        </AlertContent>
      </Alert>
      {loading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>


) : (
  <DataTable
    columns={columns}
    data={purchases}
    pagination
    paginationPerPage={5}
    paginationRowsPerPageOptions={[5, 10, 15]}
    highlightOnHover
    responsive
    customStyles={customStyles}
  />
)}
</Container>
  );
};

export default PurchaseTable;
