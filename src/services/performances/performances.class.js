const { Service } = require('feathers-sequelize');

exports.Performances = class Performances {
  constructor(options, app) {
    this.app = app;
  }

  async find(params) {
    const sequelize = this.app.get('sequelizeClient');
    const schedule = await sequelize.models.schedules.findByPk(params.query.scheduleId);
    let meetings = await sequelize.models.meetings.findAll({
      where: { scheduleId: params.query.scheduleId },
      include: [{
        model: sequelize.models.stats, where: { studentId: params.query.studentId }
      }],
      order: [['number', 'asc']],
    });
    meetings = JSON.parse(JSON.stringify(meetings));
    if (params.query.assess === '1') {
      for (let i = 0; i < meetings.length; i++) {
        const meeting = meetings[i];
        let stats = {};
        for (let k = 0; k < schedule.assessments.length; k++) {
          const a = schedule.assessments[k];
          let total = a.stats.map((s) => meeting.stats[0].value[s]).reduce((p, c) => p + c, 0);
          stats[a.name] = Math.round(total / a.stats.length);
        }
        meetings[i].stats[0].value = stats;
      }
    }
    return meetings;
  }
};
