'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    studentID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    course: DataTypes.STRING,
    institutionID: {
      type: DataTypes.STRING,
      references: {
        model: 'Institutions',
        key: 'institutionID'
      }
    },
    password: DataTypes.STRING,
    certID: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    Student.belongsTo(models.Institution, { foreignKey: 'institutionID' });
  };
  return Student;
};
