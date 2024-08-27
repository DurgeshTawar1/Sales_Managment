import React, { useState } from 'react';
import "../styles/Expense.css";

const AddSupplier: React.FC = () => {
  const [expenseName, setExpenseName] = useState<string>('');
  const [cost, setCost] = useState<number>('');
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
      <h2 className="expense-heading">Add Supplier</h2>
      <div className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expenseName" className="form-label">Supplier Name</label>
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
            <label htmlFor="cost" className="form-label">Phone</label>
            <input
              type="number"
              id="cost"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="form-input"
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cost" className="form-label">Email</label>
            <input
              type="email"
              id="cost"
              value={cost}
            //   onChange={(e) => setCost(Number(e.target.value))}
              className="form-input"
              placeholder="Enter Your Email"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            {/* <label htmlFor="category" className="form-label">Income Source</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
            >
              <option value="">Select Income Source</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Utilities">Utilities</option>
              <option value="Others">Others</option>
            </select> */}
          </div>
         
        </div>
        
       
        <div className="form-group">
          <label htmlFor="details" className="form-label">Address</label>
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

export default AddSupplier;
