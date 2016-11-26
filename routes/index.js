var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var mysqlConfig = require('../db/dbConfig');

var pool = mysql.createPool(mysqlConfig.mysql);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get mysql database
router.get('/data', function(req, res, next) {
    var tablesName = req.query.tablesName;
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
        // 建立连接 查询数据库
        connection.query(tablesName, function (err, colNames) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(colNames);
            }
        });

        // 释放连接
        connection.release();
    });
});

module.exports = router;
