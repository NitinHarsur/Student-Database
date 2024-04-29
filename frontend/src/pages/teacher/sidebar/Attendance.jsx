import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Attendance = () => {
    // State variables
    const [studentsData, setStudentsData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [totalDays, setTotalDays] = useState(0);
    const [studentsAttendance, setStudentsAttendance] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch registration numbers
    const fetchRegistrationNumbers = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/attendance?year=${selectedYear}`, {
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

            // Initialize studentsAttendance with the fetched data
            const initialAttendance = data.map((student) => ({
                regnumber: student.regnumber,
                presentDays: 0,  // Start with zero present days for each student
                percentage: 0,   // Start with zero percentage for each student
            }));
            setStudentsAttendance(initialAttendance);
        } catch (err) {
            console.error('Error fetching registration numbers:', err);
            setError('Error fetching registration numbers');
        }
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleTotalDaysChange = (e) => {
        setTotalDays(Number(e.target.value));
    };

    const handlePresentDaysChange = (index, e) => {
        // Update present days for the specific student at the given index
        const newPresentDays = Number(e.target.value);
        const updatedStudentsAttendance = [...studentsAttendance];

        updatedStudentsAttendance[index].presentDays = newPresentDays;

        // Calculate and update the attendance percentage for the student
        if (totalDays > 0) {
            updatedStudentsAttendance[index].percentage = ((newPresentDays / totalDays) * 100).toFixed(2);
        } else {
            updatedStudentsAttendance[index].percentage = 0;
        }

        setStudentsAttendance(updatedStudentsAttendance);
    };

    // Function to handle sending a message about low attendance
    const handleSendMessage = (regnumber) => {
        // Implement your logic here to send a message regarding low attendance
        console.log(`Sending message about low attendance to registration number: ${regnumber}`);
        // Example: Call an API or send an email/SMS to the student or their guardian
    };

    return (
        <div className="container">
            <h2>Attendance Page</h2>

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
                    <button className="btn btn-primary" onClick={fetchRegistrationNumbers}>Fetch Registration Numbers</button>
                </div>
            </div>

            {/* Error message */}
            {error && <p className="text-danger">{error}</p>}

            {/* Total Days input */}
            <div className="mb-3">
                <label htmlFor="totalDays" className="form-label">Total Days:</label>
                <input
                    type="number"
                    id="totalDays"
                    min="0"
                    value={totalDays}
                    onChange={handleTotalDaysChange}
                    className="form-control"
                    style={{ width: '200px' }}
                />
            </div>

            {/* Students table */}
            {studentsData.length > 0 ? (
                <div className="row justify-content-center mt-3">
                    <div className="col-md-8 col-lg-6">
                        <table className="table table-info table-hover table-bordered border-black" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Registration Number</th>
                                    <th>Present Days</th>
                                    <th>Percentage</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsData.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.regnumber}</td>
                                        {/* Input for present days */}
                                        <td>
                                            <input
                                                type="number"
                                                min="0"
                                                value={studentsAttendance[index]?.presentDays || 0}
                                                onChange={(e) => handlePresentDaysChange(index, e)}
                                                className="form-control"
                                            />
                                        </td>
                                        {/* Display the calculated percentage */}
                                        <td>{studentsAttendance[index]?.percentage || 0}%</td>
                                        {/* Conditionally display the "Send" button */}
                                        <td>
                                            {studentsAttendance[index]?.percentage < 75 && (
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleSendMessage(student.regnumber)}
                                                >
                                                    Send
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>No registration numbers found</p>
            )}
        </div>
    );
};

export default Attendance;
