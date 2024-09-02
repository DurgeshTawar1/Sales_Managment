import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteSale, fetchAllSales, Sale } from '../Api/SaleApi';
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
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
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

const SalesTable: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Sale[]>([]);

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleEdit = (id: string) => {
    console.log(`Edit product with id: ${id}`);
    // Implement edit functionality
  };

  const handleDelete = async(id: string) => {
    try {
      await deleteSale(id);
      toast.success("Sale Deleted Successfully!")
      setData(data.filter(product => product._id !== id)); // Remove deleted product from state
    } catch (error) {
      toast.error("Oops, something went wrong!")
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllSales();
        setData(response); // Use response.data to set the data if necessary
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { name: 'Customer Name', selector: (row: Sale) => row.customer, sortable: true },
    {
      name: 'Image',
      cell: (row: Sale) => (
        <img
          src={row.uploadImage}
          alt={row.customer} // Use a more descriptive alt text
          style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
        />
      ),
      sortable: false, 
    },
    { name: 'Price', selector: (row: Sale) => row.price[0], sortable: true }, // Assuming `price` is an array; adjust if necessary
    { name: 'Discount', selector: (row: Sale) => row.discount, sortable: true },
    { name: 'Status', selector: (row: Sale) => row.status, sortable: true },
    {
      name: 'Actions',
      cell: (row: Sale) => (
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
        <BannerTitle>Sales Inventory</BannerTitle>
        <BannerSubtitle>Manage your sales efficiently</BannerSubtitle>
      </Banner>

      <ButtonContainer>
        <AddButton onClick={handleAddProduct}>Add Sale</AddButton>
      </ButtonContainer>

      <Alert>
        <AlertIcon>⚠️</AlertIcon>
        <AlertContent>
          <AlertTitle>Inventory Update</AlertTitle>
          <AlertDescription>
            New Sale have been added to the inventory. Please review and update stock levels as needed.
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
          data={data}
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

export default SalesTable;
