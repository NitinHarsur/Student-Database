// ResultPage.js

import React, { useState } from 'react';

const ResultPage = () => {
  const [regNumber, setRegNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [subjectData, setSubjectData] = useState([{ subject: '', internalMarks: '', externalMarks: '' }]);

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjectData = [...subjectData];
    updatedSubjectData[index][field] = value;
    setSubjectData(updatedSubjectData);
  };

  const addSubject = () => {
    setSubjectData([...subjectData, { subject: '', internalMarks: '', externalMarks: '' }]);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/addResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ regnumber: regNumber,
          semester: semester,
          subjectData: subjectData }),
      });
      const data = await response.json(); // Assuming the response contains JSON data
      if (response.ok) {
        alert('Result added successfully');
      } else {
        alert(data.error || 'Failed to add result');
      }
    } catch (error) {
      console.error('Error adding result:', error);
      alert('Failed to add result');
    }
  };

  return (
    <div>
      <h2>Teacher Result Page</h2>
      <div>
        <label htmlFor="regNumber">Registration Number:</label>
        <input type="text" id="regNumber" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} />
      </div>
      <div>
        <label htmlFor="semester">Semester:</label>
        <input type="text" id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
      </div>
      {subjectData.map((subject, index) => (
        <div key={index}>
          <div>
            <label htmlFor={`subject_${index}`}>Subject:</label>
            <input
              type="text"
              id={`subject_${index}`}
              value={subject.subject}
              onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`internalMarks_${index}`}>Internal Marks:</label>
            <input
              type="text"
              id={`internalMarks_${index}`}
              value={subject.internalMarks}
              onChange={(e) => handleSubjectChange(index, 'internalMarks', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`externalMarks_${index}`}>External Marks:</label>
            <input
              type="text"
              id={`externalMarks_${index}`}
              value={subject.externalMarks}
              onChange={(e) => handleSubjectChange(index, 'externalMarks', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button onClick={addSubject}>Add Subject</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ResultPage;
