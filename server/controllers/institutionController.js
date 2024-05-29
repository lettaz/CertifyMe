const { Institution, Student, Op } = require('../models');

const listIssuedCertificates = async (req, res) => {
    try {
        const certificates = await Student.findAll({
            where: { institutionID: req.user.institutionID, certID: { [Op.ne]: null } },
            attributes: ['studentID', 'name', 'course', 'certID']
        });
        res.send(certificates);
    } catch (error) {
        console.error('Error fetching issued certificates:', error);
        res.status(400).send({ error: error.message });
    }
};

const updateInstitutionDetails = async (req, res) => {
    const { name, email } = req.body;
    try {
        const institution = await Institution.findOne({ where: { institutionID: req.user.institutionID } });
        institution.name = name || institution.name;
        institution.email = email || institution.email;
        await institution.save();

        res.send({ message: 'Institution details updated successfully', institution });
    } catch (error) {
        console.error('Error updating institution details:', error);
        res.status(400).send({ error: error.message });
    }
};

const listAllInstitutions = async (req, res) => {
    try {
        const institutions = await Institution.findAll({
            attributes: ['institutionID', 'name']
        });
        res.send(institutions);
    } catch (error) {
        console.error('Error listing institutions:', error);
        res.status(400).send({ error: error.message });
    }
};


module.exports = { listIssuedCertificates, updateInstitutionDetails, listAllInstitutions };