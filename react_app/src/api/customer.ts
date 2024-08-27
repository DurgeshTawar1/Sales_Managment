import axios from 'axios';

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:4000/api/v1/customer';

// Define TypeScript interfaces for customer data
interface Customer {
  customerName: string;
  customerContact: number;
  gender: string;
  customerEmail: string;
  notes?: string;
  AdvancedPaid: string;
  discountRate: string;
  location: string;
  image: string;
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

// Create a new customer
export  const createCustomer = async (customer: Customer): Promise<ApiResponse<Customer>> => {
  try {
    const response = await axios.post<ApiResponse<Customer>>(`${API_BASE_URL}/addcustomer`, customer);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating customer: ${error.message}`);
  }
};

// Get all customers
export const getAllCustomers = async (): Promise<ApiResponse<Customer[]>> => {
  try {
    const response = await axios.get<ApiResponse<Customer[]>>(`${API_BASE_URL}/getallcustomer`);
    return response.data;
  } catch (error) {
    throw new Error(`Error retrieving customers: ${error.message}`);
  }
};

// Get a customer by ID
export const getCustomerById = async (id: string): Promise<ApiResponse<Customer>> => {
  try {
    const response = await axios.get<ApiResponse<Customer>>(`${API_BASE_URL}/getcustomer/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error retrieving customer: ${error.message}`);
  }
};

// Update a customer by ID
export const updateCustomerById = async (id: string, customer: Partial<Customer>): Promise<ApiResponse<Customer>> => {
  try {
    const response = await axios.put<ApiResponse<Customer>>(`${API_BASE_URL}/editcustomer/${id}`, customer);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating customer: ${error.message}`);
  }
};

// Delete a customer by ID
export const deleteCustomerById = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response = await axios.delete<ApiResponse<null>>(`${API_BASE_URL}/deletecustomer/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting customer: ${error.message}`);
  }
};



