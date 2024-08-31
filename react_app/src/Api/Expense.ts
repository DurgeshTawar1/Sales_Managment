import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1/expense'; 

// Create a new income
export const addExpense = async (expense: {
    expenseName: string;
    cost: number;
    category: string;
    date: string;
    typeCategory: string;
    expenseDetails: string;
}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/addExpense`, expense);
        return response.data;
    } catch (error) {
        throw new Error(`Error adding Expense: ${error}`);
    }
};

// Get all incomes
export const getAllExpense = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAllExpense`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching all Expense: ${error}`);
    }
};

// Get income by ID
export const getExpenseById = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getExpense/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching expense by ID: ${error}`);
    }
};

// Update income by ID
export const updateExpense = async (id: string, expense: {
    expenseName: string;
    cost: number;
    category: string;
    date: string;
    typeCategory: string;
    expenseDetails: string;
}) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateExpense/${id}`, expense);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating income: ${error}`);
    }
};

// Delete income by ID
export const deleteExpense = async (id: string) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/deleteExpense/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting expense: ${error}`);
    }
};
