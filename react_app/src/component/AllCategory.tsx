import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllCategories } from '../Api/CategoryiesApi';

interface Category {
    categoryname: string;
    image: string;
}
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

const AllcategoryTable: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({  
      pageSize: 5,
        page: 0,

    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load categories.');
                setLoading(false);
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = (id: number) => {
        console.log('Edit category with id:', id);
        // Implement edit functionality here
    };

    // const handleDelete = async (id: number) => {
    //     try {
    //         console.log(id)
    //         // Convert number to string if needed
    //         await deleteCategory(id); 
    //         setCategories((prevCategories) =>
    //             prevCategories.filter((category) => category.id !== id)
    //         ); 
    //     } catch (error) {
    //         setError('Failed to delete category.');
    //         console.error('Error deleting category:', error);
    //     }
    // };
    

    const navigate = useNavigate();

    const handleOpenAddCategory = () => {
        navigate("/add-category");
    };
    const handlePaginationModelChange = (newModel: GridPaginationModel) => {
        setPaginationModel(newModel);
    };


    const filteredCategories = categories.filter(category => 
        (category.categoryname ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns: GridColDef[] = [
        { field: 'SNO', headerName: 'SoNO', width: 70 },
        { field: 'categoryname', headerName: 'Categoryname', width: 150 },
        {
            field: 'image',
            headerName: 'Image',
            width: 200,
            renderCell: (params) => (
                <img src={params.value} alt="Category"   style={{
                    width: 'auto',
                    height: '100%',
                    borderRadius: '10px', // Rounded corners
                    border: '1px solid #ddd', // Light border
                    objectFit: 'cover', // Cover the container while maintaining aspect ratio
                }} />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <EditButton onClick={() => handleEdit(params.id as number)}>
                        <EditIcon fontSize="small" />
                    </EditButton>
                    <DeleteButton>
                        <DeleteIcon fontSize="small" />
                    </DeleteButton>
                </div>
            )
        }
    ];

    const rows = filteredCategories.map((category, index) => ({
        id: index + 1, 
        SNO: index + 1,
        categoryname: category.categoryname,
        image: category.image
    }));
    
    

    return (
        <Container>
            <Header>
                <h2>Category List</h2>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <SearchInput
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <AddButton onClick={handleOpenAddCategory}>Add Category</AddButton>
                </div>
            </Header>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ height: 400, width: '70%', marginLeft: '300px' }}>
            <DataGrid
                    rows={rows}
                    columns={columns}
                    paginationModel={paginationModel}
                    pageSizeOptions={[5, 10, 15]}
                    onPaginationModelChange={handlePaginationModelChange}
                    checkboxSelection
                    sx={{ overflow: 'clip' }}
                />

            </div>
        </Container>
    );
};

export default AllcategoryTable;
