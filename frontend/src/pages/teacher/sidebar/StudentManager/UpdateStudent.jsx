import React, { useState } from 'react';
import './UpdateStudent.css';
import { toast, Bounce } from 'react-toastify';

const UpdateStudent = () => {
  const [regnumber, setRegnumber] = useState('');
  const [fieldToUpdate, setFieldToUpdate] = useState('');
  const [newValue, setNewValue] = useState('');
  const [oldYear, setOldYear] = useState('');
  const [newYear, setNewYear] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/updateStudent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          regnumber,
          [fieldToUpdate]: newValue,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Failed to update student', {
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
      } else {
        toast.success(data.message || 'Student information updated successfully', {
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
      }
    } catch (error) {
      console.error('Error updating student:', error.message);
      setError('Network error. Please try again.');
    }
  };

  const handleUpdateYears = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/updateStudentsYear', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldYear,
          newYear,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Failed to update students year', {
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
      } else {
        toast.success(data.message || 'Students year updated successfully', {
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
      }
    } catch (error) {
      console.error('Error updating students year:', error.message);
      setError('Network error. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'image') {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewValue(reader.result);
      };
    
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFieldToUpdate(value);
    }
  };

  return (
    <div className="update-student-container">
      <div className="stntupdate">
        <h2>Update Student Information</h2>
        <form onSubmit={handleUpdate}>
          <label htmlFor="regnumber">Registration Number:</label>
          <input
            type="text"
            id="regnumber"
            value={regnumber}
            onChange={(e) => setRegnumber(e.target.value)}
            required
          />
          <label htmlFor="fieldToUpdate">Field to Update:</label>
          <select
            id="fieldToUpdate"
            value={fieldToUpdate}
            onChange={(e) => setFieldToUpdate(e.target.value)}
            required
          >
            <option value="">Select Field</option>
            <option value="studentname">Student Name</option>
            <option value="fathername">Father Name</option>
            <option value="mothername">Mother Name</option>
            <option value="email">Email</option>
            <option value="year">Year</option>
            <option value="phone">Phone</option>
            <option value="image">Image</option>
          </select>
          {fieldToUpdate === 'image' && (
            <div>
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>
          )}
          {fieldToUpdate !== 'image' && (
            <div>
              <label htmlFor="newValue">New Value:</label>
              <input
                type="text"
                id="newValue"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit">Update Student</button>
          {error && <div>{error}</div>}
        </form>
      </div>

      <div className="yearupdate">
        <h2>Update Students Year</h2>
        <form onSubmit={handleUpdateYears}>
          <label htmlFor="oldYear">Current Year:</label>
          <input
            type="text"
            id="oldYear"
            value={oldYear}
            onChange={(e) => setOldYear(e.target.value)}
            required
          />
          <label htmlFor="newYear">New Year:</label>
          <input
            type="text"
            id="newYear"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            required
          />
          <button type="submit">Update Students Year</button>
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;
