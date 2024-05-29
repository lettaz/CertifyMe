const { Student } = require('../models');

const checkCertificateIssuance = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: { studentID: req.user.studentID }
        });
        const hasCertificate = student && student.certID != null;
        res.send({ hasCertificate, studentID: student.studentID, certID: student.certID });
    } catch (error) {
        console.error('Error checking certificate issuance:', error);
        res.status(400).send({ error: error.message });
    }
};


const updateStudentDetails = async (req, res) => {
    const { name, email } = req.body;
    try {
        const student = await Student.findOne({ where: { studentID: req.user.studentID } });
        student.name = name || student.name;
        student.email = email || student.email;
        await student.save();

        res.send({ message: 'Student profile updated successfully', student });
    } catch (error) {
        console.error('Error updating student profile:', error);
        res.status(400).send({ error: error.message });
    }
};

module.exports = { checkCertificateIssuance, updateStudentDetails };