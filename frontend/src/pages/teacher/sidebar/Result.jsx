import React, { useState } from 'react';

const Result = () => {
    const [regNumber, setRegNumber] = useState('');
    const [semesterName, setSemesterName] = useState('');
    const [semesters, setSemesters] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'regNumber') {
            setRegNumber(value);
        } else if (name === 'semesterName') {
            setSemesterName(value);
        }
    };

    const addSemester = () => {
        if (semesterName) {
            setSemesters([...semesters, { name: semesterName, subjects: [] }]);
            setSemesterName(''); // Clear the input
        } else {
            alert('Please enter a semester name before adding.');
        }
    };

    const addSubject = (semesterIndex, subject) => {
        // Add a subject to the specified semester
        const updatedSemesters = [...semesters];
        updatedSemesters[semesterIndex].subjects.push(subject);
        setSemesters(updatedSemesters);
    };

    return (
        <div>
            <h2>Manage Semesters and Subjects</h2>
            <form>
                <div>
                    <label htmlFor="regNumber">Registration Number:</label>
                    <input
                        type="text"
                        id="regNumber"
                        name="regNumber"
                        value={regNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

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

                <button type="button" onClick={addSemester}>Add Semester</button>

                {/* Add JSX code to display and manage semesters and subjects */}
            </form>
        </div>
    );
};

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
                    internalMarks: parseInt(internalMarks),
                    externalMarks: parseInt(externalMarks)
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
                <input type="text" value={semester} onChange={e => setSemester(e.target.value)} />
            </div>
            <div>
                <label>Subject Name:</label>
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

export default Result;
export { MarkSubject };