import React, { useState } from 'react';

const StudentsList = () => {
  // State variable to store the students data and selected year
  const [studentsData, setStudentsData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [error, setError] = useState(null);

  // Function to fetch students list for the selected year
  const fetchStudents = async (e) => {
    e.preventDefault();

    try {
      console.log('fetching data please wait ....')
      // Use the selected year in the fetch request URL
      const response = await fetch(`http://localhost:3001/studentsList?year=${selectedYear}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(' data fetching please wait ....')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        
      }

      // Parse the response data
      const data = await response.json();
console.log(data)
      // Set the students data to state
      setStudentsData(data);
    } catch (err) {
      console.error('Error fetching students list:', err);
      setError('Error fetching students list');
    }
  };

  // Function to handle the change event for the year selection
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div>
      <h2>Students List</h2>

      {/* Dropdown menu for selecting a year */}
      <label htmlFor="yearSelect">Select Year:</label>
      <select id="yearSelect" value={selectedYear} onChange={handleYearChange}>
        <option value="">-- Select a year --</option>
        <option value="1st year">1st year</option>
        <option value="2nd year">2nd year</option>
        <option value="3rd year">3rd year</option>
        {/* Add more years as needed */}
      </select>

      {/* Button to fetch students list for the selected year */}
      <button onClick={fetchStudents}>Fetch Students</button>

      {/* Error handling */}
      {error && <p>{error}</p>}

      {/* Render the students list */}
      {studentsData.length > 0 ? (
        <ul>
          {studentsData.map((student, index) => (
            <li key={index}>{student.studentname} (Reg. No.: {student.regnumber}, Year: {student.year})</li>
          ))}
        </ul>
      ) : (
        <p>No students found</p>
      )}
    </div>
  );
};

export default StudentsList;
