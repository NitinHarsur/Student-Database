const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config({ path: './config.env' });


// Define MongoDB schema and model
const userSchema = new mongoose.Schema({
    username: String,
    regno: String,
    email: String
});

const UserModel = mongoose.model('User', userSchema);

const PORT = process.env.PORT || 3000; // Default port 3000 if not specified in environment variables

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

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
