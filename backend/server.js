const express = require('express');
const cors = require('cors');
const connectDB = require('./db/conn'); // Import the connectDB function
const router = require('./router/auth');
const bodyParser = require('body-parser')
const app = express();

// Connect to MongoDB database (assuming 'conn.js' handles connection logic)
connectDB();

app.use(cors());
// Middleware
app.use(express.json()); // Parse incoming JSON data

// Routes
app.use('/', router); // Mount the user router at '/api/users'
// Increase the request size limit to handle larger file uploads
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Define the default route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the home page');
});

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
