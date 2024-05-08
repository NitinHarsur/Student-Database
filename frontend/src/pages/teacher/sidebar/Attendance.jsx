import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Attendance = () => {
    // State variables
    const [studentsData, setStudentsData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [totalDays, setTotalDays] = useState(0);
    const [studentsAttendance, setStudentsAttendance] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch registration numbers based on selected year
    const fetchRegistrationNumbers = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        try {
            const response = await fetch(`http://localhost:3001/attendance?year=${selectedYear}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data, status code: ${response.status}`);
            }

            const data = await response.json();
            setStudentsData(data);

            // Initialize studentsAttendance based on fetched data
            const initialAttendance = data.map((student) => ({
                regnumber: student.regnumber,
                presentDays: 0,
                percentage: 0,
            }));
            setStudentsAttendance(initialAttendance);
        } catch (err) {
            console.error('Error fetching registration numbers:', err);
            setError(`Failed to fetch data: ${err.message}`);
        }
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleTotalDaysChange = (e) => {
        setTotalDays(Number(e.target.value));
    };

    // Function to update present days and calculate percentage for a student
    const handlePresentDaysChange = (index, e) => {
        const newPresentDays = Number(e.target.value);
        const updatedStudentsAttendance = [...studentsAttendance];
        updatedStudentsAttendance[index].presentDays = newPresentDays;

        // Calculate attendance percentage
        const percentage = totalDays > 0 ? ((newPresentDays / totalDays) * 100).toFixed(2) : 0;
        updatedStudentsAttendance[index].percentage = parseFloat(percentage);
        
        setStudentsAttendance(updatedStudentsAttendance);
    };

    // Function to handle sending a message about low attendance
    const handleSendMessage = async (regnumber) => {
        setError(null); // Clear previous errors
        try {
            const studentData = studentsData.find((student) => student.regnumber === regnumber);
            if (!studentData) {
                throw new Error(`Student with registration number ${regnumber} not found`);
            }

            const attendanceData = studentsAttendance.find((att) => att.regnumber === regnumber);
            if (!attendanceData) {
                throw new Error(`Attendance data for registration number ${regnumber} not found`);
            }

            const data = {
                regnumber: studentData.regnumber,
                phone: studentData.phone,
                attendancePercentage: attendanceData.percentage,
            };

            const response = await fetch('http://localhost:3001/handleSendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorMessage = await response.text(); // Read the response body as text
                throw new Error(errorMessage);
            } else {
                const responseData = await response.json();
                console.log('Message sent successfully:', responseData);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Function to handle saving attendance percentage
    const handleSaveAttendance = async (regnumber, presentDays, percentage) => {
        setError(null); // Clear previous errors
        try {
            const attendanceData = studentsAttendance.find((att) => att.regnumber === regnumber);
            if (!attendanceData) {
                throw new Error(`Attendance data for registration number ${regnumber} not found`);
            }
    
            // Send a request to save attendance percentage
            const response = await fetch('http://localhost:3001/attendanceSave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ regnumber, year: selectedYear, totalDays, presentDays, percentage }), // Ensure field names match backend
            });
            if (!response.ok) {
                const errorMessage = await response.text(); // Read the response body as text
                throw new Error(errorMessage);
            } else {
                const responseData = await response.json();
                console.log('Attendance saved successfully:', responseData);
            }
        } catch (error) {
            console.error('Error saving attendance:', error);
        }
    };
    
    return (
        <div className="container fw-bold">
            <h2 className='fw-bold'>Attendance Page</h2>

            {/* Year selection and Fetch button */}
            <div className="row mb-3">
                <div className="col-auto">
                    <label htmlFor="yearSelect" className="form-label fw-bold">Select Year:</label>
                    <select
                        id="yearSelect"
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="form-select fw-bolder"
                        style={{ width: '200px' }}
                    >
                        <option value=""className='fw-bolder'>-- Select a year --</option>
                        <option value="1st year" className='fw-bolder'>1st year</option>
                        <option value="2nd year" className='fw-bolder'>2nd year</option>
                        <option value="3rd year" className='fw-bolder'>3rd year</option>
                    </select>
                </div>
                <div className="col-auto d-flex align-items-end">
                    <button className="btn fw-bold" style={{backgroundColor:'#00b4d8'}} onClick={fetchRegistrationNumbers}>Fetch Registration Numbers</button>
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
                    style={{ width: '200px',fontWeight:'bold' }}
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
                                    <th>Save</th> {/* Add a new header column for Save button */}
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
                                        {/* Save button */}
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleSaveAttendance(student.regnumber, studentsAttendance[index]?.presentDays, studentsAttendance[index]?.percentage)}
                                            >
                                                Save
                                            </button>
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
