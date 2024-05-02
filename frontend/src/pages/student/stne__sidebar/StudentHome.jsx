import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import './stntHome.css'; // Import your custom CSS styles

const StudentHome = () => {
    const storedRegnumber = sessionStorage.getItem('regnumber');
    const [studentDetails, setStudentDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudentDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/studentDetails?regnumber=${storedRegnumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setStudentDetails(data);
        } catch (err) {
            console.error('Error fetching student details:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (storedRegnumber) {
            fetchStudentDetails();
        } else {
            setLoading(false);
        }
    }, [storedRegnumber]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!studentDetails.length) {
        return <p>No student details found.</p>;
    }

    return (
        <div className="Student__Home ps-5">
            <h2>Profile:</h2>
            {studentDetails.map((student, index) => (
                <div key={index} className="student-detail">
                    {student.image && (
                        <div className="d-flex align-items-start gap-4">
                            <img style={{borderRadius:'20px'}}
                                src={student.image}
                                alt={`Image of ${student.studentname}`}
                                className="img-fluid rounded-lg object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Name:{student.studentname}</h3>
                                <h3>Registration Number: {student.regnumber}</h3>
                                <h3>Father's Name: {student.fathername}</h3>
                                <h3>StudyingYear: {student.year}</h3>
                            </div>
                        </div>
                    )}
                    
                </div>
            ))}
        </div>
    );
};

export default StudentHome;
