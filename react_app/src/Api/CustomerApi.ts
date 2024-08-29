// CustomerApi.ts
import axios from 'axios';

// Define the Customer type based on your Mongoose schema
export interface Customer {
  customerName: string;
  customerContact: number;
  gender: string;
  customerEmail: string;
  notes?: string; 
  AdvancedPaid: string;
  discountRate: string;
  location: string;
}

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:4000/api/v1/customer'; 

// Fetch all customers
export const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getallcustomer`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error fetching customers: ${(error as Error).message}`);
  }
};

export const createCustomer = async (customerFormData:FormData): Promise<Customer> => {
  try {
      console.log("FormData sent to the backend:", customerFormData);

      // Convert FormData to object for logging
      // const formDataObject: Record<string, any> = {};
      // customerData.forEach((value, key) => {
      //     formDataObject[key] = value;
      // });
      // console.log("FormData Object:", formDataObject);

      const response = await axios.post(`${API_BASE_URL}/addcustomer`, customerFormData);
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
export const updateCustomerById = async (id: string, updatedCustomer: Partial<Customer>): Promise<Customer> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/editcustomer/${id}`, updatedCustomer);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error updating customer: ${(error as Error).message}`);
  }
};

// Delete a customer by ID
export const deleteCustomerById = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/deletecustomer/${id}`);
  } catch (error) {
    throw new Error(`Error deleting customer: ${(error as Error).message}`);
  }
};
