const express = require('express');
const { registerInstitution, loginInstitution, loginStudent, registerStudent } = require('../controllers/authController');
const router = new express.Router();

router.post('/register', registerInstitution);
router.post('/login', loginInstitution);
router.post('/student/register', registerStudent);
router.post('/student/login', loginStudent);

module.exports = router;
