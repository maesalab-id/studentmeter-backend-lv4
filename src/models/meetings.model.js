// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const meetings = sequelizeClient.define('meetings', {
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    lecturerPresentPhoto: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    lecturerPresentDate: {
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
  meetings.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    meetings.belongsTo(models.schedules, { onDelete: 'cascade' });
    meetings.hasMany(models.stats, { onDelete: 'cascade' });
    meetings.hasMany(models.tasks, { onDelete: 'cascade' });
  };

  return meetings;
};
