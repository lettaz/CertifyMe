const express = require('express');
const auth = require('../middleware/auth');
const { issueCertificate, revokeCertificate, verifyCertificate } = require('../controllers/certificateController');
const router = new express.Router();


router.post('/issue', auth, issueCertificate);
router.post('/revoke', auth, revokeCertificate);
router.get('/verify/:university_id/:student_id', verifyCertificate);


module.exports = router;