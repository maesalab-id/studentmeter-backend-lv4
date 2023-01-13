// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const scores = sequelizeClient.define('scores', {
    score: {
      type: DataTypes.JSON,
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
  scores.associate = function (models) {
    scores.belongsTo(models.users, { onDelete: 'cascade', as: 'student' });
    scores.belongsTo(models.schedules, { onDelete: 'cascade' });
  };

  return scores;
};
