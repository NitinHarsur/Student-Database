import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stntResult.css'; // Import your custom CSS file for additional styling;
import Chart from 'chart.js/auto';

const StudentHome = () => {
    const storedRegnumber = sessionStorage.getItem('regnumber');
    const [studentDetails, setStudentDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [semesterResult, setSemesterResult] = useState([]);
    const [totalMarks, setTotalMarks] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [failedSubjects, setFailedSubjects] = useState([]);
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
        if (semesterResult.length > 0) {
            semesterResult.forEach(subject => {
                total += subject.internalMarks + subject.externalMarks;
                if (subject.internalMarks < 24 || subject.externalMarks < 24) {
                    failedSubs.push(subject.subjectName);
                }
            });
        }
        setTotalMarks(total);
        setPercentage((total / (semesterResult.length * 100)) * 100);
        setFailedSubjects(failedSubs);
    }, [semesterResult]);

    useEffect(() => {
        // Create chart data
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Percentage Obtained', 'Percentage Remaining'],
                    datasets: [{
                        data: [percentage, 100 - percentage],
                        backgroundColor: ['green', 'red']
                    }]
                }
            });
        }
    }, [percentage]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!studentDetails.length) {
        return <p>No student details found.</p>;
    }

    return (
        <center>
            <div className="Student__Home container">
                <h2 className="text-center ">Student Result</h2>
                <div className="row">
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div className="two">
                                    <h3 className="card-title text-center">Select Semester</h3>
                                    <select className="form-select mb-3" value={selectedSemester} onChange={handleSemesterChange}>
                                        <option value="">Select Semester</option>
                                        {studentDetails.map((semesters, index) => (
                                            <option key={index} value={semesters.semesterNumber}>Semester {semesters.semesterNumber}</option>
                                        ))}
                                    </select>
                                    {selectedSemester && semesterResult && semesterResult.length > 0 && (
                                        <div>
                                            <h4 className="text-center mb-4">Semester {selectedSemester} Result</h4>
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
                                        </div>
                                    )}
                                    {failedSubjects.length > 0 && (
                                        <div className="mt-4">
                                            <h5 className="text-danger">Failed Subjects</h5>
                                            <ul>
                                                {failedSubjects.map((subject, index) => (
                                                    <li key={index}>{subject}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <p>Total Marks: {totalMarks}</p>
                                        <p>Percentage: {percentage}%</p>
                                    </div>
                                    <div className="mt-4">
                                        <canvas ref={chartRef}  />
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
