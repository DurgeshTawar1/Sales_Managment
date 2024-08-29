import Income from "../modles/IncomeModel.js";

export const addIncome = async(req, res)=>{
    try{
    const { incomeName, amount, incomeSource, date, typeIncomeSource, incomeDetails } = req.body;
   
    const newIncome = new Income({
        incomeName,
        amount,
        incomeSource,
        date,
        typeIncomeSource,
        incomeDetails
    });

    await newIncome.save();
    res.status(201).json({
        message: 'income added successfully',
        income: newIncome
    });

}catch(error){
    console.error(error);
        res.status(500).json({ message: 'Server error' });
}

};


//get expense route 
export const getAllIncome = async(req, res)=> {
    try {
        const income = await Income.find();
        res.status(200).json(income);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get an expense by ID
export const getIncomeById = async (req, res) => {
    try {
        const { id } = req.params;
        const income = await Income.findById(id);

        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json(income);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an expense
export const updateIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const { incomeName, amount, incomeSource, date, typeIncomeSource, incomeDetails } = req.body;

        const updateIncome = await Income.findByIdAndUpdate(id, {
            incomeName,
            amount,
            incomeSource,
            date,
            typeIncomeSource,
            incomeDetails
        }, { new: true });

        if (!updateIncome) {
            return res.status(404).json({ message: 'income not found' });
        }

        res.status(200).json({
            message: 'Income updated successfully',
            expense: updatedExpense
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an expense
export const deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIncome = await Income.findByIdAndDelete(id);

        if (!deletedExpense) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({
            message: 'Income deleted successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

