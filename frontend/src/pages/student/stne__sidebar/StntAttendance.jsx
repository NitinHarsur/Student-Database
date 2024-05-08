import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import './stntAttendance.css'

function StntAttendance() {
  const storedRegnumber = sessionStorage.getItem('regnumber');

  const [selectedYear, setSelectedYear] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedYear || !storedRegnumber) return;

    async function fetchAttendanceData() {
      try {
        const response = await fetch(`http://localhost:3001/showAttendance?regnumber=${storedRegnumber}&year=${selectedYear}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch attendance data, status code: ${response.status}`);
        }

        const data = await response.json();
        setAttendanceData(data);
        setError('');
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setError('Failed to fetch attendance data');
      }
    }

    fetchAttendanceData();
  }, [selectedYear, storedRegnumber]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="stnt-AttContainer">
   
      <h1>Student Attendance Management</h1>
      <div>
        <label htmlFor="year">Select Year:</label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          <option value="">-- Select Year --</option>
          <option value="firstYearAttendance">First Year</option>
          <option value="secondYearAttendance">Second Year</option>
          <option value="thirdYearAttendance">Third Year</option>
        </select>
      </div>
      {error && <p>{error}</p>}
      {attendanceData && (
        <div style={{ marginTop: '20px' }}>
          <div>
          <h2>Attendance Details for {selectedYear}</h2>
          <table>
            <thead>
              <tr>
                <th>Total Days</th>
                <th>Present Days</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{attendanceData.totalDays || 'N/A'}</td>
                <td>{attendanceData.presentDays || 'N/A'}</td>
                <td>{attendanceData.percentage !== undefined ? `${attendanceData.percentage}%` : 'N/A'}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <h2>Attendance Percentage</h2>
          <Pie
            data={{
              labels: ['Present', 'Absent'],
              datasets: [
                {
                  data: [attendanceData.percentage || 0, 100 - (attendanceData.percentage || 0)],
                  backgroundColor: ['#28a745', '#dc3545']
                }
              ]
            }}
          />
        
        </div>
      )}
    </div>
  );
}

export default StntAttendance;
