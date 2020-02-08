var express = require('express');
var app = express();
var path = require('path');
//app.use(express.static('public'))
//var url = require('url')
var splite3 = require("./split3.js")
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, '../public/')));
var db = require("./split3.js").sql;
var url = require('url')
var request_num = 0
// bodyParser.urlencoded解析form表单提交的数据
app.use(bodyParser.urlencoded({
	extended: false
}));
//app.use(express.static('css'));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../', 'login.html'));
	// res.sendFile("D:/files/work/choujiang_1/node_test/login.html")
})

app.get('/table*', function(req, res) {
	console.info("我获取到的数据",req.query.data)
	request_num++
	// let data = encodeURIComponent('[{"name":"zhangsan","age":"20"}]')
	res.sendFile(path.join(__dirname, '../', 'table.html'));
	// res.sendFile("D:/files/work/choujiang_1/node_test/table.html")
})
app.get('/statistic', function(req, res) {
	res.send({request_num:request_num})
})

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname, '../', '404.html'));
   // res.sendFile("D:/files/work/choujiang_1/node_test/404.html")
});
// app.get('/table/:data/', function(req, res) {
// 	let data = encodeURIComponent('[{"name":"zhangsan","age":"20"}]')
// 	res.sendFile("D:/files/work/choujiang_1/node_test/table.html",{data:data})
	
// 	// console.log(req.params)
// 	// res.send(req.params)
	
	
// 	// res.sendFile("D:/files/work/choujiang_1/node_test/login.html")
// })






//app.all('/test.html&*',function(req, res){
//	console.log(url.parse(req.url).pathname)
//	res.sendFile("C:/Users/quay/Desktop/choujiang_1/node_test/test.html")
//})
var server = app.listen(8091, function() {
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 localhost:", port)
})

app.use(bodyParser.json());
app.post('/register', function(req, ress) {
	console.log(req.body.name)
	db.all("select * from user_infomation", function(err, res) {
		var x_status = 0;
		if(!err) {
			console.log(res)
			if(res.length == 0) {
				db.run("insert into user_infomation(username,userPassword) values(?,?)", [req.body.name, req.body.password], function(err, res) {
					if(!err) {
						ress.send(JSON.stringify({
							"register_result": "ok",
						}))
					} else {
						console.log(err)
					}
				})
			} else {
				for(var i = 0; i < res.length; i++) {
					if(res[i].userName == req.body.name) {
						ress.send(JSON.stringify({
							"register_result": "repeat",
						}))
						x_status = 1
						return;
					} else {

					}

				}
				if(x_status == 1) {
					x_status = 0
				} else if(x_status == 0) {
					console.log("1234")
					db.run("insert into user_infomation(userName,userPassword) values(?,?)", [req.body.name, req.body.password], function(err, res) {
						if(!err) {
							ress.send(JSON.stringify({
								"register_result": "ok",
							}))
						} else {
							console.log(err)
						}
					})
				}
			}

		} else {
			console.log(err);
		}
	});
})
app.post('/login', function(req, ress) {
	var login_status = 0
	console.log(req.body.name)
	db.all("select * from user_infomation", function(err, res) {
		if(!err) {
			for(var i = 0; i < res.length; i++) {
				if(res[i].userName == req.body.name && res[i].userPassword == req.body.password) {
					ress.send(JSON.stringify({
						"login_result": "ok",
					}))
					login_status = 1
					return;
				} else {

				}

			}
			if(login_status == 0) {
				ress.send(JSON.stringify({
					"login_result": "no_login",
				}))
			} else if(login_status == 1) {

			}

		} else {
			console.log(err)
		}
	})
})

//	pool.connect().then(client => {
//		client.query("Select * FROM login WHERE username = $1", [req.body.name],function(err,res){
//			if(err){
//				console.log(err)
//			}else if(res.rows[0]==undefined){
//				ress.send(JSON.stringify({
//					"method": "query_login",
//					"location": {
//						username: 'notok'
//					}
//				}))
//			}else if(res.rows[0]!=undefined&&req.body.name==res.rows[0].username&&req.body.password==res.rows[0].password){
//				ress.send(JSON.stringify({
//					"method": "query_login",
//					"location": {
//						username: 'ok',
//						password:'ok',
//						name:res.rows[0].username,
//						pwd:res.rows[0].password
//					}
//				}))
//			} else if(res.rows[0]!=undefined&&req.body.name==res.rows[0].username&&req.body.password!=res.rows[0].password){
//				//console.log('密码错误')
//				ress.send(JSON.stringify({
//					"method": "query_login",
//					"location": {
//						username: 'ok',
//						password:'notok'
//					}
//				}))
//			}
//		})
//	})