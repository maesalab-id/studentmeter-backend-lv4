const { Service } = require('feathers-sequelize');

exports.Performances = class Performances extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }

  async find(params) {
    const sequelize = this.app.get('sequelizeClient');
    const meetings = await sequelize.models.meetings.findAll({
      where: { scheduleId: params.query.scheduleId },
      include: [{
        model: sequelize.models.stats, where: { studentId: params.query.studentId }
      }],
      order: [['number', 'asc']]
    });
    return meetings;
  }
};
