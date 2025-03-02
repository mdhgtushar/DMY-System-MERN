const User = require("../models/user.model");

const getFinance = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.finance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getFinanceById = async (req, res) => {
    try {
        const { id: financeId } = req.params;
        const user = await User.findById(req.user.id);
        const finance = user.finance.find(finance => finance._id.toString() === financeId);
        if (!finance) {
            return res.status(404).json({ message: "Finance record not found" });
        }
        res.json(finance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const createFinance = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;
        if (!userId || !title || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add new finance entry
        const newFinance = { title, description };
        user.finance.push(newFinance);
        await user.save();

        res.status(200).json({ message: "Finance record added", user });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

const deleteFinance = async (req, res) => {
    try {
        const { id: financeId } = req.params;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const financeIndex = user.finance.findIndex(finance => finance._id.toString() === financeId);
        if (financeIndex === -1) {
            return res.status(404).json({ message: "Finance record not found" });
        }

        user.finance.splice(financeIndex, 1);
        await user.save();

        res.status(200).json({ message: "Finance record deleted", finance: user.finance });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
const updateFinance = async (req, res) => {
    try {
        const { id: financeId } = req.params;
        const { title, description } = req.body;
        const userId = req.user.id;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!userId || !title || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const financeIndex = user.finance.findIndex(finance => finance._id.toString() === financeId);
        if (financeIndex === -1) {
            return res.status(404).json({ message: "Finance record not found" });
        }

        user.finance[financeIndex] = { title, description };
        await user.save();

        res.status(200).json({ message: "Finance record updated", finance: user.finance });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}
module.exports = { getFinance, createFinance, deleteFinance, updateFinance, getFinanceById };