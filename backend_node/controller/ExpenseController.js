import Expense from "../modles/ExpenseModel.js";

export const addExpense = async(req, res)=>{
    try{
    const { expenseName, cost, category, date, typeCategory, expenseDetails } = req.body;
   
    const newExpense = new Expense({
        expenseName,
        cost,
        category,
        date,
        typeCategory,
        expenseDetails
    });

    await newExpense.save();
    res.status(201).json({
        message: 'Expense added successfully',
        expense: newExpense
    });

}catch(error){
    console.error(error);
        res.status(500).json({ message: 'Server error' });
}

};


//get expense route 
export const getAllExpenses = async(req, res)=> {
    try {
        const expense = await Expense.find();
        res.status(200).json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get an expense by ID
export const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an expense
export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { expenseName, cost, category, date, typeCategory, expenseDetails } = req.body;

        const updatedExpense = await Expense.findByIdAndUpdate(id, {
            expenseName,
            cost,
            category,
            date,
            typeCategory,
            expenseDetails
        }, { new: true });

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({
            message: 'Expense updated successfully',
            expense: updatedExpense
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an expense
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);

        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({
            message: 'Expense deleted successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

