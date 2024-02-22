const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config({ path: './config.env' });
require('./db/conn');

const PORT = process.env.PORT || 3000; // Default port 3000 if not specified in environment variables


const DB = process.env.DATABASE;
if (!DB) {
    console.error("MongoDB connection string is missing in environment variables.");
    process.exit(1); // Exit process with error code 1
}

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1); // Exit process with error code 1
    });

const UserSchema = new mongoose.Schema({
    username: String,
    regno: String,
    email: String
});

const UserModel = mongoose.model('stntinfo', UserSchema);

app.post('/login', async (req, res) => {
    const { username, regno } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (user) {
            if (user.regno === regno) {
                res.json({ message: 'Login successful', user });
            } else {
                res.status(400).json({ message: 'Invalid registration number' });
            }
        } else {
            res.status(400).json({ message: 'Invalid username' });
        }
    } catch (error) {
        console.error("Error while logging in:", error);
        res.status(500).json({ message: 'Server error' });
    }
});
