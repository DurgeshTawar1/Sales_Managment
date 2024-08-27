import React, { useState } from 'react';
import "../styles/Purchase.css";
import Loader from './Loader'; // Import the Loader component

// Define the types for form data
interface FormData {
  productName: string;
  supplier: string;
  quantity: number;
  productCost: number;
  sellingPrice: number;
  purchaseDate: string;
  expiryDate: string;
}

const AddPurchase: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    supplier: '',
    quantity: 0,
    productCost: 0,
    sellingPrice: 0,
    purchaseDate: '',
    expiryDate: '',
  });

  const [loading, setLoading] = useState<boolean>(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' || name === 'productCost' || name === 'sellingPrice' ? +value : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      console.log('Form Data Submitted:', formData);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="card">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label" htmlFor="productName">Product Name</label>
            <input
              className="input"
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="supplier">Supplier</label>
            <input
              className="input"
              type="text"
              id="supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Enter supplier name"
              required
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="quantity">Quantity</label>
            <input
              className="input"
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label" htmlFor="productCost">Product Cost</label>
            <input
              className="input"
              type="number"
              id="productCost"
              name="productCost"
              value={formData.productCost}
              onChange={handleChange}
              placeholder="Enter product cost"
              required
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="sellingPrice">Selling Price</label>
            <input
              className="input"
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              placeholder="Enter selling price"
              required
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="purchaseDate">Purchase Date</label>
            <input
              className="input"
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label" htmlFor="expiryDate">Expiry Date</label>
            <input
              className="input"
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
        {loading && <Loader />} {/* Display loader when loading */}
      </form>
    </div>
  );
};

export default AddPurchase;
