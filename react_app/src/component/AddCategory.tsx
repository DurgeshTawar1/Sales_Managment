import React, { useState, useEffect } from 'react';

import "../styles/Category.css";
import { toast } from 'react-toastify'
import getCategoryById, { createCategory } from '../Api/CategoryiesApi';

interface CategoryFormProps {
    id?: string; 
}

const Category: React.FC<CategoryFormProps> = ({ id }) => {
    const [categoryName, setCategoryName] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    // const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            // Load existing category data if editing
            const loadCategory = async () => {
                try {
                    const category = await getCategoryById(id);
                    setCategoryName(category.categoryname);
                    setImagePreview(category.image);
                } catch (error) {
                    toast.error("Failed to load category data.")
                    setError('Failed to load category data.');
                    console.error('Error loading category:', error);
                }
            };
            loadCategory();
        }
    }, [id]);

    const handleCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value);
    };

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!categoryName || !image) {
            setError('Please provide both category name and image.');
            return;
        }

        const formData = new FormData();
        formData.append('categoryname', categoryName);
        formData.append('image', image);

        try {
            if (id) {
                // await updateCategory(id, formData);
                toast.success('Category updated successfully!');
            } else {
                await createCategory(formData);
                toast.success('Category created successfully!');
            }
            setCategoryName('');
            setImage(null);
            setImagePreview(null);
            setError(null);
        } catch (error) {
            toast.error('Failed to save category. Please try again.');
            console.error('Error saving category:', error);
        }
    };

    return (
        <div className="category-card-container">
            <div className="category-card">
                <h2>{id ? 'Edit Category' : 'Add Category'}</h2>
                <form className="category-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="category-name">Category Name</label>
                        <input
                            type="text"
                            id="category-name"
                            value={categoryName}
                            onChange={handleCategoryNameChange}
                            placeholder="Enter category name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image-upload">Upload Image</label>
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            required={!id} // Make it required if adding a new category
                        />
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Category" />
                            </div>
                        )}
                    </div>
                    <button type="submit">{id ? 'Update' : 'Save'}</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {/* {success && <p className="success-message">{success}</p>} */}
            </div>
        </div>
    );
};

export default Category;
