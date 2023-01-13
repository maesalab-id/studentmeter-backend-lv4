// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const stats = sequelizeClient.define('stats', {
    value: {
      type: DataTypes.JSON,
      allowNull: false
    },
    notes: {
      type: DataTypes.JSON,
      allowNull: false
    },
    presentPhoto: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    presentDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  stats.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    stats.belongsTo(models.users, { onDelete: 'cascade', as: 'student' });
    stats.belongsTo(models.meetings, { onDelete: 'cascade' });
    stats.belongsTo(models.schedules, { onDelete: 'cascade' });
  };

  return stats;
};
