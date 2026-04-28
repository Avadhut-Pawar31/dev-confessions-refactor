const confessionService = require('../services/confessionService');

exports.createConfession = (req, res) => {
  confessionService.createConfession(req, res);
};

exports.getAllConfessions = (req, res) => {
  confessionService.getAllConfessions(req, res);
};

exports.getSingleConfession = (req, res) => {
  confessionService.getSingleConfession(req, res);
};

exports.getConfessionsByCategory = (req, res) => {
  confessionService.getConfessionsByCategory(req, res);
};

exports.deleteConfession = (req, res) => {
  confessionService.deleteConfession(req, res);
};