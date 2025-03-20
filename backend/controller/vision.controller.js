const User = require("../models/user.model")

const getVision = (req, res) => {
    try {
        const vision = req.user.vision_bord;
        res.json({
            vision: vision
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const updateVision = async (req, res) => {
    try {
        const { vision } = req.body;
        if( vision === null || vision === "" ||  vision === undefined){
            return res.status(400).json({error: "Vision board content is required"});
        }
        const user = await User.findById(req.user.id);
        user.vision_bord = vision;
        await user.save();
        res.json(user.vision_bord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = { getVision, updateVision }