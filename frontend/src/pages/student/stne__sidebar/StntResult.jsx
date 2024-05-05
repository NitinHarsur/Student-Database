import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stntResult.css'; // Import your custom CSS file for additional styling
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
    const [chartRendered, setChartRendered] = useState(false); // Track if the chart has been rendered
    const [chartColor, setChartColor] = useState('rgba(75, 192, 192, 0.2)'); // Default color for chart

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

        // Determine chart color based on internal and external status
        if (failedSubs.length > 0) {
            setChartColor('rgba(255, 99, 132, 0.2)'); // Red color if failed subjects exist
        } else {
            setChartColor('rgba(75, 192, 192, 0.2)'); // Green color if all subjects passed
        }
    }, [semesterResult]);

    useEffect(() => {
        console.log('Creating chart...');
        if (!chartRendered && semesterResult.length > 0) {
            const ctx = document.getElementById('pieChart');
            console.log('Canvas element:', ctx); // Check if ctx is defined
            if (ctx) {
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Percentage', 'Remaining'], // Add labels here
                        datasets: [{
                            data: [percentage, 100 - percentage],
                            backgroundColor: [
                                chartColor,
                                'rgba(255, 255, 255, 0.2)',
                            ],
                            borderColor: [
                                chartColor.replace('0.2', '1'), // Adjust alpha for border color
                                'rgba(255, 255, 255, 1)',
                            ],
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        tooltips: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed) {
                                        label += context.parsed.toFixed(2) + '%';
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                });
                setChartRendered(true);
            } else {
                console.log('Canvas element not found');
            }
        }
    }, [semesterResult, percentage, chartRendered, chartColor]);

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
                                        <canvas id="pieChart"></canvas>
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
