import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/product'; 

// Create a new product
export const createProduct = async (formData: FormData) => {
    try {
        const response = await axios.post(`${API_URL}/addproduct`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// Get all products
export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/getallproduct`);
       console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Update a product
export const updateProduct = async (id: string, formData: FormData) => {
    try {
        const response = await axios.put(`${API_URL}/editproduct/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Delete a product
export const deleteProduct = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteproduct/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
