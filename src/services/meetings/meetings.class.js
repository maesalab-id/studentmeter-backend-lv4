const { Service } = require('feathers-sequelize');

exports.Meetings = class Meetings extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }

  async find(params) {
    if (!params.provider) return await super.find(params);

    const sequelize = this.app.get('sequelizeClient');
    const models = sequelize.models;
    params.sequelize = {
      raw: false,
      attributes: { exclude: ['lecturerPresentPhoto'] },
      include: [
        {
          attributes: ['id'],
          model: models.tasks,
          include: [{
            attributes: ['id', 'filename'],
            model: models.submissions,
            where: params.user.type === 'student' ? {
              studentId: params.user.id
            } : undefined,
            required: false
          }]
        }
      ]
    };
    return await super.find(params);
  }

  async create(data) {
    const meetings = await this.app.service('meetings').find({
      query: {
        scheduleId: data.scheduleId
      }
    });
    data.number = data.number ? data.number : meetings.data.length + 1;
    data.date = data.date ? data.date : new Date();
    const meeting = await super.create(data);
    const schedule = await this.app.service('schedules').get(data.scheduleId);
    const attendances = await this.app.service('attendances').find({
      query: {
        classId: schedule.classId
      }
    });
    const stats = await this.app.service('stats').create(attendances.data.map((a) => ({
      value: (function () {
        let value = {};
        for (let i = 0; i < schedule.stats.length; i++) {
          const stat = schedule.stats[i];
          value[stat] = null;
        }
        return value;
      })(),
      notes: (function () {
        let notes = {};
        for (let i = 0; i < schedule.stats.length; i++) {
          const stat = schedule.stats[i];
          notes[stat] = null;
        }
        return notes;
      })(),
      meetingId: meeting.id,
      studentId: a.studentId,
      scheduleId: schedule.id
    })));
    return meeting;
  }

  async patch(id, data) {
    if (data.lecturerPresentPhoto) {
      data.lecturerPresentPhoto = Buffer.from(data.lecturerPresentPhoto, 'base64');
      data.lecturerPresentDate = new Date();
    }
    const meeting = await super.patch(id, data);
    console.log(meeting);
    return meeting;
  }
};
