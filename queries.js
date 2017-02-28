var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = "postgres://postgres:1q2w3e4r@localhost:5432/MockProject";
var db = pgp(connectionString);

// fetch all projects from the Project table
function getAllProjects(req, res, next) {
    db.any('SELECT * FROM "Project"')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            projects: data,
            message: 'Retrieved ALL projects'
          });
      })
      .catch(function (err) {
        return next(err);
      });
}

// fetch all projects by name from the Project table
function getProjectsByName(req, res, next) {
    db.any('SELECT * FROM "Project" WHERE LOWER("Name") LIKE LOWER(\'%' + req.query.projectname + '%\')')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            projects: data,
            message: 'Retrieved all projects with name'
          });
      })
      .catch(function (err) {
        return next(err);
      });
}

// fetch project from the Project table with given identifier
function getSingleProject(req, res, next) {
    db.any('SELECT * FROM "Project" WHERE "Project_ID" = ' + req.params.id)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            projects: data,
            message: 'Retrieved all projects with name'
          });
      })
      .catch(function (err) {
        return next(err);
      });
}

module.exports = {
  getAllProjects: getAllProjects,
  getProjectsByName: getProjectsByName,
  getSingleProject: getSingleProject
};
