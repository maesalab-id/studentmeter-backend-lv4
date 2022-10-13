/* eslint-disable no-unused-vars */
exports.Enrollments = class Enrollments {
  constructor(options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find(params) {
    const sequelize = this.app.get('sequelizeClient');
    const user = params.user;
    const attendances = await sequelize.models.attendances.findAll({
      where: { studentId:  user.type === 'student' ? user.id : params.query.studentId },
      include: [{
        model: sequelize.models.classes,
        include: [{
          model: sequelize.models.schedules,
          include: [{
            model: sequelize.models.subjects
          }, {
            attributes: ['id', 'number'],
            model: sequelize.models.meetings,
            include: [{
              attributes: ['id'],
              model: sequelize.models.tasks,
              include: [{ attributes: ['id'], model: sequelize.models.submissions }]
            }]
          }],
        }]
      }]
    });
    return attendances;
  }

};
