import axios from 'axios';

// Define the base URL of your API
const API_BASE_URL = 'http://localhost:4000/api/v1/category';

// Define types for Category
export interface Category {
    _id:number,
    categoryname: string;
    image: string;
}

// Create a new category
 const createCategory = async (categoryData: FormData): Promise<Category> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/addCategory`, categoryData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("API response:", response.data);

        // Adjust this based on actual response structure
        return response.data.data as Category; // Adjust according to your API's response format
    } catch (error) {
        throw new Error(`Error creating category: ${(error as Error).message}`);
    }
};

// Get all categories
 const getAllCategories = async (): Promise<Category[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getallcategory`);
        // Adjust this based on actual response structure
        return response.data as Category[]; // Adjust according to your API's response format
    } catch (error) {
        throw new Error(`Error fetching categories: ${(error as Error).message}`);
    }
};

// Get a category by ID
 const getCategoryById = async (id: string): Promise<Category> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
        // Adjust this based on actual response structure
        return response.data as Category; // Adjust according to your API's response format
    } catch (error) {
        throw new Error(`Error fetching category: ${(error as Error).message}`);
    }
};

// Update a category
 const updateCategory = async (id: string, categoryData: Partial<Category>): Promise<Category> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/editcategory/${id}`, categoryData);
        // Adjust this based on actual response structure
        return response.data.data as Category; // Adjust according to your API's response format
    } catch (error) {
        throw new Error(`Error updating category: ${(error as Error).message}`);
    }
};

// Delete a category
 const deleteCategory = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/deletecategory/${id}`);
    } catch (error) {
        throw new Error(`Error deleting category: ${(error as Error).message}`);
    }
};
export default getCategoryById;
export {createCategory, updateCategory, getAllCategories,  deleteCategory};
