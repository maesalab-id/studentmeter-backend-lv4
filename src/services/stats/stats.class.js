const { Service } = require('feathers-sequelize');

exports.Stats = class Stats extends Service {
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
        { model: models.users, as: 'student' },
      ]
    };

    let filter = params.query.filter ? JSON.parse(params.query.filter) : null;
    let schedule = await this.app.service('schedules').get(params.query.scheduleId);

    delete params.query.scheduleId;
    delete params.query.filter;
    const assess = params.query.assess;
    delete params.query.assess;


    let stats = await super.find(params);
    stats = JSON.parse(JSON.stringify(stats));

    if (filter) {
      for (let i = 0; i < stats.data.length; i++) {
        const stat = stats.data[i];
        let performance = {};
        for (let m = 0; m < schedule.assessments.length; m++) {
          const a = schedule.assessments[m];
          const total = a.stats.map((s) => stat.value[s]).reduce((p, c) => p + c, 0);
          performance[a.name] = Math.round(total / a.stats.length);
        }
        stats.data[i].value = !assess ? stat.value : performance;
      }
      stats.data = stats.data.filter((s) => {
        let pass = true;
        const keys = Object.keys(filter);
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          pass &= s.value[k] >= filter[k][0] && s.value[k] <= filter[k][1];
        }
        return pass;
      });
    }

    return stats;
  }
};
