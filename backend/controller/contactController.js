const contactModel = require('../model/contactSchema'); // Adjust the path if necessary

// Endpoint for handling form submissions
const contact = async (req, res) => {
    const {email,message}=req.body
    try {
        // Create a new contact message document using the contact model
        const newContactMessage = new contactModel({
            email: email,
            message: message,
        });
        
        // Save the contact message document to the database
        await newContactMessage.save();
        
        // Send a success response
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error submitting form:', error); // Debugging: log the error
        res.status(500).json({ message: 'Error submitting form', error: error.message });
    }
};

// Export the contact function
module.exports =  contact ;
