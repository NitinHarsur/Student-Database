import React, { useEffect, useState } from 'react';

const StntAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);

    // Get regnumber from session storage
    const storedRegnumber = sessionStorage.getItem('regnumber');

    // Function to handle sending a request with the regnumber
    const getAssignments = async (storedRegnumber) => {
        try {
            // Send a request with the regnumber
            const response = await fetch(`http://localhost:3001/showAssignments?regnumber=${storedRegnumber}`);
            if (response.ok) {
                const assignmentsData = await response.json();
                // Update state with the assignments data
                setAssignments(assignmentsData);
            } else {
                console.error('Failed to fetch assignments:', response.statusText);
                setError(`Failed to fetch assignments: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching assignments:', error);
            setError('Error fetching assignments');
        }
    };

    useEffect(() => {
        // If storedRegnumber is available, fetch assignments
        if (storedRegnumber) {
            getAssignments(storedRegnumber);
        }
    }, [storedRegnumber]);

    const determineFileExtension = (fileType) => {
        if (fileType.includes('application/msword')) {
            return '.doc';
        } else if (fileType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            return '.docx';
        } else if (fileType.includes('application/pdf')) {
            return '.pdf';
        }
        // Add other file types here if needed
        return '';
    };

    return (
        <div>
            <h2>Assignments</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                assignments.length > 0 ? (
                    <ul>
                        {assignments.map((assignment, index) => {
                            // Determine the MIME type (file type) and base64 data
                            const [fileType, base64Data] = assignment.file.split(',');
                            
                            // Create a data URL from the base64 file data
                            const fileDataURL = `data:${fileType};base64,${base64Data}`;

                            // Determine file extension
                            const fileExtension = determineFileExtension(fileType);

                            // Determine whether to use a data URL or redirect to an actual file URL
                            const fileUrl = fileExtension ? fileDataURL : fileDataURL;

                            return (
                                <li key={index} style={{marginBottom:"20px", backgroundColor:"white",width:"300px",padding:"20px",borderRadius:"10px"}}>
                                    <p>Date: {new Date(assignment.date).toLocaleDateString()}</p>
                                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                        View Assignment {index + 1}
                                    </a>
                                    {/* Provide a download button */}
                                    <button style={{border:"none",backgroundColor:"rgb(140, 221, 178)",
                                        marginLeft:"20px",borderRadius:"5px"
                                    }}
                                        onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = fileUrl;
                                            link.download = `assignment_${index}${fileExtension}`;
                                            link.click();
                                        }}
                                    >
                                        Download
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p>No assignments found.</p>
                )
            )}
        </div>
    );
};

export default StntAssignments;
