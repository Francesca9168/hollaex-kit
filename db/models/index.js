'use strict';


var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/db.js')[env];


var sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

var db = {};
var model;

model = sequelize.import('affiliation', require('./affiliation'));
db[model.name] = model;
model = sequelize.import('audit', require('./audit'));
db[model.name] = model;
model = sequelize.import('balance', require('./balance'));
db[model.name] = model;
model = sequelize.import('coin', require('./coin'));
db[model.name] = model;
model = sequelize.import('deposit', require('./deposit'));
db[model.name] = model;
model = sequelize.import('login', require('./login'));
db[model.name] = model;
model = sequelize.import('order', require('./order'));
db[model.name] = model;
model = sequelize.import('otpCode', require('./otpCode'));
db[model.name] = model;
model = sequelize.import('pair', require('./pair'));
db[model.name] = model;
model = sequelize.import('resetPasswordCode', require('./resetPasswordCode'));
db[model.name] = model;
model = sequelize.import('token', require('./token'));
db[model.name] = model;
model = sequelize.import('trade', require('./trade'));
db[model.name] = model;
model = sequelize.import('user', require('./user'));
db[model.name] = model;
model = sequelize.import('verificationCode', require('./verificationCode'));
db[model.name] = model;
model = sequelize.import('verificationImage', require('./verificationImage'));
db[model.name] = model;
model = sequelize.import('status', require('./status'));
db[model.name] = model;
model = sequelize.import('fee', require('./fee'));
db[model.name] = model;
model = sequelize.import('announcement', require('./announcement'));
db[model.name] = model;

Object.keys(db).forEach(function(modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
