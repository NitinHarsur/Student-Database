import React, { useState, useEffect } from 'react';

const TeacherHome = () => {
  // Define state variables for student counts in each year
  const [studentCount1, setStudentCount1] = useState(0);
  const [studentCount2, setStudentCount2] = useState(0);
  const [studentCount3, setStudentCount3] = useState(0);

  // Define styles for the container, heading, and boxes
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Set container direction to column
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: '10px',
  };

  const headingStyle = {
    fontSize: '5rem',
    marginBottom: '20px', // Add margin bottom for spacing
  };

  const boxStyle = {
    fontWeight:'bolder',
    margin: '10px',
    padding: '20px',
    border: '2px solid black',
    borderRadius: '5px',
    textAlign: 'center',
    width: '350px', 
    backgroundColor:'white'// Set width of boxes for consistent layout
  };

  // Fetch student counts from the server when the component mounts
  useEffect(() => {
    const fetchStudentCounts = async () => {
      try {
        // Fetch student count for 1st year
        const response1 = await fetch('http://localhost:3001/studentsList?year=1st year', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response1.ok) {
          const data1 = await response1.json();
          setStudentCount1(data1.length);
        } else {
          console.error('Failed to fetch student count for 1st year:', response1.statusText);
        }

        // Fetch student count for 2nd year
        const response2 = await fetch('http://localhost:3001/studentsList?year=2nd year', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response2.ok) {
          const data2 = await response2.json();
          setStudentCount2(data2.length);
        } else {
          console.error('Failed to fetch student count for 2nd year:', response2.statusText);
        }

        // Fetch student count for 3rd year
        const response3 = await fetch('http://localhost:3001/studentsList?year=3rd year', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response3.ok) {
          const data3 = await response3.json();
          setStudentCount3(data3.length);
        } else {
          console.error('Failed to fetch student count for 3rd year:', response3.statusText);
        }
      } catch (error) {
        console.error('Error fetching student counts:', error);
      }
    };

    // Call the function to fetch student counts when the component mounts
    fetchStudentCounts();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={headingStyle}>
        <h1>Welcome, Sunanda</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={boxStyle}>
          Total Number of Students in 1st Year: {studentCount1}
        </div>

        <div style={boxStyle}>
          Total Number of Students in 2nd Year: {studentCount2}
        </div>

        <div style={boxStyle}>
          Total Number of Students in 3rd Year: {studentCount3}
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
