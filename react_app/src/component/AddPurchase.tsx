import React, { useEffect, useState } from 'react';
import "../styles/Purchase.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from './Loader'; // Import the Loader component
import { addPurchase, Purchase } from '../Api/PurchaseApi';
import { getAllProducts } from '../Api/ProductApi';
import { getAllSuppliers, Supplier } from '../Api/SupplierApi';

interface Product {
  _id: string; // Assuming this is the unique identifier
  productName: string;
  quantityType: string;
  sku: string;
  barcode: number;
  productExpiry: string;
  quantity: string;
  productCost: number;
  sellPrice: number;
  category: string;
  productLimitNumber: number;
  Notes?: string;
  shortDescription?: string;
  detailDescription?: string;
  storePrice?: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}


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
  const [product, setProduct] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =  useState<string>('');

  const [supplier, setSupplier] = useState<Supplier[]>([]); 
  const [selectedSupplier, setSelectedSupplier] =  useState<string>('');



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
      setSelectedProduct('');
    } catch (error) {
      toast.error('Failed to add purchase. Please try again.');
      console.error('Error adding purchase:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        setProduct(response.data); // Use response.data to set the data
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await getAllSuppliers();
        setSupplier(response); // Use response.data to set the data
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierData();
  }, []);


 
//   const  handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedProduct(event.target.value);
// };

const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedProductId = event.target.value;
  setSelectedProduct(selectedProductId);

  const selectedProduct = product.find(products => products._id === selectedProductId);

  if (selectedProduct) {
    setFormData({
      ...formData,
      productName: selectedProduct.productName,
      productCost: selectedProduct.productCost.toString(),
      sellingPrice: selectedProduct.sellPrice.toString(),
    });
  } else {
    setFormData({
      ...formData,
      productName: '',
      productCost: '',
      sellingPrice: '',
    });
  }
};

const handleSupplierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedSupplier(event.target.value);
};
  return (
    <div className="card" style={{ marginTop: "60px", marginLeft: "300px" }}>
      <h2 style={{ display: "flex", alignItems: "center" }}>Add Purchase</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
          <label htmlFor="product">Product</label>
                        <select
                            id="product"
                            name="product"
                            value={selectedProduct}
                            onChange={handleChangeProduct}
                            required
                        >
                            <option value="">Select</option>
                            {product.map(products => (
                                <option key={products._id} value={products._id}>
                                    {products.productName}
                                </option>
                            ))}
                        </select>
         
          </div>
          <div className="form-group">
            <label className="label" htmlFor="supplier">Supplier</label>
            <select
                            id="supplier"
                            name="supplier"
                            value={selectedSupplier}
                            onChange={handleSupplierChange}
                            required
                        >
                            <option value="">Select</option>
                            {supplier.map(suppliers => (
                                <option key={suppliers._id} value={suppliers._id}>
                                    {suppliers.supplierName}
                                </option>
                            ))}
                        </select>
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
