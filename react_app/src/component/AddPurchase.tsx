import React, { useState } from 'react';
import "../styles/Purchase.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from './Loader'; // Import the Loader component
import { addPurchase, Purchase } from '../Api/PurchaseApi';

// Define the types for form data
interface FormData {
  productName: string;
  supplier: string;
  quantity: string;
  productCost: string;
  sellingPrice: string;
  purchaseDate: string;
  expiryDate: string;
}

const AddPurchase: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    supplier: '',
    quantity: '',
    productCost: '',
    sellingPrice: '',
    purchaseDate: '',
    expiryDate: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // setError(null);

    // Check for empty fields
    const requiredFields = [
      { name: 'productName', label: 'Product Name' },
      { name: 'supplier', label: 'Supplier' },
      { name: 'quantity', label: 'Quantity' },
      { name: 'productCost', label: 'Product Cost' },
      { name: 'sellingPrice', label: 'Selling Price' },
      { name: 'purchaseDate', label: 'Purchase Date' },
      { name: 'expiryDate', label: 'Expiry Date' }
    ];

    let hasError = false;

    requiredFields.forEach(field => {
       if (!formData[field.name as keyof FormData]) {
        toast.error(`${field.label} is required`);
        hasError = true;
      }
    });

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const purchaseData: Omit<Purchase, '_id'> = {
        product: formData.productName,
        supplier: formData.supplier,
        quantity: formData.quantity,
        productCost: formData.productCost ,
        sellPrice : formData.sellingPrice,
        purchaseDate: formData.purchaseDate,
        productExpiry: formData.expiryDate,
      };

      await addPurchase(purchaseData);
      toast.success('Purchase added successfully');
      setFormData({
        productName: '',
        supplier: '',
        quantity: '',
        productCost: '',
        sellingPrice: '',
        purchaseDate: '',
        expiryDate: '',
      });
    } catch (error) {
      toast.error('Failed to add purchase. Please try again.');
      console.error('Error adding purchase:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ marginTop: "60px", marginLeft: "300px" }}>
      <h2 style={{ display: "flex", alignItems: "center" }}>Add Purchase</h2>
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
        <ToastContainer />
      </form>
    </div>
  );
};

export default AddPurchase;
