const { Service } = require('feathers-sequelize');

exports.Schedules = class Schedules extends Service {
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
        { model: models.subjects },
        {
          model: models.classes, attributes: ['id', 'name'],
          include: [{
            model: models.attendances, attributes: ['id']
          }]
        }
      ]
    };
    params.query = {
      lecturerId: params.user.id
    }
    return super.find(params);
  }
};
