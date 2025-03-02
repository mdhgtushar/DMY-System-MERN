const generateToken = require("../utility/jwttoken.util");
const User = require("../models/user.model");
const signup = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = new User({ name, email, password, age });
        const savedUser = await newUser.save();

        res.status(201).json({
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                token: await generateToken(user._id, res), // Generate JWT token
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const users = async (req, res) => {
    try { 
        const users = await User.findById(req.user.id);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const updateUser = async (req, res) => {
    try {
        const { name, email, password, vision_bord } = req.body;
        const user = await User.findById(req.user.id);
        user.name = name;
        user.email = email;
        user.password = password;
        user.vision_bord = vision_bord; 
        user.finance = req.body.finance;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    signup,
    login,
    users,
    logout,
    updateUser
};