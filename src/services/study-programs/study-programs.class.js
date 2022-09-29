const { Service } = require('feathers-sequelize');

exports.StudyPrograms = class StudyPrograms extends Service {
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
        { model: models.majors }
      ]
    }
    return super.find(params);
  }
};
