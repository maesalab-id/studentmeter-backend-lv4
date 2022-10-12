const { Service } = require('feathers-sequelize');

exports.Attendances = class Attendances extends Service {
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
        {
          model: models.users, as: 'student', include: params.query.scheduleId ? [
            { required: false, model: models.stats, where: { scheduleId: params.query.scheduleId } }
          ] : []
        },
      ]
    };
    delete params.query.scheduleId;
    return super.find(params);
  }
};
