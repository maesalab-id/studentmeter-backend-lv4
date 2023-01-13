const { Service } = require('feathers-sequelize');

exports.Scores = class Scores extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }

  async find(params) {
    const sequelize = this.app.get('sequelizeClient');
    const models = sequelize.models;
    params.sequelize = {
      raw: false,
      distinct: true,
      include: [{
        model: models.users,
        as: 'student'
      }]
    }
    return await super.find(params);
  }
};
