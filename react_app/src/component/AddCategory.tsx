import React, { useState } from 'react';
import "../styles/Category.css"
const Category: React.FC = () => {
    const [categoryName, setCategoryName] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

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

    return (
        <div className="category-card-container">
            <div className="category-card">
                <h2>Category Card</h2>
                <div className="category-form">
                    <div className="form-group">
                        <label htmlFor="category-name">Category Name</label>
                        <input
                            type="text"
                            id="category-name"
                            value={categoryName}
                            onChange={handleCategoryNameChange}
                            placeholder="Enter category name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image-upload">Upload Image</label>
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Category" />
                            </div>
                        )}
                    </div>
                </div>
                <button>Save</button>
            </div>
        </div>
    );
};

export default Category;
