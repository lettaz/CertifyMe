const express = require('express');
const auth = require('../middleware/auth');
const { checkCertificateIssuance, updateStudentDetails } = require('../controllers/studentController');
const router = new express.Router();

router.get('/check-certificate', auth, checkCertificateIssuance);
router.put('/update', auth, updateStudentDetails);

module.exports = router;