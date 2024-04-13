const Teacher = require ('../model/teacherSchema');

const teacherLogin = async (req, res) => {
    const { name, password } = req.body;
  
    try {
      // Check if both username and registration number exist in the request body
      if (!name || !password) {
        return res.status(400).json({ error: 'Both username and password number are required' });
      }
  
      // Find the user in the database based on both studentname and regnumber
      const teacherLogin = await Teacher.findOne({ name: name, password: password });
  
      if (!teacherLogin) {
        return res.status(400).json({ error: 'Invalid username or password number' });
      }
  
      // Return success message if user is found
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  module.exports = teacherLogin;