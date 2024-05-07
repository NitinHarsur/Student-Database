import React, { useEffect, useState, useRef } from 'react';
import './stntResult.css'; // Import your custom CSS file for additional styling;
import Chart from 'chart.js/auto';
import { useReactToPrint } from 'react-to-print';

// Create a new component for the printable part of the page
const PrintableResult = React.forwardRef(({ semesterResult, failedSubjects, totalMarks, percentage, passOrFail }, ref) => {
    return (
        <div ref={ref}>
            <h2 className="sem-text">Student Result</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Subject Name</th>
                        <th>Internal Marks</th>
                        <th>External Marks</th>
                        <th>Total Marks</th>
                        <th>Internal Status</th>
                        <th>External Status</th>
                    </tr>
                </thead>
                <tbody>
                    {semesterResult.map((subject, subIndex) => (
                        <tr key={subIndex}>
                            <td>{subject.subjectName}</td>
                            <td>{subject.internalMarks}</td>
                            <td>{subject.externalMarks}</td>
                            <td>{subject.totalMarks}</td>
                            <td>{subject.internalMarks < 24 ? 'Fail' : 'Pass'}</td>
                            <td>{subject.externalMarks < 24 ? 'Fail' : 'Pass'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {failedSubjects.length > 0 && (
                <div className="mt-4">
                    <h5 className="text-danger">Failed Subjects ({failedSubjects.length}):</h5>
                    <ul>
                        {failedSubjects.map((subject, index) => (
                            <li key={index}>{subject}</li>
                        ))}
                    </ul>
                   
                </div>
            )}
            <div className="mt-4">
                <p>Total Marks: {totalMarks}</p>
                <p style={{ color: passOrFail === 'Fail' ? 'red' : 'green' }}>Pass/Fail: {passOrFail}</p>
                <p>Percentage: {percentage}%</p>
            </div>
        </div>
    );
});


const StudentHome = () => {
    const storedRegnumber = sessionStorage.getItem('regnumber');
    const [studentDetails, setStudentDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [semesterResult, setSemesterResult] = useState([]);
    const [totalMarks, setTotalMarks] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [failedSubjects, setFailedSubjects] = useState([]);
    const [passOrFail, setPassOrFail] = useState('');
    const componentRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/showResult?regnumber=${storedRegnumber}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setStudentDetails(data);
            } catch (err) {
                console.error('Error fetching student details:', err);
                // Handle error state here
            } finally {
                setLoading(false);
            }
        };

        if (storedRegnumber) {
            fetchStudentDetails();
        } else {
            setLoading(false);
        }
    }, [storedRegnumber]);

    const handleSemesterChange = (e) => {
        setSelectedSemester(e.target.value);
    };

    useEffect(() => {
        if (selectedSemester && studentDetails.length) {
            const selectedSemesterResult = studentDetails.find(semesters => semesters.semesterNumber === parseInt(selectedSemester));
            setSemesterResult(selectedSemesterResult ? selectedSemesterResult.subjects : []);
        }
    }, [selectedSemester, studentDetails]);

    useEffect(() => {
        let total = 0;
        let failedSubs = [];
        let anyFail = false;
        if (semesterResult.length > 0) {
            semesterResult.forEach(subject => {
                total += subject.internalMarks + subject.externalMarks;
                if (subject.internalMarks < 24 || subject.externalMarks < 24) {
                    failedSubs.push(subject.subjectName);
                    anyFail = true;
                }
            });
        }
        setTotalMarks(total);
        setPercentage((total / (semesterResult.length * 100)) * 100);
        setFailedSubjects(failedSubs);

        // Set pass or fail status
        setPassOrFail(anyFail ? 'Fail' : 'Pass');
    }, [semesterResult]);

   // Inside the useEffect for chart creation
// Inside the useEffect for chart creation
useEffect(() => {
    // Create chart data
    if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: semesterResult.map(subject => subject.subjectName), // Use subject names as labels
                datasets: [{
                    label: 'Subject Result',
                    data: semesterResult.map(subject => subject.internalMarks + subject.externalMarks), // Use the total obtained marks for each subject
                    backgroundColor: semesterResult.map(subject => {
                        // Use red for failed subjects, green for passed subjects
                        return (subject.internalMarks < 24 || subject.externalMarks < 24) ? 'red' : 'green';
                    })
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}, [semesterResult]);



    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!studentDetails.length) {
        return <p>No student details found.</p>;
    }

    return (
        <center>
            <div className="Student__result">
                <h2 className="text-center ">Student Result</h2>
                <div className="row">
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div className="two">
                                    <div className="index-chart">
                                        <div className='result'>
                                            <h3 className="card-title">Select Semester</h3>
                                            <select className="form-select " value={selectedSemester} onChange={handleSemesterChange}>
                                                <option value="">Select Semester</option>
                                                {studentDetails.map((semesters, index) => (
                                                    <option key={index} value={semesters.semesterNumber}>Semester {semesters.semesterNumber}</option>
                                                ))}
                                            </select>
                                            {selectedSemester && semesterResult && semesterResult.length > 0 && (
                                                <div>
                                                    <PrintableResult
                                                        ref={componentRef}
                                                        semesterResult={semesterResult}
                                                        failedSubjects={failedSubjects}
                                                        totalMarks={totalMarks}
                                                        percentage={percentage}
                                                        passOrFail={passOrFail}
                                                    />
                                                </div>
                                            )}
                                            
                                            <div className="mt-4">
                                                <button onClick={handlePrint}>Print Result</button>
                                            </div>
                                        </div>
                                        <div className='chart'>
                                            <div className="mt-4">
                                                <canvas ref={chartRef} />
                                                <br />
                                                <br />
                                                <p>Percentage: {percentage}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </center>
    );
};

export default StudentHome;
