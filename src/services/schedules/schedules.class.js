const { Service } = require('feathers-sequelize');
const moment = require('moment');

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

  async get(id, params) {
    if (!params.provider) return await super.get(id, params);
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

    const schedules = await super.get(id, params);
    return schedules;
  }

  async create(data) {
    console.log(data.startTime);
    let start = moment(data.startTime);
    delete data.startTime;
    const schedule = await super.create(data);
    for (let i = 1; i <= 16; i++) {
      const meeting = await this.app.service('meetings').create({
        scheduleId: schedule.id, number: i, date: start.toDate()
      });
      console.log(meeting);
      start.add(1, 'w');
    }
    return schedule;
  }

};
