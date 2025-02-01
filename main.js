const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const calculateRewards = require('./jobs/calculateRewards');
const { createUser, findUserById, updateUser } = require('./jobs/manageUser');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors()); 

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.post('/user/create', async (req, res) => {
    try {
        const newUser = await createUser();
        res.json({ success: true, user: newUser });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/click', async (req, res) => {
    const { userId } = req.body;

    try {
        const reward = calculateRewards();
        const updatedUser = await updateUser(userId, reward);

        res.json({ success: true, user: updatedUser, reward });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.get('/user/:id', async (req, res) => {
    try {
        const user = await findUserById(req.params.id);
        if (!user) throw new Error('User not found');
        res.json(user);
    } catch (err) {
        res.status(404).json({ success: false, message: err.message });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
