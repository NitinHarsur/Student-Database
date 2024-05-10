import React, { useState } from 'react';
import './Result.css'
import { toast, Bounce } from 'react-toastify';


const SubmitMarksForm = () => {
  const [regnumber, setRegnumber] = useState('');
  const [semesterNumber, setSemesterNumber] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [internalMarks, setInternalMarks] = useState('');
  const [externalMarks, setExternalMarks] = useState('');

// eslint-disable-next-line
const handleSubjectChange = (event, index) => {
  const newSubjects = subjects.map((subject, i) => {
    if (i === index) {
      return {
        ...subject,
        [event.target.name]: event.target.value
      };
    }
    return subject;
  });
  setSubjects(newSubjects);
};



  const addSubject = () => {
    if (!regnumber || !semesterNumber) {
      toast.error( 'Please fill in all fields for the new subject.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,})
      return;
    }
  
    const totalMarks = parseInt(internalMarks) + parseInt(externalMarks);
    setSubjects([...subjects, { subjectName, internalMarks, externalMarks, totalMarks }]);
    setSubjectName('');
    setInternalMarks('');
    setExternalMarks('');
  };

  const handleSubjectRemove = (index) => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!regnumber || !semesterNumber || subjects.length === 0) {
      alert('Please fill in all required fields (Registration Number, Semester Number, and at least one subject)');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          regnumber,
          semesterNumber: Number(semesterNumber),
          subjects: subjects.map((subject) => ({
            subjectName: subject.subjectName,
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
      toast.success(data.message || 'Marks submited successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      // Reset form fields
      setRegnumber('');
      setSemesterNumber('');
      setSubjects([]);
    } catch (error) {
      console.error('Error submitting marks:', error.message);
      toast.error(error.message || 'Failed to submit marks. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,})
    }
  };

  return (
    <center>
    <div className='form-container '>
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

        <h3 className='fw-bolder'>Subjects</h3>
        {subjects.length === 0 && <p className='fw-bolder'>No subjects added yet.</p>}
        {subjects.map((subject, index) => (
          <div key={index} className='subject-container'>
            <label htmlFor={`subjectName-${index}`}>Subject Name:</label>
            <input type="text" id={`subjectName-${index}`} name="subjectName" value={subject.subjectName} onChange={(event) => handleSubjectChange(event, index)} required />
            <br />
            <label htmlFor={`internalMarks-${index}`}>Internal Marks:</label>
            <input type="number" id={`internalMarks-${index}`} name="internalMarks" value={subject.internalMarks} onChange={(event) => handleSubjectChange(event, index)} required />
            <br />
            <label htmlFor={`externalMarks-${index}`}>External Marks:</label>
            <input type="number" id={`externalMarks-${index}`} name="externalMarks" value={subject.externalMarks} onChange={(event) => handleSubjectChange(event, index)} required />
            <button type="button" onClick={() => handleSubjectRemove(index)}>Remove Subject</button>
          </div>
        ))}
        <button type="button" onClick={addSubject}>Add Subject</button>
        <button type="submit">Submit Marks</button>
      </form>
    </div>
    
    </center>
  );
};

export default SubmitMarksForm;
