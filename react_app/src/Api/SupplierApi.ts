import axios from 'axios';

// Define the base URL for the API
const API_URL =  "http://localhost:4000/api/v1/supplier" 

// Define the Supplier interface (adjust fields as needed)
export interface Supplier {
   _id: string;
  supplierName: string;
  phone: number;
  email: string;
  address: string;
}

// Function to add a new supplier
export const addSupplier = async (supplier: Supplier): Promise<Supplier> => {
  const response = await axios.post(`${API_URL}/addSupplier`, supplier);
  return response.data;
};

// Function to get all suppliers
export const getAllSuppliers = async (): Promise<Supplier[]> => {
  const response = await axios.get(`${API_URL}/getAllSupplier`);
  return response.data;
};

// Function to get a supplier by ID
export const getSupplierById = async (id: string): Promise<Supplier> => {
  const response = await axios.get(`${API_URL}/getSupplier/${id}`);
  return response.data;
};

// Function to update a supplier
export const updateSupplier = async (id: string, supplier: Supplier): Promise<Supplier> => {
  const response = await axios.put(`${API_URL}/updateSupplier/${id}`, supplier);
  return response.data;
};

// Function to delete a supplier
export const deleteSupplier = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/deleteSupplier/${id}`);
};
