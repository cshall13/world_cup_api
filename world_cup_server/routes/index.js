var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const creds = require('../config/creds');
const connection = mysql.createConnection(creds);
const bcrypt = require('bcrypt-nodejs');
const randToken = require('rand-token');

connection.connect((error)=>{
	if(error) {
		throw error;
	}
});

router.get('/home', (req, res)=>{
	const selectQuery = `SELECT team.id, team.name, team.flag, team.g_match_played AS mp, team.g_win AS win, team.g_draw AS draw, team.g_lost AS lost, team.g_gf AS gf, team.g_ga AS ga, team.g_gd AS gd, team.points 
						FROM world_cup.team WHERE team.id < 33`;
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

router.get('/schedule', (req, res)=> {
	const selectQuery = `SELECT schedule.type, schedule.month, schedule.date, schedule.localTime, team1.name AS home, team1.flag AS home_flag, team2.name AS away, team2.flag AS away_flag, stadium.city, stadium.name, stadium.image
							FROM schedule, team AS team1, team AS team2, stadium
							WHERE schedule.home_id = team1.id
							AND schedule.away_id = team2.id
							AND schedule.stadium_id = stadium.id
							ORDER BY month, date, localTime`;
	connection.query(selectQuery, (error, result)=>{
		if(error) {
			throw error;
		}
		res.json({
			data: result,
			msg: "requestSuccess"
		})
	})
});

router.post('/register', (req, res)=>{
	const password = req.body.password;
	const hashedPassword = bcrypt.hashSync(password);
	const email = req.body.email;
	console.log(email, password);

	const insertUserQuery = `INSERT into user
		(email, password, token)
			VALUES
		(?, ?, ?)`;
	const token = randToken.uid(60);
	connection.query(insertUserQuery, [email, hashedPassword,token],(error, results)=>{
		if(error){throw error;}
		res.json({
			token,
			msg: "registerSuccess"
		})
	});
});

router.post('/login', (req, res)=>{
	const email = req.body.email;
	const password = req.body.password;

	const selectQuery = `SELECT * FROM user
	WHERE email= ?`;


	getUserValid = new Promise((accept, reject)=>{
		connection.query(selectQuery,[email], (error, results)=>{
			if(error){throw error;}

			// console.log(results[0].password)
			const validLogin = bcrypt.compareSync(password, results[0].password)
			// console.log(validLogin);
			if(validLogin){
				accept(results[0])
			}else{
				reject()
			}
		})		
	})

	getUserValid.then((user)=>{
		const token = randToken.uid(60);
		const updateToken = `UPDATE user
		SET token=?	
		WHERE id= ?`;

		connection.query(updateToken, [token, user.id], (error, results)=>{
			if(error){throw error;}
			// console.log(results);
			res.json({
				token,
				user,
				msg: "loginSuccess"
			})
		})
	})

	getUserValid.catch(()=>{
		console.log("Login Failed")
	})

})

module.exports = router;
