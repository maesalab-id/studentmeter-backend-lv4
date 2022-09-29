const users = require('./users/users.service.js');
const majors = require('./majors/majors.service.js');
const studyPrograms = require('./study-programs/study-programs.service.js');
const subjects = require('./subjects/subjects.service.js');
const classes = require('./classes/classes.service.js');
const stats = require('./stats/stats.service.js');
const schedules = require('./schedules/schedules.service.js');
const meetings = require('./meetings/meetings.service.js');
const attendances = require('./attendances/attendances.service.js');
const performances = require('./performances/performances.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(majors);
  app.configure(studyPrograms);
  app.configure(subjects);
  app.configure(classes);
  app.configure(stats);
  app.configure(schedules);
  app.configure(meetings);
  app.configure(attendances);
  app.configure(performances);
};
