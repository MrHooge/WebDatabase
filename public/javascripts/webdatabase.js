/**
 * Created by yunfei on 2016/11/25.
 */

function initDatabase() {
    var db = getCurrentDb(); //初始化数据库
    if (!db) {
        alert("您的浏览器不支持HTML5本地数据库");
        return;
    }
    var dataObj = "select * from tooth limit 300;"

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

			db.transaction(function (context) {

				

	           context.executeSql('CREATE TABLE IF NOT EXISTS tooth ('+ keys +')');
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
					context.executeSql('INSERT INTO tooth ('+keys+') VALUES ('+datas+')');
				}
	           
         	});
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
