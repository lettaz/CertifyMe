'use strict';
module.exports = (sequelize, DataTypes) => {
  const Institution = sequelize.define('Institution', {
    institutionID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});
  Institution.associate = function(models) {
    Institution.hasMany(models.Student, { foreignKey: 'institutionID' });
  };
  return Institution;
};
