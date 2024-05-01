import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentsList = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [error, setError] = useState(null);

    // Function to fetch students list
    const fetchStudents = async (e) => {
        e.preventDefault();
        try {
            console.log('Fetching data...');
            const response = await fetch(`http://localhost:3001/studentsList?year=${selectedYear}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setStudentsData(data);
        } catch (err) {
            console.error('Error fetching students list:', err);
            setError('Error fetching students list');
        }
    };

    // Handle year change
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    return (
        <div className="container">
            <h2>Students List</h2>

            {/* Year selection and Fetch button */}
            <div className="row mb-3">
                <div className="col-auto">
                    <label htmlFor="yearSelect" className="form-label">Select Year:</label>
                    <select
                        id="yearSelect"
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="form-select"
                        style={{ width: '200px' }}
                    >
                        <option value="">-- Select a year --</option>
                        <option value="1st year">1st year</option>
                        <option value="2nd year">2nd year</option>
                        <option value="3rd year">3rd year</option>
                    </select>
                </div>
                <div className="col-auto d-flex align-items-end">
                    <button className="btn" style={{ backgroundColor: '#00b4d8' }} onClick={fetchStudents}>Fetch Students</button>
                </div>
            </div>

            {/* Error message */}
            {error && <p className="text-danger">{error}</p>}

            {/* Students table */}
            {studentsData.length > 0 ? (
                <div className="row justify-content-center mt-3">
                    <div className="col-md-8 col-lg-6">
                        <table className="table table-info table-hover table-bordered border-black" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Registration Number</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsData.map((student, index) => (
                                    <tr key={index}>
                                        {/* Display the image using an img tag */}
                                        <td>
                                            {student.image && (
                                                <img
                                                    src={student.image}
                                                    alt={`${student.studentname}'s image`}
                                                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                                />
                                            )}
                                        </td>
                                        <td>{student.studentname}</td>
                                        <td>{student.regnumber}</td>
                                        <td>{student.year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>No students found</p>
            )}
        </div>
    );
};

export default StudentsList;
