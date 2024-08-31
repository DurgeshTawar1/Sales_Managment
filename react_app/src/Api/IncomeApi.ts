import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1/income'; 

// Create a new income
export const addIncome = async (income: {
    incomeName: string;
    amount: number;
    incomeSource: string;
    date: string;
    typeIncomeSource: string;
    incomeDetails?: string;
}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/addIncome`, income);
        return response.data;
    } catch (error) {
        throw new Error(`Error adding income: ${error}`);
    }
};

// Get all incomes
export const getAllIncome = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAllIncome`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching all incomes: ${error}`);
    }
};

// Get income by ID
export const getIncomeById = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getIncome/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching income by ID: ${error}`);
    }
};

// Update income by ID
export const updateIncome = async (id: string, income: {
    incomeName: string;
    amount: number;
    incomeSource: string;
    date: string;
    typeIncomeSource: string;
    incomeDetails?: string;
}) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateIncome/${id}`, income);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating income: ${error}`);
    }
};

// Delete income by ID
export const deleteIncome = async (id: string) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/deleteIncome/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting income: ${error}`);
    }
};
