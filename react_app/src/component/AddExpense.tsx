import React, { useState } from 'react';
import "../styles/Expense.css";
import { addExpense } from '../Api/Expense';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseForm: React.FC = () => {
  const [expenseName, setExpenseName] = useState<string>('');
  const [cost, setCost] = useState<number | ''>(''); // Allow empty state
  const [category, setCategory] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [details, setDetails] = useState<string>('');

  const handleSave = async () => {
    if (expenseName.trim() === '' || cost === '' || cost <= 0 || (category === '' && customCategory.trim() === '')) {
      toast.error('Please fill out all required fields correctly.');
      return;
    }

    const expenseData = {
      expenseName,
      cost: Number(cost),
      category: category || customCategory,
      date,
      typeCategory: category || customCategory,
      expenseDetails: details,
    };

    try {
      await addExpense(expenseData);
      toast.success('Expense added successfully!');
      // Clear form fields after successful addition
      setExpenseName('');
      setCost('');
      setCategory('');
      setCustomCategory('');
      setDate(new Date().toISOString().split('T')[0]);
      setDetails('');
    } catch (error) {
      toast.error('Failed to add expense. Please try again.');
    }
  };

  return (
    <div className="expense-card">
      <h2 className="expense-heading">Add Expense</h2>
      <div className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expenseName" className="form-label">Expense Name</label>
            <input
              type="text"
              id="expenseName"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              className="form-input"
              placeholder="Enter expense name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cost" className="form-label">Cost</label>
            <input
              type="number"
              id="cost"
              value={cost === '' ? '' : cost} // Handle empty state
              onChange={(e) => setCost(e.target.value ? Number(e.target.value) : '')}
              className="form-input"
              placeholder="Enter cost"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
            >
              <option value="">Select Category</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Utilities">Utilities</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="customCategory" className="form-label">Custom Category</label>
            <input
              type="text"
              id="customCategory"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="form-input"
              placeholder="Type custom category"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="details" className="form-label">Expense Details</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="form-input"
            placeholder="Enter details about the expense"
          />
        </div>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default ExpenseForm;
