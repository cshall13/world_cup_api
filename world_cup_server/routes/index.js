var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const creds = require('../config/creds');
const connection = mysql.createConnection(creds);

connection.connect((error)=>{
	if(error) {
		throw error;
	}
});

router.get('/home', (req, res)=>{
	const selectQuery = `SELECT team.name, team.flag FROM world_cup.team WHERE team.id < 33`;
	;
	connection.query(selectQuery, (error, result)=>{
	  	if(error) {
	  		throw error;
	  	}
	  	console.log(result);
	  	let group_A = [result[0], result[1], result[2], result[3]];
	  	let group_B = [result[4], result[5], result[6], result[7]];
	  	let group_C = [result[8], result[9], result[10], result[11]];
	  	let group_D = [result[12], result[13], result[14], result[15]];
	  	let group_E = [result[16], result[17], result[18], result[19]];
	  	let group_F = [result[20], result[21], result[22], result[23]];
	  	let group_G = [result[24], result[25], result[26], result[27]];
	  	let group_H = [result[28], result[29], result[30], result[31]];
	  	const response = res.json({
	  		groups: [group_A, group_B, group_C, group_D, group_E, group_F, group_G, group_H],
	  		msg: "requestSuccess"
	  	});
  });
})

router.get('/teams', (req, res)=>{
	const selectQuery = `SELECT team.id, team.name, team.continent FROM world_cup.team WHERE team.id < 33`;
	;
	connection.query(selectQuery, (error, result)=>{
	  	if(error) {
	  		throw error;
	  	}
	  	console.log(result);
	  	let group_A = [result[0], result[1], result[2], result[3]];
	  	let group_B = [result[4], result[5], result[6], result[7]];
	  	let group_C = [result[8], result[9], result[10], result[11]];
	  	let group_D = [result[12], result[13], result[14], result[15]];
	  	let group_E = [result[16], result[17], result[18], result[19]];
	  	let group_F = [result[20], result[21], result[22], result[23]];
	  	let group_G = [result[24], result[25], result[26], result[27]];
	  	let group_H = [result[28], result[29], result[30], result[31]];
	  	const response = res.json({
	  		groups: [group_A, group_B, group_C, group_D, group_E, group_F, group_G, group_H],
	  		msg: "requestSuccess"
	  	});
  });
})

module.exports = router;
