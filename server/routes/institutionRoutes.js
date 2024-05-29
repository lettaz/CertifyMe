const express = require('express');
const auth = require('../middleware/auth');
const { listIssuedCertificates, updateInstitutionDetails, listAllInstitutions } = require('../controllers/institutionController');
const router = new express.Router();


router.get('/certificates', auth, listIssuedCertificates);
router.put('/update', auth, updateInstitutionDetails);
router.get('/all', listAllInstitutions);


module.exports = router;