// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const submissions = sequelizeClient.define('submissions', {
    file: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    },
    filename: {
      type: DataTypes.STRING,
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
  submissions.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    submissions.belongsTo(models.tasks, { onDelete: 'cascade' });
    submissions.belongsTo(models.users, { onDelete: 'cascade', as: 'student' });
  };

  return submissions;
};
