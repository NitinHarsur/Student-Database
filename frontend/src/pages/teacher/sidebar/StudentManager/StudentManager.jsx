import React from 'react'
import { Routes, Route } from 'react-router-dom';
import StudentMenue from './StudentMenue';
import AddStudent from './AddStudent';
import DeleteStudent from './DeleteStudent';
import UpdateStudent from './UpdateStudent';

function StudentManager() {
  
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
 <div>
      <StudentMenue/>
      </div>
      <div>
        <Routes>

        <Route path="/AddStudent" element={<AddStudent/>}/>
        <Route path="/UpdateStudent" element={<UpdateStudent/>}/>
        <Route path="/DeleteStudent" element={<DeleteStudent/>}/>
        
        </Routes>
      </div>
      </div>
  )
}

export default StudentManager