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

    let filter = params.query.filter ? JSON.parse(params.query.filter) : null;

    delete params.query.scheduleId;
    delete params.query.filter;

    let attendances = await super.find(params);

    if (filter) {
      for (let i = 0; i < attendances.data.length; i++) {
        const attendance = attendances.data[i];
        const stats = attendance.student.stats;
        const lastStat = stats[stats.length - 1];
        attendances.data[i].dataValues.student.dataValues.performance = lastStat.value;
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
