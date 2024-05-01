import React, { useState } from 'react';

const SubmitMarksForm = () => {
  const [regnumber, setRegnumber] = useState('');
  const [semesterNumber, setSemesterNumber] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [internalMarks, setInternalMarks] = useState('');
  const [externalMarks, setExternalMarks] = useState('');

  const addSubject = () => {
    if (subjectName && internalMarks && externalMarks) {
      setSubjects([...subjects, { name: subjectName, internalMarks, externalMarks }]);
      setSubjectName('');
      setInternalMarks('');
      setExternalMarks('');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting form with subjects:", subjects);

    try {
      const response = await fetch('http://localhost:3001/submitResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          regnumber,
          semesterNumber: Number(semesterNumber),
          subjects: subjects.map(subject => ({
            name: subject.name,
            internalMarks: Number(subject.internalMarks),
            externalMarks: Number(subject.externalMarks),
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      alert('Marks submitted successfully');
      // Reset form fields
      setRegnumber('');
      setSemesterNumber('');
      setSubjects([]);
    } catch (error) {
      console.error('Error submitting marks:', error.message);
      alert('Failed to submit marks. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Submit Marks</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="regnumber">Registration Number:</label>
          <input type="text" id="regnumber" name="regnumber" value={regnumber} onChange={(e) => setRegnumber(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="semesterNumber">Semester Number:</label>
          <input type="number" id="semesterNumber" name="semesterNumber" value={semesterNumber} onChange={(e) => setSemesterNumber(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="subjectName">Subject Name:</label>
          <input type="text" id="subjectName" name="subjectName" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="internalMarks">Internal Marks:</label>
          <input type="number" id="internalMarks" name="internalMarks" value={internalMarks} onChange={(e) => setInternalMarks(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="externalMarks">External Marks:</label>
          <input type="number" id="externalMarks" name="externalMarks" value={externalMarks} onChange={(e) => setExternalMarks(e.target.value)} required />
        </div>
        <button type="button" onClick={addSubject}>Add Subject</button>
        <ul>
          {subjects.map((subject, index) => (
            <li key={index}>{subject.name}: Internal - {subject.internalMarks}, External - {subject.externalMarks}</li>
          ))}
        </ul>
        <button type="submit">Submit Marks</button>
      </form>
    </div>
  );
};

export default SubmitMarksForm;
