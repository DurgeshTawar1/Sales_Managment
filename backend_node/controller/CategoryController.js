import Category from '../modles/CategoryModel.js';
import cloudinary from '../config/cloudinaryConfig.js';
import fs from 'fs';



// Create a new category
export const createCategory = async (req, res) => {
    try {
        console.log(req.body);
        
        const { categoryname } = req.body;

        // Check if the category already exists
        const existingCategory = await Category.findOne({ categoryname });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: 'categories',
            transformation: [
                { width: 500, height: 500, crop: 'limit' },
                { fetch_format: 'auto', quality: 'auto' }
            ]
        });

        // Delete the file from the server after uploading to Cloudinary
        fs.unlinkSync(req.file.path);

        // Create and save the new category
        const category = new Category({
            categoryname,
            image: uploadResult.secure_url
        });

        await category.save();

        res.status(201).json({
            message: 'Category created successfully',
            category
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryname, image } = req.body;

        const updateData = { categoryname };

        if (image) {
            // Upload the new image to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(image, {
                folder: 'categories',
                transformation: [
                    { width: 500, height: 500, crop: 'limit' },
                    { fetch_format: 'auto', quality: 'auto' }
                ]
            });

            updateData.image = uploadResult.secure_url;
        }

        const category = await Category.findByIdAndUpdate(id, updateData, { new: true });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({
            message: 'Category updated successfully',
            category
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const objectId = mongoose.Types.ObjectId(id);
        const category = await Category.findByIdAndDelete(objectId);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({
            message: 'Category deleted successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
