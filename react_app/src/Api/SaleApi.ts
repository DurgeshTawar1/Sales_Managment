import axios from 'axios';

// Define the base URL of your API
const BASE_URL = 'http://localhost:4000/api/v1/sale'; // Update this to your server URL

// Define the type for Sale
export interface Sale {
  _id: string;
  customer: string;
  date: string;
  newProduct: string[];
  qty: number[];
  price: number[];
  total: number;
  discount: number;
  tax: number;
  shipping: number;
  discountFlat: number;
  taxFlat: number;
  customerPaid: number;
  notes: string;
  orderNo: string;
  status: string;
  paymentType: number;
  uploadImage: string;
}

// Create a new sale
export const createSale = async (saleData: Omit<Sale, '_id'>): Promise<Sale> => {
  try {
    const response = await axios.post(`${BASE_URL}/addsale`, saleData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Adjust if necessary
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating sale:', error);
    throw error;
  }
};

export const fetchAllSales = async (): Promise<Sale[]> => {
  try {
    const response = await axios.get<Sale[]>(`${BASE_URL}/getAllSale`);
    console.log(response.data);
    return response.data; // returns Sale[] (array of sales)
  } catch (error) {
    console.error('Error fetching all sales:', error);
    throw error;
  }
};

// Get a single sale by ID
export const fetchSaleById = async (id: string): Promise<Sale> => {
  try {
    const response = await axios.get(`${BASE_URL}/getsale/${id}`);
    // console.log("data",response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching sale by ID:', error);
    throw error;
  }
};

// Update a sale by ID
export const updateSale = async (id: string, saleData: Partial<Omit<Sale, '_id'>>): Promise<Sale> => {
  try {
    const response = await axios.put(`${BASE_URL}/updatesale/${id}`, saleData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Adjust if necessary
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating sale:', error);
    throw error;
  }
};

// Delete a sale by ID
export const deleteSale = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/deletesale/${id}`);
  } catch (error) {
    console.error('Error deleting sale:', error);
    throw error;
  }
};
