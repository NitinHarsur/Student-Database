import React from 'react'
import { Link } from 'react-router-dom';

const StudentManager=() => {


    
  return (
    <div className="studentmanager" >
    
    <ul style={{display:'flex', listStyle:'none'}}>
      <li>
        <Link to="/TeacherDashboard/StudentManager/AddStudent" ><button>Add Student</button></Link>
      </li>
      <li>
        <Link to="/TeacherDashboard/StudentManager/UpdateStudent" ><button>Update Student</button></Link>
      </li>
      <li>
        <Link to="/TeacherDashboard/StudentManager/DeleteStudent" ><button>Delete Student</button></Link>
      </li>
    </ul>
  </div>
  )
}

export default StudentManager;