const { Service } = require('feathers-sequelize');

exports.Users = class Users extends Service {
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
        { model: models.majors },
        { model: models.study_programs }
      ]
    };
    return super.find(params);
  }

  async get(id, params) {
    const sequelize = this.app.get('sequelizeClient');
    const models = sequelize.models;
    params.sequelize = {
      raw: false,
      include: [
        { model: models.majors },
        { model: models.study_programs }
      ]
    };
    return super.get(id, params);
  }
};
