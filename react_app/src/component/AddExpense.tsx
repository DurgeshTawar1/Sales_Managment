import React, { useState } from 'react';
import "../styles/Expense.css";

const ExpenseForm: React.FC = () => {
  const [expenseName, setExpenseName] = useState<string>('');
  const [cost, setCost] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>(''); // New state for custom category
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [details, setDetails] = useState<string>('');

  const handleSave = () => {
    // Implement save functionality here
    console.log({
      expenseName,
      cost,
      category: category || customCategory, // Use custom category if category is not selected
      date,
      details,
    });
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
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
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
    </div>
  );
};

export default ExpenseForm;
