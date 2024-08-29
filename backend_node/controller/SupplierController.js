import Supplier from "../modles/SupplierModel.js";


export const addSupplier = async(req, res)=>{
    try{
        console.log(req.body)
    const { supplierName, phone, contactPersonName, email, address } = req.body;
   
    const newSupplier = new Supplier({
        supplierName,
        phone,
        contactPersonName,
        email,
        address,
    });

    await newSupplier.save();
    res.status(201).json({
        message: 'Supplier added successfully',
        supplier: newSupplier
    });

}catch(error){
    console.error(error);
        res.status(500).json({ message: 'Server error' });
}

};


//get expense route 
export const getAllSupplier = async(req, res)=> {
    try {
        const supplier = await Supplier.find();
        res.status(200).json(supplier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get an expense by ID
export const getSupplierById = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findById(id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json(supplier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an expense
export const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { supplierName, phone, contactPersonName, email, address } = req.body;

        const updateSupplier = await Supplier.findByIdAndUpdate(id, {
            supplierName,
            phone,
            contactPersonName,
            email,
            address,
        }, { new: true });

        if (!updateSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json({
            message: 'Supplier updated successfully',
            expense: updatedExpense
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an expense
export const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSupplier = await Supplier.findByIdAndDelete(id);

        if (!deleteSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json({
            message: 'Supplier deleted successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

