import React, { useState } from 'react';
import { Navbar, Footer } from '../../NavAndFoot/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function Contact() {
    // State for form inputs
    const [formData, setFormData] = useState({
        email: '',
        message: '',
    });

    // State for form submission status and feedback
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState('');

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send a POST request to the backend endpoint
            const response = await fetch('http://localhost:3001/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful form submission
                setSubmissionStatus('success');
                setSubmissionMessage('Your message has been sent successfully!');
                // Reset the form data
                setFormData({
                    email: '',
                    message: '',
                });
            } else {
                // Handle error in form submission
                setSubmissionStatus('error');
                setSubmissionMessage(`Error submitting form: ${data.message}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmissionStatus('error');
            setSubmissionMessage('There was a problem submitting your form. Please try again later.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center" style={{fontSize:'41px',fontWeight:'600'}}>Contact Us:</h2>
                <div className="card p-4 shadow-lg rounded-3"> {/* Add shadow and rounded corners to the form container */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{fontSize:'20px',fontWeight:'700'}}>Email:</label>
                            <input
                                type="email"
                                className="form-control shadow-sm rounded-3" // Add shadow and rounded corners to the input
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label" style={{fontSize:'20px',fontWeight:'700'}}>Message:</label>
                            <textarea
                                className="form-control shadow-sm rounded-3" // Add shadow and rounded corners to the textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{fontSize:'20px',fontWeight:'700'}}>Send</button>
                    </form>
                    {/* Display form submission feedback */}
                    {submissionStatus && (
                        <div className={`alert alert-${submissionStatus === 'success' ? 'success' : 'danger'} mt-3`}>
                            {submissionMessage}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
