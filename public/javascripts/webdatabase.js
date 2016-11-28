/**
 * Created by yunfei on 2016/11/25.
 */

function initDatabase() {
    var db = getCurrentDb(); //初始化数据库
    if (!db) {
        alert("您的浏览器不支持HTML5本地数据库");
        return;
    }
    var dataObj = "select * from access_log;"

	$.ajax({
	    type: 'GET',
	    data: { tablesName: dataObj },
	    url: '/data',
	    success: function(data) {
			console.log(data);
			var len = data.length;
			var keys = '', keyArr = [];
			for ( var key in data[0]){
				if (!keys) {
					keys += key;
				} else {
					keys += ","+key; 
				}
				keyArr.push(key);
			}
			console.log(keys);

			// 创建表格 插入数据
			/*db.transaction(function (context) {
	           context.executeSql('CREATE TABLE IF NOT EXISTS access_log ('+ keys +')');
	           for (var i = 0; i < len; i++) {
					console.log(data[i]);
					var datas = '', val = '';
					for(var j = 0; j < keyArr.length; j++){
						val = data[i][keyArr[j]];
						if (!datas) {
							if(!isNaN(val)){
							   	datas += val;
							}else{
							   	datas += '\''+val+'\'';
							}
						} else {
							if(!isNaN(val)){
							   	datas += ","+val;
							}else{
							   	datas += ","+'\''+val+'\'';
							}
						}
					}
					context.executeSql('INSERT INTO access_log ('+keys+') VALUES ('+datas+')');
				}
	           
         	});*/
	    }
	});
}
function getCurrentDb() {
    //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
    //如果数据库不存在那么创建之
    var db = openDatabase("TestDB", "2.0", "it's to save demo data!", 100*1024 * 1024);
    return db;
}
initDatabase()

/**
 * 链接查询测试
 * innerJoin(db)		内联链接
 * leftJoin(db)			左连接
 * rightJoin(db)		右连接
 * union(db)			联合（去重）
 * unionAll(db)			联合（不去重）
 */
function innerJoin(){
	var db = getCurrentDb()
	db.transaction(function (context) {
		context.executeSql('SELECT Websites.name, access_log.count,access_log.date FROM Websites INNER JOIN access_log ON Websites.id=access_log.site_id ORDER BY access_log.count;', [], function (err, result){
			// console.log(result);
			var rows = result.rows, i;
			var len = rows.length
			console.log('innerJoin:');
			for(i = 0; i < len; i++){
				console.log(rows[i]);
			}
		});
	})
}

function leftJoin(){
	var db = getCurrentDb()
	db.transaction(function (context) {
		context.executeSql('SELECT Websites.name, access_log.count, access_log.date FROM Websites LEFT JOIN access_log ON Websites.id=access_log.site_id ORDER BY access_log.count DESC;', [], function (err, result){
			// console.log(result);
			var rows = result.rows, i;
			var len = rows.length
			console.log('leftJoin:');
			for(i = 0; i < len; i++){
				console.log(rows[i]);
			}
		});
	})
}

function rightJoin(){
	var db = getCurrentDb()
	db.transaction(function (context) {
		context.executeSql('SELECT Websites.name, access_log.count, access_log.date FROM access_log RIGHT JOIN Websites ON access_log.site_id=Websites.id ORDER BY access_log.count DESC;', [], function (err, result){
			// console.log(result);
			var rows = result.rows, i;
			var len = rows.length
			console.log('rightJoin:');
			for(i = 0; i < len; i++){
				console.log(rows[i]);
			}
		});
	})
}

function union(){
	var db = getCurrentDb()
	db.transaction(function (context) {
		context.executeSql('SELECT country FROM Websites UNION SELECT country FROM apps ORDER BY country;', [], function (err, result){
			// console.log(result);
			var rows = result.rows, i;
			var len = rows.length
			console.log('union:');
			for(i = 0; i < len; i++){
				console.log(rows[i]);
			}
		});
	})
}

function unionAll(){
	var db = getCurrentDb()
	db.transaction(function (context) {
		context.executeSql('SELECT country FROM Websites UNION ALL SELECT country FROM apps ORDER BY country;', [], function (err, result){
			// console.log(result);
			var rows = result.rows, i;
			var len = rows.length
			console.log('unionAll');
			for(i = 0; i < len; i++){
				console.log(rows[i]);
			}
		});
	})
}