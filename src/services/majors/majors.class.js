const { Service } = require('feathers-sequelize');

exports.Majors = class Majors extends Service {
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
        { model: models.study_programs }
      ]
    };
    return super.find(params);
  }
};
