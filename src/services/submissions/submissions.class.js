const { Service } = require('feathers-sequelize');

exports.Submissions = class Submissions extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }

  async create(data, params) {
    data.studentId = params.user.id;
    data.file = Buffer.from(data.file, 'base64');
    return super.create(data);
  }

  async find(params) {
    const sequelize = this.app.get('sequelizeClient');
    const models = sequelize.models;
    params.sequelize = {
      raw: false,
      attributes: ['id', 'filename', 'createdAt', 'taskId', 'studentId'],
      include: [{
        model: models.users,
        as: 'student'
      }]
    }
    return super.find(params);
  }
};
