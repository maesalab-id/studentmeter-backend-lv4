// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const attendances = sequelizeClient.define('attendances', {
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  attendances.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    attendances.belongsTo(models.users, { onDelete: 'cascade', as: 'student' });
    attendances.belongsTo(models.classes, { onDelete: 'cascade' });
  };

  return attendances;
};
