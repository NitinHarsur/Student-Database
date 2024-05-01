import React, { useState } from 'react';
import './AddStudent.css';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
  // State to store student data including the image
  const [studentData, setStudentData] = useState({
    studentname: '',
    fathername: '',
    mothername: '',
    email: '',
    year: '',
    regnumber: '',
    phone: '',
    image: '', // New state for storing the image as a Base64 string
  });

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Handle file input separately for the image
    if (id === 'image') {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        // Convert image file to Base64 string and update state
        setStudentData({ ...studentData, image: reader.result });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      // Update state for other input fields
      setStudentData({ ...studentData, [id]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the backend with student data
      const response = await fetch('http://localhost:3001/AddStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      // Check response status
      if (!response.ok) {
        toast.error('Registration number already exists', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          transition: Bounce,
        });
      } else {
        toast.success('Student added successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          transition: Bounce,
        });

        // Reset the form after successful submission
        setStudentData({
          studentname: '',
          fathername: '',
          mothername: '',
          email: '',
          year: '',
          regnumber: '',
          phone: '',
          image: '',
        });
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error.message);
      toast.error('Network error', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
        transition: Bounce,
      });
    }
  };

  return (
    <div className='add-student-container'>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className='addbox'>
          {/* Left section of the form */}
          <div className='left'>
            <div>
              <label htmlFor='studentname'>Student Name:</label>
              <input
                type='text'
                id='studentname'
                value={studentData.studentname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='fathername'>Father's Name:</label>
              <input
                type='text'
                id='fathername'
                value={studentData.fathername}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='mothername'>Mother's Name:</label>
              <input
                type='text'
                id='mothername'
                value={studentData.mothername}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='image'>Upload Image:</label>
              <input
                type='file'
                id='image'
                accept='image/*'
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Right section of the form */}
          <div className='right'>
            <div>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                id='email'
                value={studentData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='year'>Year:</label>
              <input
                type='text'
                id='year'
                value={studentData.year}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='phone'>Phone Number:</label>
              <input
                type='text'
                id='phone'
                value={studentData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='regnumber'>Registration Number:</label>
              <input
                type='text'
                id='regnumber'
                value={studentData.regnumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Form submission button */}
        <center>
          <button type='submit'>Add Student</button>
        </center>
      </form>
    </div>
  );
};

export default AddStudent;
