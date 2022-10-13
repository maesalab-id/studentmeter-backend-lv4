const { Service } = require('feathers-sequelize');

exports.Schedules = class Schedules extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }

  async find(params) {
    const sequelize = this.app.get('sequelizeClient');
    const models = sequelize.models;
    const user = params.user;

    params.sequelize = {
      raw: false,
      include: [
        {
          required: true,
          model: models.subjects,
          where: user.type === 'study-program' ? { studyProgramId: user.studyProgramId } : undefined,
          include: [{
            required: true,
            model: models.study_programs,
            where: user.type === 'major' ? { majorId: user.majorId } : undefined
          }]
        },
        {
          model: models.classes, attributes: ['id', 'name'],
          include: [{
            model: models.attendances, attributes: ['id']
          }]
        },
        { model: models.users, as: 'lecturer' },
        {
          attributes: ['id', 'number'],
          model: sequelize.models.meetings,
          include: [{
            attributes: ['id'],
            model: sequelize.models.tasks,
            include: [{ attributes: ['id'], model: sequelize.models.submissions }]
          }]
        }
      ]
    };
    if (user.type == 'lecturer')
      params.query = { lecturerId: user.id }

    const schedules = await super.find(params);
    return schedules;
  }
};
