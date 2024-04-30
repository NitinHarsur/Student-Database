const mongoose = require('mongoose');

// Define the schema for the contact form
const contactSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(email) {
                // Use a regular expression to validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            },
            message: 'Please enter a valid email address.',
        },
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
});

const db = mongoose.connection.useDb('GPTDATA');

// Create the contact model using the schema
const contactModel = mongoose.model('Contact', contactSchema);

// Export the model
module.exports = contactModel;
