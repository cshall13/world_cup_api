var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const creds = require('../config/creds');
const connection = mysql.createConnection(creds);

connection.connect();

router.post('/', (req, res)=>{

});

module.exports = router;
