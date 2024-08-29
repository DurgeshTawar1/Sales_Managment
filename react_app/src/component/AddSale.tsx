import React, { useState } from 'react';
import "../styles/Sale.css";
import CustomerSelectPopup from './pop_up/ChooseCustomer';
interface Product {
  id: number;
  name: string;
  qty: number;
  price: number;
  total: number;
}

interface PaymentType {
  id: number;
  type: string;
}

const paymentTypes: PaymentType[] = [
  { id: 1, type: 'Credit Card' },
  { id: 2, type: 'Cash' },
  { id: 3, type: 'Bank Transfer' },
  { id: 4, type: 'PayPal' }
];

const AddSale: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
   const [customer, setCustomer] = useState<string | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [discountFlat, setDiscountFlat] = useState<number>(0);
  const [taxPercent, setTaxPercent] = useState<number>(0);
  const [taxFlat, setTaxFlat] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [customerPaid, setCustomerPaid] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [orderNo, setOrderNo] = useState<string>('');
  const [status, setStatus] = useState<string>('Pending');
  const [paymentType, setPaymentType] = useState<number | null>(null);
   const [image, setImage] = useState<File | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: products.length + 1,
      name: 'New Product',
      qty: 1,
      price: 0,
      total: 0,
    };
    setProducts([...products, newProduct]);
  };

  const handleProductChange = (index: number, field: string, value: any) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value, total: newProducts[index].qty * newProducts[index].price };
    setProducts(newProducts);
  };

  const handleSave = () => {
    console.log('Saving sale...');
    console.log('Selected Customer:', customer);
    if (image) {
      console.log('Selected Image:', image.name);
     
    }
   
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const calculateTotals = () => {
    const subtotal = products.reduce((acc, product) => acc + product.total, 0);
    const discount = discountPercent > 0 ? (subtotal * discountPercent / 100) : discountFlat;
    const tax = taxPercent > 0 ? (subtotal * taxPercent / 100) : taxFlat;
    const total = subtotal - discount + tax + shipping;
    return { subtotal, discount, tax, total };
  };

   const { total } = calculateTotals();
  const profit = total - customerPaid;

  return (
    <div className="card">
      <h2 className="heading">Add Sale</h2>
      <div className="form-row">
        <button className="button" onClick={() => setIsPopupOpen(true)}>Choose Customer</button>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
        />
      </div>
      <div className="form-row">
        <button className="button" onClick={handleAddProduct}>Add Product</button>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Detail</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                  className="input"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.qty}
                  onChange={(e) => handleProductChange(index, 'qty', Number(e.target.value))}
                  className="input"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handleProductChange(index, 'price', Number(e.target.value))}
                  className="input"
                />
              </td>
              <td>{product.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="totals">
        <div>Subtotal: ${subtotal.toFixed(2)}</div>
        <div>Discount: -${discount.toFixed(2)}</div>
        <div>Tax: +${tax.toFixed(2)}</div>
        <div>Total: ${total.toFixed(2)}</div>
      </div> */}
      <div className="discount-tax-shipping">
        <div>
          <label>Discount (%)</label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(Number(e.target.value))}
            className="input"
          />
          <label>Discount (Flat)</label>
          <input
            type="number"
            value={discountFlat}
            onChange={(e) => setDiscountFlat(Number(e.target.value))}
            className="input"
          />
        </div>
        <div>
          <label>Tax (%)</label>
          <input
            type="number"
            value={taxPercent}
            onChange={(e) => setTaxPercent(Number(e.target.value))}
            className="input"
          />
          <label>Tax (Flat)</label>
          <input
            type="number"
            value={taxFlat}
            onChange={(e) => setTaxFlat(Number(e.target.value))}
            className="input"
          />
        </div>
        <div>
          <label>Shipping</label>
          <input
            type="number"
            value={shipping}
            onChange={(e) => setShipping(Number(e.target.value))}
            className="input"
          />
        </div>
      </div>
      <div className="final-totals">
        <div>Customer Paid: 
          <input
            type="number"
            value={customerPaid}
            onChange={(e) => setCustomerPaid(Number(e.target.value))}
            className="input"
          />
        </div>
        <div>Profit: ${profit.toFixed(2)}</div>
      </div>
      <div className="notes-order">
        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="textarea"
        />
        <label>Order No</label>
        <input
          type="text"
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
          className="input"
        />
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="select"
        >
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
        <label>Payment Type</label>
        <select
          value={paymentType ?? ''}
          onChange={(e) => setPaymentType(Number(e.target.value))}
          className="select"
        >
          {paymentTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type}
            </option>
          ))}
        </select>
      </div>
      <div className="image-upload">
        <label>Upload Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="input"
        />
      </div>
      <div className="actions">
        <button className="button" onClick={handleSave}>Save</button>
        {/* <button className="button" onClick={() => setIsPopupOpen(false)}>Close</button> */}
      </div>
      {isPopupOpen && (
        <CustomerSelectPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSelect={(customer) => setCustomer(customer.name)}
        />
      )}
    </div>
  );
};

export default AddSale;
