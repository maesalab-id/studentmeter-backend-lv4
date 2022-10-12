/* eslint-disable no-unused-vars */
exports.Enrollments = class Enrollments {
  constructor(options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find(params) {
    const sequelize = this.app.get('sequelizeClient');
    const attendances = await sequelize.models.attendances.findAll({
      where: { studentId: params.user.id },
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
