import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Paper, 
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  CircularProgress,
  Container
} from '@mui/material';
import { 
  DataGrid, 
  GridColDef, 
  GridRenderCellParams,
  GridToolbar,
//   GridValueGetterParams
} from '@mui/x-data-grid';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getAllCategories, deleteCategory } from '../Api/CategoryiesApi';

// Define the Category interface
interface Category {
  _id: string;
  categoryname: string;
  image: string;
  __v: number;
}

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

// Styled components
const PageContainer = styled(Container)`
  padding-top: 40px;
  padding-bottom: 40px;
`;

const BannerPaper = styled(Paper)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 16px;
  margin-top:-100px
  margin-bottom: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ContentPaper = styled(Paper)`
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  margin-top:-3px;
`;

const SearchBox = styled(Box)`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 25px;
  padding: 6px 16px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledDataGrid = styled(DataGrid)`
  border: none;
  width:1000px;
  display:flex
  margin-left:1 00px
  .MuiDataGrid-columnHeaders {
    background-color: ${theme.palette.primary.main};
    color: #fff;
  }
  .MuiDataGrid-cell {
    border-bottom: 1px solid #f0f0f0;
  }
  .MuiDataGrid-row:nth-of-type(even) {
    background-color: #fafafa;
  }
  .MuiDataGrid-row:hover {
    background-color: #f0f7ff;
  }
`;

const ImageCell = styled(Avatar)`
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const AllcategoryTable: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      if (Array.isArray(data) && data.every(item => item && item._id)) {
        setCategories(data);
      } else {
        throw new Error('Invalid data format');
      }
      setLoading(false);
    } catch (error) {
      setError('Failed to load categories.');
      setLoading(false);
      console.error('Error fetching categories:', error);
    }
  };
  

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-category/${id}`);
  };

  const handleDeleteConfirmation = (id: string) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete);
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryToDelete)
        );
        setSnackbarMessage('Category deleted successfully');
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage('Failed to delete category');
        setSnackbarOpen(true);
        console.error('Error deleting category:', error);
      }
    }
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const handleOpenAddCategory = () => {
    navigate('/add-category');
  };

  const columns: GridColDef[] = [
    { 
        field: '_id', 
        headerName: 'ID', 
        width: 220,
        valueGetter: (params: GridValueGetterParams) => params.row ? params.row._id : 'N/A'
      },
    { 
      field: 'image', 
      headerName: 'Image', 
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <ImageCell src={params.value} alt="Category" />
      ),
    },
    { 
      field: 'categoryname', 
      headerName: 'Category Name', 
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontWeight={500}>{params.value}</Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row._id)} color="primary" size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteConfirmation(params.row._id)} color="secondary" size="small">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const filteredCategories = categories.filter((category) =>
    category.categoryname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <PageContainer maxWidth="lg">
        <BannerPaper elevation={0}>
          <Box display="flex" alignItems="center" mb={2}>
            <CategoryIcon fontSize="large" style={{ marginRight: '16px' }} />
            <Typography variant="h1" component="h1">
              Category Management
            </Typography>
          </Box>
          <Typography variant="h6" style={{ opacity: 0.8 }}>
            Organize and control your product categories with ease
          </Typography>
        </BannerPaper>

        <ContentPaper elevation={0}>
          <Header>
            <Box>
              <Typography variant="h2" component="h2" gutterBottom>
                Categories
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {categories.length} categories found
              </Typography>
            </Box>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenAddCategory}
              >
                Add Category
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={fetchCategories}
              >
                Refresh
              </Button>
            </Box>
          </Header>
          
          <SearchBox mb={4}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              variant="standard"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{ disableUnderline: true }}
              fullWidth
            />
          </SearchBox>
          
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={400}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <StyledDataGrid
              rows={filteredCategories}
              columns={columns}
              autoHeight
              disableRowSelectionOnClick
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              getRowId={(row) => row._id}
              components={{
                Toolbar: GridToolbar,
              }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
            />
          )}
        </ContentPaper>

        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this category? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteCategory} color="secondary">Delete</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </PageContainer>
    </ThemeProvider>
  );
};

export default AllcategoryTable;