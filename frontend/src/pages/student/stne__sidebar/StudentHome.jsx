import React, { useEffect, useState } from 'react';
import './stntHome.css';

const StudentHome = () => {
    // Retrieve the registration number from session storage
    const storedRegnumber = sessionStorage.getItem('regnumber');

    // State to store a list of student details
    const [studentDetails, setStudentDetails] = useState([]);
    
    // State to manage loading state
    const [loading, setLoading] = useState(true);

    // Function to fetch student details from the server using the registration number
    const fetchStudentDetails = async () => {
        setLoading(true); // Set loading state to true when the request starts
        try {
            // Make a GET request to the server with the registration number as a query parameter
            const response = await fetch(`http://localhost:3001/studentDetails?regnumber=${storedRegnumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the JSON response
            const data = await response.json();

            // Update the state with the fetched student details
            setStudentDetails(data);
        } catch (err) {
            console.error('Error fetching student details:', err);
        } finally {
            // Set loading to false once the request is complete
            setLoading(false);
        }
    };

    // Fetch student details when the component mounts
    useEffect(() => {
        if (storedRegnumber) {
            fetchStudentDetails();
        } else {
            setLoading(false);
        }
    }, [storedRegnumber]);

    // Display loading message while the request is in progress
    if (loading) {
        return <p>Loading...</p>;
    }

    // Display a message if no student details are found
    if (!studentDetails.length) {
        return <p>No student details found.</p>;
    }

    // Use map to iterate over the list of student details and display each student's information
    return (
        <div className="Student__Home">
            <h2>Student Details:</h2>
            {studentDetails.map((student, index) => (
                <div key={index} className="student-detail">
                    {/* Check that student.image is defined and valid */}
                    {student.image && (
                        <div className="flex items-start gap-4">
                            <img
                                src={student.image} // Set the src attribute directly from the student.image variable
                                alt={`Image of ${student.studentname}`} // Provide an alt attribute for accessibility
                                className="size-10 rounded-lg object-cover" // Add your classes for styling the image
                            />
                            <div>
                                <h3 className="text-lg/tight font-medium text-gray-900">{student.studentname}</h3>
                                <p className="mt-0.5 text-gray-700">
                                    {`Father's Name: ${student.fathername}`} {/* Display other details */}
                                    <br />
                                    {`Year: ${student.year}`}
                                </p>
                            </div>
                        </div>
                    )}
                    <p>Registration Number: {student.regnumber}</p>
                    <p>Name: {student.studentname}</p>
                    <p>Father's Name: {student.fathername}</p>
                    <p>Year: {student.year}</p> {/* Add any other student details you want to display */}
                </div>
            ))}
        </div>
    );
};

export default StudentHome;
