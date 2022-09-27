var mysql = require('mysql');

var conn = mysql.createConnection({
	host: '127.0.0.1',
	port: 3306,
	user: 'root',
	password: '',
	database: 'csdl_project_findroom',
	multipleStatements: true
});

module.exports = conn;