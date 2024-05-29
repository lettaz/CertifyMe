const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { Institution, Student } = require('../models');

const registerInstitution = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log('got here');
    
    try {
      const institution = await Institution.create({
        institutionID: uuidv4(),
        name,
        email,
        password: hashedPassword
      });
      res.status(201).send(institution);
    } catch (error) {
      console.error('Error during institution registration:', error);  // Log the error to console for debugging
      res.status(400).send({ error: error.message });  // Send back the error message
    }
  };

  const loginInstitution = async (req, res) => {
    const { email, password } = req.body;
  
    console.log("Received email:", email); // Log the received email
    console.log("Received password:", password); // Log the received password
  
    try {
      // Find the institution by email
      const institution = await Institution.findOne({ where: { email } });
      if (!institution) {
        console.log("No institution found with that email."); // Log if no institution is found
        return res.status(401).send({ error: 'Login failed! No institution found with that email.' });
      }
  
      console.log("Institution found, comparing password..."); // Log when institution is found
      // Compare hashed passwords
      const isMatch = await bcrypt.compare(password, institution.password);
      if (!isMatch) {
        console.log("Password comparison failed."); // Log if password comparison fails
        return res.status(401).send({ error: 'Login failed! Incorrect password.' });
      }
  
      console.log("Password matched, generating token..."); // Log successful password match
      // Ensure JWT_SECRET is available
      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined!');
        return res.status(500).send({ error: 'Server configuration error.' });
      }
  
      // Sign JWT token with the institution's ID
      const token = jwt.sign({
        institutionID: institution.institutionID,
        name: institution.name  // Make sure this is being set correctly
      }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      console.log("Token generated successfully"); // Log token generation
      // Return the institution data and the token
      res.send({ institution, token });
    } catch (error) {
      console.error('Error during institution login:', error); // Log any other error that might occur
      res.status(400).send({ error: 'An error occurred during the login process.', details: error.message });
    }
  };

const registerStudent = async (req, res) => {
    const { name, studentID, email, course, institutionID, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    try {
        const student = await Student.create({
            studentID,
            name,
            email,
            course,
            institutionID,
            password: hashedPassword
        });
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send(error);
    }
};

const loginStudent = async (req, res) => {
    const { studentID, password } = req.body;

    try {
        const student = await Student.findOne({ where: { studentID } });
        if (!student || !await bcrypt.compare(password, student.password)) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }
        const token = jwt.sign({ studentID: student.studentID }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ student, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = { registerInstitution, loginInstitution, registerStudent, loginStudent};
