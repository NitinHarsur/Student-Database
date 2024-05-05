import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stntHome.css'; // Assuming your CSS file is in the same directory

const StudentHome = () => {
    const storedRegnumber = sessionStorage.getItem('regnumber');
    const [studentDetails, setStudentDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch student details based on registration number
    const fetchStudentDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/studentDetails?regnumber=${storedRegnumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check response status
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse response data
            const data = await response.json();
            setStudentDetails(data);
        } catch (err) {
            console.error('Error fetching student details:', err);
            // Consider displaying an error message to the user
        } finally {
            setLoading(false);
        }
    };

    // Fetch student details when component mounts or when regnumber changes
    useEffect(() => {
        if (storedRegnumber) {
            fetchStudentDetails();
        } else {
            setLoading(false);
        }
    }, [storedRegnumber]);

    // Render loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    // Render no data found state
    if (!studentDetails.length) {
        return <p>No student details found.</p>;
    }

    // Main render of student information
    return (
        <div className="Student__Home ps-5 pe-5">
            {/* Inline CSS for hover effect */}
                <style>
                    {`
                        /* Style for student-detail class */
                        .student-detail {
                            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
                            padding: 30px;
                            border-radius: 30px;
                            margin: 20px;
                            /* Transition settings */
                            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                        }

                        /* Hover effect for student-detail class */
                        .student-detail:hover {
                            box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.5);
                            transform: scale(1.05);
                        }
                    `}
                    </style>


            {/* Iterate over student details */}
            {studentDetails.map((student, index) => (
                <div key={index} className="mb-4">
                    {/* Student detail container */}
                    <div className="student-detail">
                        <div className="d-flex align-items-start" style={{ gap: '7rem' }}>
                            {/* Display student image if available */}
                            {student.image && (
                                <div
                                    style={{
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.5)',
                                        width: '200px',
                                        height: '200px',
                                    }}
                                >
                                    <img
                                        src={student.image}
                                        alt={`Image of ${student.studentname}`}
                                        onError={() => console.error(`Image failed to load for ${student.studentname}`)}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            )}
                            {/* Greeting message */}
                            <div className="greeting-message">
                                <h1>Hi, {student.studentname}! Welcome back!</h1>
                                <p className="fs-4">
                                    We hope you're ready for another great semester of learning and growth.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Student info section */}
                    <div className="student-info mt-4" style={{ padding: '30px', boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', borderRadius: '30px' }}>
                        <h3>Name: {student.studentname}</h3>
                        <h3>Registration Number: {student.regnumber}</h3>
                        <h3>Year of Study: {student.year}</h3>
                        <h3>Father's Name: {student.fathername}</h3>
                        <h3>Mother's Name: {student.mothername}</h3>
                        <h3>Contact Number: {student.phone}</h3>
                        <h3>Email: {student.email}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StudentHome;
