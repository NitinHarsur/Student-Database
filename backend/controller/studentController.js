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

  module.exports = studentLogin;


  const AddStudent = async (req, res) => {
    try {
      const { studentname, regnumber } = req.body;

        const existingStudent = await Student.findOne({
            regnumber:regnumber
        });

        if (existingStudent) {
          return res.status(400).json({ error: 'Register number already exsist' });
        }
        else {
            const student = new Student({
                studentname,
                regnumber
            });

            let result = await student.save();

            res.status(201).json({ message: 'Student added successfully' });
        }
    } catch (error) {
      console.error('Error adding student:', error);
      res.status(500).json({ message: 'Server error' });
    }
}
module.exports = AddStudent;