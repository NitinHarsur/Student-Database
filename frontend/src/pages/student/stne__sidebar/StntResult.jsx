import React, { useState, useEffect } from 'react';

const SemesterSelection = () => {
  const [semesterNumber, setSemesterNumber] = useState('');
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');

  const handleChange = (event) => {
    setSemesterNumber(event.target.value);
  };

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await fetch('http://localhost:3001/showResult');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSemesters(data.semesters);
      } catch (error) {
        console.error('Error fetching semesters:', error.message);
      }
    };

    fetchSemesters();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedSemester(semesterNumber); // Update to use semesterNumber instead of selectedSemester
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="semester">Select Semester:</label>
        <select id="semester" value={semesterNumber} onChange={handleChange}>
          <option value="">Select</option>
          {semesters.map((semester, index) => (
            <option key={index} value={semester.semesterNumber}>Semester {semester.semesterNumber}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>

      {selectedSemester && (
        <div>
          <h3>Selected Semester: {selectedSemester}</h3>
          <h3>Subjects</h3>
          {semesters.find(semester => semester.semesterNumber === semesterNumber)?.subjects?.length === 0 ? (
            <p>No subjects available for the selected semester.</p>
          ) : (
            <ul>
              {semesters.find(semester => semester.semesterNumber === semesterNumber)?.subjects?.map((subject, index) => (
                <li key={index}>
                  <strong>{subject.subjectName}</strong>: Internal - {subject.internalMarks}, External - {subject.externalMarks}, Total - {subject.totalMarks}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SemesterSelection;
