import axios from 'axios';


// Define the Purchase type
export interface Purchase {
    _id: string;
    product: string;
    supplier: string;
    quantity: string;
    productCost: string;
    sellPrice: string;
    purchaseDate: string;
    productExpiry: string;
  }
  
// Define the base URL for the API
const API_URL = 'http://localhost:4000/api/v1/purchase';

// Function to get all purchases
export const getAllPurchases = async (): Promise<Purchase[]> => {
    try {
        const response = await axios.get(`${API_URL}/getAllPurchase`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching all purchases');
    }
};

// Function to get a single purchase by ID
export const getPurchaseById = async (id: string): Promise<Purchase> => {
    try {
        const response = await axios.get(`${API_URL}/getPurchase/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching purchase with ID: ${id}`);
    }
};

// Function to add a new purchase
export const addPurchase = async (purchaseData: Omit<Purchase, '_id'>): Promise<void> => {

try {
        const response = await axios.post(`${API_URL}/addPurchase`, purchaseData);
        return response.data;
    } catch (error) {
        throw new Error('Error adding purchase');
    }
};

// Function to update an existing purchase
export const updatePurchase = async (id: string, purchase: Partial<Purchase>): Promise<Purchase> => {
    try {
        const response = await axios.put(`${API_URL}/updatePurchase/${id}`, purchase);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating purchase with ID: ${id}`);
    }
};

// Function to delete a purchase
export const deletePurchase = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/deletePurchase/${id}`);
    } catch (error) {
        throw new Error(`Error deleting purchase with ID: ${id}`);
    }
};
