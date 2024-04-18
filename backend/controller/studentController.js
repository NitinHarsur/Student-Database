const Student  = require ('../model/studentSchema')

const studentLogin= async (req, res) => {
    const { studentname, regnumber } = req.body;
  
    try {
      // Check if both username and registration number exist in the request body
      if (!studentname || !regnumber) {
        return res.status(400).json({ error: 'Both username and registration number are required' });
      }
  
      // Find the user in the database based on both studentname and regnumber
      const studentLogin = await Student.findOne({ studentname: studentname, regnumber: regnumber });
  
      if (!studentLogin) {
        return res.status(400).json({ error: 'Invalid username or registration number' });
      }
  
      // Return success message if user is found
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };




  const addStudent = async (req, res) => {
    try {
      const { studentname, regnumber,year } = req.body;

        const existingStudent = await Student.findOne({
            regnumber:regnumber
        });

        if (existingStudent) {
          return res.status(400).json({ error: 'Register number already exsist' });
        }
        else {
            const student = new Student({
                studentname,
                regnumber,
                year
            });

            let result = await student.save();

            res.status(201).json({ message: 'Student added successfully' });
        }
    } catch (error) {
      console.error('Error adding student:', error);
      res.status(500).json({ message: 'Server error' });
    }
}



const deleteStudentByRegnumber = async (req,res)=>{
  try {
    const {regnumber} = req.body;

    // Check if the student exists
    const student = await Student.findOne({regnumber});
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Delete the student from the database
    await Student.deleteOne({regnumber});

    // Return success message
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Server error' });
  }

}


const deleteStudentsByYear = async (req,res)=>{
  try {
    const {year} = req.body;

    // Check if the student exists
    const student = await Student.find({year});
    if (!student) {
      return res.status(404).json({ message: 'Students not found in this year' });
    }

    // Delete the student from the database
    await Student.deleteMany({year});

    // Return success message
    res.json({ message: 'Students deleted successfully' });
  } catch (error) {
    console.error('Error deleting students:', error);
    res.status(500).json({ message: 'Server error' });
  }

}

module.exports={studentLogin,addStudent,deleteStudentByRegnumber,deleteStudentsByYear};