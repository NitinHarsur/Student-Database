import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Attendance = () => {
    // State variables
    const [registrationNumbers, setRegistrationNumbers] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [error, setError] = useState(null);

    // Function to fetch registration numbers based on the selected year
    const fetchRegistrationNumbers = async (e) => {
        e.preventDefault();
        try {
            console.log('Fetching data...');
            // Fetch only registration numbers for attendance
            const response = await fetch(`http://localhost:3001/attendance/regnumbers?year=${selectedYear}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setRegistrationNumbers(data);
        } catch (err) {
            console.error('Error fetching registration numbers:', err);
            setError('Error fetching registration numbers');
        }
    };

    // Handle year change
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    return (
        <div className="container">
            <h2>Attendance</h2>

            {/* Year selection and Fetch button */}
            <div className="row mb-3">
                {/* Specify smaller width for the select and align button beside it */}
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
                {/* Place the button right beside the select */}
                <div className="col-auto d-flex align-items-end">
                    <button className="btn btn-primary" onClick={fetchRegistrationNumbers}>Fetch Registration Numbers</button>
                </div>
            </div>

            {/* Error message */}
            {error && <p className="text-danger">{error}</p>}

            {/* Registration numbers table */}
            {registrationNumbers.length > 0 ? (
                <div className="row justify-content-center mt-3">
                    {/* Centered column with fixed width */}
                    <div className="col-md-8 col-lg-6">
                        {/* The table is placed inside a container for centered and fixed width */}
                        <table className="table table-info table-hover table-bordered border-black" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Registration Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrationNumbers.map((regNumber, index) => (
                                    <tr key={index}>
                                        <td>{regNumber}</td>
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
