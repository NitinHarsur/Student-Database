import React, { useState } from 'react';

const MarkSubject = () => {
  const [regNumber, setRegNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [internalMarks, setInternalMarks] = useState(0);
  const [externalMarks, setExternalMarks] = useState(0);

  const markSubject = async () => {
    try {
      const response = await fetch('http://localhost:3001/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          regNumber,
          semester,
          subjectName,
          internalMarks: parseInt(internalMarks), // Parse as number
          externalMarks: parseInt(externalMarks) // Parse as number
        })
      });

      if (response.ok) {
        alert('Marks updated successfully');
      } else {
        throw new Error('Failed to mark subject');
      }
    } catch (error) {
      console.error('Error marking subject:', error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Mark Subject</h2>
      <div>
        <label>Registration Number:</label>
        <input type="text" value={regNumber} onChange={e => setRegNumber(e.target.value)} />
      </div>
      <div>
        <label>Semester:</label>
        <select value={semester} onChange={e => setSemester(e.target.value)}>
          <option value="">Select Semester</option>
          <option value="1st Sem">1st Semester</option>
          <option value="2nd Sem">2nd Semester</option>
        </select>
      </div>
      <div>
        <label>Subject:</label>
        <input type="text" value={subjectName} onChange={e => setSubjectName(e.target.value)} />
      </div>
      <div>
        <label>Internal Marks:</label>
        <input type="number" value={internalMarks} onChange={e => setInternalMarks(e.target.value)} />
      </div>
      <div>
        <label>External Marks:</label>
        <input type="number" value={externalMarks} onChange={e => setExternalMarks(e.target.value)} />
      </div>
      <button onClick={markSubject}>Mark Subject</button>
    </div>
  );
};

export default MarkSubject;
