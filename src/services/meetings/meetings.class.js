const { Service } = require('feathers-sequelize');

exports.Meetings = class Meetings extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }

  async create(data) {
    const meetings = await this.app.service('meetings').find({
      query: {
        scheduleId: data.scheduleId
      }
    });
    data.number = meetings.data.length + 1;
    data.date = new Date();
    const meeting = await super.create(data);
    const schedule = await this.app.service('schedules').get(data.scheduleId);
    const attendances = await this.app.service('attendances').find({
      query: {
        classId: schedule.classId
      }
    });
    await this.app.service('stats').create(attendances.data.map((a) => ({
      value: (function () {
        let value = {};
        for (let i = 0; i < schedule.stats.length; i++) {
          const stat = schedule.stats[i];
          value[stat] = null;
        }
        return value;
      })(),
      meetingId: meeting.id,
      studentId: a.studentId
    })));
    return meeting;
  }
};
