import React, { useEffect, useState } from 'react';
import { createProduct, getAllProducts } from '../Api/ProductApi';
import Barcode from 'react-barcode';
import { toast } from 'react-toastify';
 
interface Category {
    _id: string;
    categoryname: string;
}
 
const AddProduct: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [barcode, setBarcode] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
 
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
 
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const fetchedCategories = await getAllCategories();
    //             // toast.success("Product Added Successfulliy")
    //             setCategories(fetchedCategories);
               
    //         } catch (error) {
    //             console.error('Error fetching categories:', error);
    //             setError('Failed to fetch categories.');
    //         }
    //     };
 
    //     fetchCategories();
    // }, []);
 
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getAllProducts();
                // toast.success("Product Added Successfulliy")
                
                setCategories(fetchedCategories);

               
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to fetch categories.');
            }
        };
 
        fetchCategories();
    }, []);


    
 
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };
 
    const handleBarcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setBarcode(value);
    };
 
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
 
        const formData = new FormData(event.currentTarget);
 
        if (image) {
            formData.set('image', image);
        }
 
        try {
            const response = await createProduct(formData);
            // console.log('Product added successfully:', response.data);
            // You might want to add some success feedback here
            console.log(response);
            toast.success("Product Successfulliy!")
            // setCategories('');
        } catch (error) {
            toast.error('Error adding product:');
            setError('Failed to add product.');
            console.log(error);
        }
    };
 
    return (
        <div className="page-container">
            <div className="form-container">
                <h1 className="form-heading">Add Product</h1>
                <form className="product-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input type="text" id="name" name="productName" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantityType">Quantity Type</label>
                        <select id="quantityType" name="quantityType" required>
                            <option value="">Select</option>
                            <option value="unit">Unit</option>
                            <option value="kg">Kg</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sku">SKU</label>
                        <input type="text" id="sku" name="sku" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="barcode">Barcode</label>
                        <input
                            type="text"
                            id="barcode"
                            name="barcode"
                            value={barcode}
                            onChange={handleBarcodeChange}
                            required
                        />
                    </div>
                    {barcode && (
                        <div className="barcode">
                            <Barcode value={barcode} />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="productExpiry">Product Expiry Date</label>
                        <input type="date" id="productExpiry" name="productExpiry" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" id="quantity" name="quantity" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productCost">Product Cost</label>
                        <input type="number" id="productCost" name="productCost" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sellPrice">Sell Price</label>
                        <input type="number" id="sellPrice" name="sellPrice" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            required
                        >
                            <option value="">Select</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.categoryname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productLimitNumber">Product Limit Number</label>
                        <input type="number" id="productLimitNumber" name="productLimitNumber" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <input type="text" id="notes" name="notes" />
                    </div>
                    <h2>Store Details</h2>
                    <div className="form-group">
                        <label htmlFor="shortDescription">Short Description</label>
                        <input type="text" id="shortDescription" name="StoreDetails.shortDescription" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="detailDescription">Detail Description</label>
                        <input type="text" id="detailDescription" name="StoreDetails.detailDescription" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="storePrice">Store Price</label>
                        <input type="text" id="storePrice" name="StoreDetails.storePrice" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Upload Image</label>
                        <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
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