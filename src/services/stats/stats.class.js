const { Service } = require('feathers-sequelize');

exports.Stats = class Stats extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }

  async find(params) {
    const sequelize = this.app.get('sequelizeClient');
    const models = sequelize.models;
    params.sequelize = {
      raw: false,
      include: [
        { model: models.users, as: 'student' },
      ]
    };
    return super.find(params);
  }
};
