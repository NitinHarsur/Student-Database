import React, { useState } from 'react';

const Assignments = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState('');

    // Handle year change
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    // Handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Handle subject input
    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
    };

    // Function to convert file to Base64
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    // Handle assignment upload
    const handleUploadAssignment = async () => {
        if (selectedYear && selectedFile && selectedSubject) {
            try {
                // Convert the selected file to Base64
                const base64File = await convertFileToBase64(selectedFile);

                // Create the payload with selected year, subject, and base64 file
                const payload = {
                    year: selectedYear,
                    subject: selectedSubject,
                    file: base64File,
                };

                // Send the payload to the server
                const response = await fetch('http://localhost:3001/assignments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    alert('Assignment uploaded successfully!');
                } else {
                    alert('Failed to upload assignment.');
                }
            } catch (error) {
                console.error('Error uploading assignment:', error);
                alert('An error occurred while uploading the assignment.');
            }
        } else {
            alert('Please select a year, subject, and an assignment file.');
        }
    };

    return (
        <div className='Assignment__Page' style={{width:"100%"}}>
            <h2 className='Assignments__container fw-bolder'>Assignments</h2>

            {/* Year selection, subject input, file input, and upload button */}
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
                    <input
                        type="text"
                        placeholder='Subject'
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                        className='fw-bolder'
                        style={{marginRight:"10px",border:"none",width:"200px",height:"38px",borderRadius:"5px"}}
                        required
                    />
                    <input
                        type="file"
                        accept=".pdf, .doc, .docx"
                        onChange={handleFileChange}
                        className='fw-bolder'
                        
                    />
                    <button
                        className="btn fw-bolder"
                        style={{ backgroundColor: '#00b4d8', marginLeft: '50px' }}
                        onClick={handleUploadAssignment}
                    >
                        Upload Assignment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Assignments;
