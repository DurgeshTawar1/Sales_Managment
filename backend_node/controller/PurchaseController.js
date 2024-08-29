import Purchase from "../modles/PurchaseModel.js";


export const addPurchase = async(req, res)=>{
    try{
    const { product, supplier, quantity, productCost, sellPrice, purchaseDate, productExpiry } = req.body;
   
    const newPurchase = new Purchase({
        product,
        supplier,
        quantity,
        productCost,
        sellPrice,
        purchaseDate,
        productExpiry
    });

    await newPurchase.save();
    res.status(201).json({
        message: 'Purchase added successfully',
        purchase: newPurchase
    });

}catch(error){
    console.error(error);
        res.status(500).json({ message: 'Server error' });
}

};


//get expense route 
export const getAllPurchase = async(req, res)=> {
    try {
        const purchase = await Purchase.find();
        res.status(200).json(purchase);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get an expense by ID
export const getPurchaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const purchase = await Purchase.findById(id);

        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }

        res.status(200).json(purchase);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an expense
export const updatePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const { product, supplier, quantity, productCost, sellPrice, purchaseDate, productExpiry } = req.body;

        const updatedPurchase = await Purchase.findByIdAndUpdate(id, {
            product, 
            supplier, 
            quantity, 
            productCost, 
            sellPrice,
            purchaseDate,
            productExpiry
        }, { new: true });

        if (!updatePurchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }

        res.status(200).json({
            message: 'Purchase updated successfully',
            expense: updatedExpense
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an expense
export const deletePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPurchase = await Purchase.findByIdAndDelete(id);

        if (!deletePurchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }

        res.status(200).json({
            message: 'Purchase deleted successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

