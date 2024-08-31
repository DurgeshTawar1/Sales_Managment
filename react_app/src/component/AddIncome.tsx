import React, { useState } from 'react';
import { addIncome } from '../Api/IncomeApi';
import '../styles/Expense.css';
import { toast } from 'react-toastify';

// Define the type for income data
interface Income {
  incomeName: string;
  amount: number;
  incomeSource: string;
  date: string;
  typeIncomeSource: string;
  incomeDetails?: string;
}

const AddIncome: React.FC = () => {
  const [incomeName, setIncomeName] = useState<string>('');
  const [amount, setAmount] = useState<number | ''>(''); // Handle initial state as empty
  const [incomeSource, setIncomeSource] = useState<string>('');
  const [customIncomeSource, setCustomIncomeSource] = useState<string>(''); 
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [incomeDetails, setIncomeDetails] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const handleSave = async () => {
    // Handle empty or invalid amount cases
    if (amount === '' || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    const incomeData: Income = {
      incomeName,
      amount: Number(amount), // Ensure amount is a number
      incomeSource: incomeSource || customIncomeSource,
      date,
      typeIncomeSource: incomeSource || customIncomeSource,
      incomeDetails
    };

    try {
      await addIncome(incomeData);
      toast.success("Income added successfully")
      setSuccessMessage('Income added successfully!');
      setIncomeName("");
      setAmount("");
      setIncomeSource("");
      setDate("");
      setIncomeDetails("");
      setIncomeDetails("");
      setError(null);
    } catch (err) {
      toast.error('Failed to add income. Please try again.');
      setSuccessMessage(null);
    }
  };

  return (
    <div className="expense-card">
      <h2 className="expense-heading">Add Income</h2>
      <div className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="incomeName" className="form-label">Income Name</label>
            <input
              type="text"
              id="incomeName"
              value={incomeName}
              onChange={(e) => setIncomeName(e.target.value)}
              className="form-input"
              placeholder="Enter income name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount === '' ? '' : amount} // Handle empty state
              onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
              className="form-input"
              placeholder="Enter amount"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="incomeSource" className="form-label">Income Source</label>
            <select
              id="incomeSource"
              value={incomeSource}
              onChange={(e) => setIncomeSource(e.target.value)}
              className="form-input"
            >
              <option value="">Select Income Source</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Utilities">Utilities</option>
              <option value="Others">Others</option>
            </select>
          </div>
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
          <div className="form-group">
            <label htmlFor="customIncomeSource" className="form-label">Type your Income Source</label>
            <input
              type="text"
              id="customIncomeSource"
              value={customIncomeSource}
              onChange={(e) => setCustomIncomeSource(e.target.value)}
              className="form-input"
              placeholder="Type custom income source"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="incomeDetails" className="form-label">Income Details</label>
          <textarea
            id="incomeDetails"
            value={incomeDetails}
            onChange={(e) => setIncomeDetails(e.target.value)}
            className="form-input"
            placeholder="Enter details about the income"
          />
        </div>
        <button className="save-button" onClick={handleSave}>Save</button>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default AddIncome;
