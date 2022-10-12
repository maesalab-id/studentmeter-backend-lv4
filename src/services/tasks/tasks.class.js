const { Service } = require('feathers-sequelize');

exports.Tasks = class Tasks extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }

  async find(params) {
    const sequelize = this.app.get('sequelizeClient');
    const models = sequelize.models;
    params.sequelize = {
      raw: false,
      include: [{
        attributes: ['id', 'filename'],
        model: models.submissions,
        where: params.user.type === 'student' ? {
          studentId: params.user.id
        } : undefined,
        required: false
      }]
    };
    return await super.find(params);
  }
};
