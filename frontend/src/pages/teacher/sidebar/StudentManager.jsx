import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AddStudent from './StudentManager/AddStudent';
import DeleteStudent from './StudentManager/DeleteStudent';
import UpdateStudent from './StudentManager/UpdateStudent';

function StudentManager() {
  
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
 <div>
    
      </div >
      <div style={{display:'flex',justifyContent:'center'}}>
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