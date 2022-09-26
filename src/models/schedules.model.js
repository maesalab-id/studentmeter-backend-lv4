// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const schedules = sequelizeClient.define('schedules', {
    stats: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  schedules.associate = function (models) {
    schedules.belongsTo(models.subjects, { onDelete: 'cascade' });
    schedules.belongsTo(models.users, { onDelete: 'cascade', as: 'lecturer' });
    schedules.belongsTo(models.classes, { onDelete: 'cascade' });
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return schedules;
};
