import React, { useState } from 'react';
import {  toast,Bounce } from 'react-toastify';

const DeleteStudent = () => {
  const [regnumber, setRegnumber] = useState('');
  const [year, setYear] = useState('');

  const [error] = useState('');
 




  const handleDelete = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/deleteStudentByRegnumber', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ regnumber }),
      });
  
      if (!response.ok) {
        toast.error('Student not found', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.success('Student Deleted successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error('Error deleting student:', error.message);
      toast.error('Network Error', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  const handleDeleteMany = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/deleteStudentsByYear', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year }),
      });
  
      if (!response.ok) {
        toast.error('Student not found', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.success('Students Deleted successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error('Error deleting student:', error.message);
      toast.error('Network Error', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <div className='delete-student-container'>

      <h2>Delete Student By Register Number</h2>
      <form onSubmit={handleDelete}>

        <div>
          <label htmlFor="regnumber">Register :</label>
          <input
            type="text"
            id="regnumber"
            value={year}
            onChange={(e) => setRegnumber(e.target.value)} required
          />
        

        <button type="submit" >Delete Student</button>
        {error && <div>{error}</div>}
        </div>
      </form>

      <h2>Delete Students By Year</h2>
      <form onSubmit={handleDeleteMany}>

        <div>
          <label htmlFor="year"> Year :</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)} required
          />
      

        <button type="submit" >Delete Students</button>
        {error && <div>{error}</div>}
        </div>
      </form>


    </div>
  );
};

export default DeleteStudent;
