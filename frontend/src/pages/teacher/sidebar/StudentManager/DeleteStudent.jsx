import React, { useState } from 'react';
import './DeleteStudent.css'
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
          style: {
            fontWeight: 'bold', // Customize the font weight
            color: 'black', // Customize the text color (green in this example)
        },

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
          style: {
            fontWeight: 'bold', // Customize the font weight
            color: 'black', // Customize the text color (green in this example)
        },

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
        style: {
          fontWeight: 'bold', // Customize the font weight
          color: 'black', // Customize the text color (green in this example)
      },
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
          style: {
            fontWeight: 'bold', // Customize the font weight
            color: 'black', // Customize the text color (green in this example)
        },
          
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
          style: {
            fontWeight: 'bold', // Customize the font weight
            color: 'black', // Customize the text color (green in this example)
        },
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
        style: {
          fontWeight: 'bold', // Customize the font weight
          color: 'black', // Customize the text color (green in this example)
      },
      });
    }
  }

  return (
    <div className='delete-student-container'>
 
  <div className='deleter'>
      <h2>Delete Student By Register Number</h2>
      <form onSubmit={handleDelete}>
      

       
          <label htmlFor="regnumber">Register Number:</label>
          <input
            type="text"
            id="regnumber"
            value={regnumber}
            onChange={(e) => setRegnumber(e.target.value)} required
          />
        

        <button type="submit" >Delete Student</button>
        {error && <div>{error}</div>}
        
        
      </form>
      </div>
      
 
      <div className='deletey'>
      <h2>Delete Students By Year</h2>
      <form onSubmit={handleDeleteMany}>
       
       
          <label htmlFor="year"> Year :</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)} required
          />
    
   

        <button type="submit" >Delete Students</button>
        {error && <div>{error}</div>}
        
       
      </form>
      </div>


    </div>
  );
};

export default DeleteStudent;
