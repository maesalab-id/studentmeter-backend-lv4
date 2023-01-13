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
      distinct: true,
      include: [
        {
          model: models.users,
          as: 'student',
          include: params.query.scheduleId ? [
            { required: true, attributes: { exclude: ['presentPhoto'] }, model: models.stats, where: { scheduleId: params.query.scheduleId } }
          ] : [],
        },
      ],
    };

    let filter = params.query.filter ? JSON.parse(params.query.filter) : null;
    let schedule = params.query.scheduleId ? await this.app.service('schedules').get(params.query.scheduleId) : null;

    delete params.query.scheduleId;
    delete params.query.filter;
    const assess = params.query.assess;
    delete params.query.assess;

    let attendances = await super.find(params);

    if (filter && schedule) {
      for (let i = 0; i < attendances.data.length; i++) {
        const attendance = attendances.data[i];
        const stats = attendance.student.stats;
        const lastStat = stats[stats.length - 1];
        let performance = {};
        for (let m = 0; m < schedule.assessments.length; m++) {
          const a = schedule.assessments[m];
          let total = a.stats.map((s) => lastStat.value[s]).reduce((p, c) => p + c, 0);
          performance[a.name] = Math.round(total / a.stats.length);
        }
        attendances.data[i].dataValues.student.dataValues.performance = !assess ? lastStat.value : performance;
      }
      attendances.data = attendances.data.filter((a) => {
        let pass = true;
        const keys = Object.keys(filter);
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          pass &= a.student.dataValues.performance[k] >= filter[k][0] && a.student.dataValues.performance[k] <= filter[k][1];
        }
        return pass;
      });
    }

    return attendances;
  }
};
