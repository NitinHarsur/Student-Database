import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useReactToPrint } from 'react-to-print';

const PrintableResult = React.forwardRef(({ studentsData }, ref) => {
    return (
        <div ref={ref}>
            <div className="row justify-content-center mt-3">
                <div className="col-md-8 col-lg-6">
                    <table className="table table-info table-hover table-bordered border-black" style={{ width: '100%',textAlign:"center"}}>
                        <thead>
                            <tr>
                                <th>Serial No.</th>
                                <th>Name</th>
                                <th>Registration Number</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsData.map((student, index) => (
                                <tr key={index}>
                                    <td className='fw-bolder'>{index + 1}</td>
                                    <td className='fw-bolder'>{student.studentname}</td>
                                    <td className='fw-bolder'>{student.regnumber}</td>
                                    <td className='fw-bolder'>{student.year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
});

const StudentsList = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [error, setError] = useState(null);
    const componentRef = useRef(null);

    const fetchStudents = async (e) => {
        e.preventDefault();
        try {
            console.log('Fetching data...');
            const response = await fetch(`http://localhost:3001/studentsList?year=${selectedYear}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setStudentsData(data);
        } catch (err) {
            console.error('Error fetching students list:', err);
            setError('Error fetching students list');
        }
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <div className="container">
            <h2 className='fw-bolder'>Students List</h2>
            <div className="row mb-3">
                <div className="col-auto">
                    <label htmlFor="yearSelect" className='fw-bolder'>Select Year:</label>
                    <select
                        id="yearSelect"
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="form-select fw-bolder"
                        style={{ width: '200px' }}
                    >
                        <option value="" className='fw-bolder'>-- Select a year --</option>
                        <option value="1st year" className='fw-bolder'>1st year</option>
                        <option value="2nd year" className='fw-bolder'>2nd year</option>
                        <option value="3rd year" className='fw-bolder'>3rd year</option>
                    </select>
                </div>
                <div className="col-auto d-flex align-items-end">
                    <button className="btn fw-bolder" style={{ backgroundColor: '#00b4d8' }} onClick={fetchStudents}>Fetch Students</button>
                    <button className="btn fw-bolder" style={{ backgroundColor: '#00b4d8', marginLeft: '10px' }} onClick={handlePrint}>Print</button>
                </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            {studentsData.length > 0 ? (
                <div id="studentsTable">
                    <PrintableResult ref={componentRef} studentsData={studentsData} />
                </div>
            ) : (
                <p className='fw-bolder'> No students found</p>
            )}
        </div>
    );
};

export default StudentsList;
