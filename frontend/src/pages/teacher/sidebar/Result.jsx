import React, { useState } from 'react';

const Result = () => {
  // State variables for form inputs
  const [regnumber, setRegnumber] = useState('');
  const [semesterName, setSemesterName] = useState('');
  const [showSubjectInputs, setShowSubjectInputs] = useState(false);
  const [semesters, setSemesters] = useState([]);

  // Function to handle changes in form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'regnumber') {
      setRegnumber(value);
    } else if (name === 'semesterName') {
      setSemesterName(value);
    }
  };

  // Function to toggle display of subject input fields
  const toggleSubjectInputs = () => {
    setShowSubjectInputs(!showSubjectInputs);
  };

  // Function to add a new semester
  const addSemester = () => {
    if (semesterName) {
      setSemesters([...semesters, { name: semesterName, subjects: [] }]);
      setSemesterName(''); // Clear semester name input after adding
    } else {
      alert('Please enter a semester name before adding.');
    }
  };

  // Function to add a new subject to a specific semester
  const addSubject = () => {
    if (!showSubjectInputs) {
      toggleSubjectInputs();
    } else {
      // Find the currently selected semester (assuming the last added one)
      const currentSemester = semesters[semesters.length - 1];
      currentSemester.subjects.push({ name: '', internalMarks: '', externalMarks: '' });
      setSemesters([...semesters]); // Update state with modified semesters array
    }
  };

  return (
    <div>
      <h2>Add or Update Student Results</h2>
      <form>
        {/* Input for registration number */}
        <div>
          <label htmlFor="regnumber">Registration Number:</label>
          <input
            type="text"
            id="regnumber"
            name="regnumber"
            value={regnumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Input for semester name */}
        <div>
          <label htmlFor="semesterName">Semester Name:</label>
          <input
            type="text"
            id="semesterName"
            name="semesterName"
            value={semesterName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Button to toggle subject input fields */}
        <button type="button" onClick={toggleSubjectInputs}>
          {showSubjectInputs ? 'Hide Subject Inputs' : 'Add Subject'}
        </button>

        {/* Subject input fields (conditionally displayed) */}
        {showSubjectInputs && (
          <>
            <div>
              <label htmlFor="subjectName">Subject Name:</label>
              <input type="text" id="subjectName" required />
            </div>
            <div>
              <label htmlFor="internalMarks">Internal Marks:</label>
              <input type="number" id="internalMarks" required />
            </div>
            <div>
              <label htmlFor="externalMarks">External Marks:</label>
              <input type="number" id="externalMarks" required />
            </div>
          </>
        )}

        {/* Button to add a new semester */}
        <button type="button" onClick={addSemester}>
          Add Semester
        </button>

        {/* Button to add a new subject (toggles subject inputs) */}
        <button type="button" onClick={addSubject}>
          {showSubjectInputs ? 'Add Subject' : 'Add Subject Details'}
        </button>

        {/* Submit button (can be implemented later to send data to backend) */}
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};

export default Result;
