import React, { useState } from 'react';
import axios from 'axios';
import Barcode from 'react-barcode'; // Import Barcode component

const AddProduct: React.FC = () => {
    // const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [barcode, setBarcode] = useState<string>(''); // State for barcode

    // Handle image file changes
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    // Handle barcode input changes
    const handleBarcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setBarcode(value); // Update barcode value
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Handle form submission
        const formData = new FormData(event.currentTarget);
        if (image) {
            formData.append('image', image);
        }

        // Replace this URL with your API endpoint
        axios.post('/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Product added successfully:', response.data);
        })
        .catch(error => {
            console.error('Error adding product:', error);
            setError('Failed to add product.'); // Update the error state
        });
    };

    return (
        <div className="page-container">
            <div className="form-container">
                <h1 className="form-heading">Add Product</h1>
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity Type</label>
                        <select id="quantity" name="quantity" required>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="SKU">SKU</label>
                        <select id="sku" name="sku" required>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="barcode">Barcode</label>
                        <input
                            type="text"
                            id="barcode"
                            name="barcode"
                            value={barcode}
                            onChange={handleBarcodeChange} // Handle barcode input
                            required
                        />
                    </div>
                    {barcode && ( // Display barcode if barcode is present
                <div className="barcode">
                    
                    <Barcode value={barcode} />
                </div>
            )}
                    <div className="form-group">
                        <label htmlFor="expiry">Product Expiry Date</label>
                        <textarea id="expiry" name="expiry"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" id="quantity" name="quantity" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="product-cost">Product Cost</label>
                        <input type="number" id="product-cost" name="product-cost" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sell-price">Sell Price</label>
                        <input type="number" id="sell-price" name="sell-price" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input type="text" id="category" name="category" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="limit">Product Limit</label>
                        <input type="number" id="limit" name="limit" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <input type="text" id="notes" name="notes" />
                    </div>
                    <h1>Store Details</h1>
                    <div className="form-group">
                        <label htmlFor="short-description">Short Description</label>
                        <input type="text" id="short-description" name="short-description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="detail-description">Detail Description</label>
                        <input type="text" id="detail-description" name="detail-description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="store-price">Store Price</label>
                        <input type="text" id="store-price" name="store-price" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>
                    <button type="submit" className="submit-btn">Save</button>
                </form>
            </div>
            {error && <p className="error-message">{error}</p>}
           
        </div>
    );
};

export default AddProduct;
