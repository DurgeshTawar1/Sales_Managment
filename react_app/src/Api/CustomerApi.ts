
import axios from 'axios';

// Define the Customer type based on your Mongoose schema
// export interface Customer {
//     _id: number;
//     customerName: string;
//     customerContact: string;
//     gender: string;
//     customerEmail: string;
//     notes?: string;
//     AdvancedPaid: string;
//     discountRate: string;
//     location: string;
// }

// Define the CustomerFormData type for form submission
export interface CustomerFormData {
    id:number,
    customerName: string;
    customerContact: string;
    gender: string;
    customerEmail: string;
    notes: string;
    AdvancedPaid: string;
    discountRate: string;
    location: string;
}

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:4000/api/v1/customer';

// Fetch all customers
export const getAllCustomers = async (): Promise<CustomerFormData[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getallcustomer`);
        return response.data.data;
    } catch (error) {
        throw new Error(`Error fetching customers: ${(error as Error).message}`);
    }
};

// Create a new customer
export const createCustomer = async (customerData: CustomerFormData): Promise<CustomerFormData> => {
    try {
        console.log("Data sent to the backend:", customerData);
        const response = await axios.post(`${API_BASE_URL}/addcustomer`, customerData);
        console.log(response);
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
            throw new Error(`Error creating customer: ${error.response?.data?.message || error.message}`);
        } else {
            console.error('Unexpected error:', error);
            throw new Error(`Unexpected error creating customer: ${(error as Error).message}`);
        }
    }
};

// Update a customer by ID
export const updateCustomerById = async (id: string, updatedCustomer: Partial<CustomerFormData>): Promise<CustomerFormData> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/editcustomer/${id}`, updatedCustomer);
        return response.data.data;
    } catch (error) {
        throw new Error(`Error updating customer: ${(error as Error).message}`);
    }
};



export const deletecustomer = async (id: string): Promise<void>  => {
  try {
      const response = await axios.delete(`${API_BASE_URL}/deletecustomer/${id}`);
      return response.data;
  } catch (error) {
    throw new Error(`Error deleting customer: ${(error as Error).message}`);
  }
};
