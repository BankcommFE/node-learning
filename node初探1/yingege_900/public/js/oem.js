var pwidth;
var pheight;
var webgl_play_module = 5;
$(function() {
	//收到oem信息。
	query_oem_name = function(asi) {
		console.log(asi)
		var basejson;
	if(asi.oem_name == 'bflq') {
			basejson = '/bflq.json';
			webgl_play_module = 1;
		} else if(asi.oem_name == 'clousoft') {
			basejson = '/clousoft.json'
			webgl_play_module = 2;
		} else if(asi.oem_name == 'dwbap') {
			basejson = '/dwbap.json';
			webgl_play_module = 3;
		} else if(asi.oem_name == 'zjsp') {
			basejson = '/zjsp.json';
			webgl_play_module = 4;
		}else if(asi.oem_name=='fudan'){
			basejson='/fudan.json';
			webgl_play_module = 5;
		}

		//获取oem目录下面的相应目录。
		$.getJSON('../oem/' + asi.oem_name + basejson, function(data) {
			//console.info("json", data);
			
			//更改title文字；
			$('#title').html(data.title);

			//console.log(data)
            //更改公司logo；
            var logo = document.createElement("img");
            logo.src=data.logo;

            var index_logo=document.getElementsByClassName('index_logo')[0];
            index_logo.appendChild(logo)

			//$('.index_logo>img').attr('src', data.logo);
			
			//发送询问主拼接视频
			ws.send(JSON.stringify({
				"method": "ask_joint_video_amount",
				"username": un
			}))
			
			//获得全景的宽高；
			pwidth=data.panorama_width;
			pheight=data.panorama_height;
			//是第二种模式，初始化页面两列的布局。
			if(data.modeal == 'second') {
				var panorama_height = data.panorama_height;
				var panorama_width = data.panorama_width;

				//让截图、录像、锁头等东西左浮动
				$('#i1,#i2').css({
					'float': 'left',
					'position': 'absolute',
					'top': '5px',
					'left': '5px',
					'cursor': 'pointer',
				})
				$('#ii1,#ii2').css({
					'float': 'left',
					'position': 'absolute',
					'top': '5px',
					'left': '25px',
					'cursor': 'pointer',
				})
				$('#iii1,#iii2').css({
					'float': 'left',
					'position': 'absolute',
					'top': '5px',
					'left': '45px',
					'cursor': 'pointer',
				})
				$('#d3 i').css({
					'float': 'left',
					'margin-right': '15px',
					'margin-top': '5px',
					'cursor': 'pointer',
				})
				//初始化两列布局，左侧全景，右侧小窗口。
				$("#cc_2").css({
					"display": "none"
				})
				$("#cc_1").css({
					"display": "block"
				})
				$("#cc_3").css({
					"display": "none"
				})
				$("#cc_4").css({
					"display": "none"
				})
				$("#cc_5").css({
					"display": "none"
				})
				$("#sq_1_2").layout('add', {
					id: "y_2_2",
					region: 'center',
					width: "100%",
					height: (1 / 3) * 100 + "%",
					split: true,
				})
				$("#sq_1_2").layout('add', {
					id: "y_2_1",
					region: 'north',
					width: "100%",
					height: (1 / 3) * 100 + "%",
					split: true,
				})
				$("#sq_1_2").layout('add', {
					id: "y_2_3",
					region: 'south',
					width: "100%",
					height: (1 / 3) * 100 + "%",
					split: true,
				})

				//调用公共部分函数。
				common_use('sq_1_1', panorama_width, panorama_height, 'y_2_1', 'y_2_2', 'y_2_3')
				//如果是第三种模式，初始化页面细长布局。
			} else if(data.modeal == 'third') {
				//console.log('sange')
				var panorama_height = data.panorama_height;
				var panorama_width = data.panorama_width;
				$("#cc_2").css({
					"display": "none"
				})
				$("#cc_1").css({
					"display": "none"
				})
				$("#cc_3").css({
					"display": "none"
				})
				$("#cc_4").css({
					"display": "block"
				})
				$("#cc_5").css({
					"display": "none"
				})
				$("#sq_4_4").layout('add', {
					id: "y_4_1",
					region: 'west',
					width: "50%",
					height: "100%",
					split: true,
				})
				$("#sq_4_4").layout('add', {
					id: "y_4_1",
					region: 'center',
					width: "50%",
					height: "100%",
					split: true,
				})

				common_use('sq_1_1', panorama_width, panorama_height, 'y_2_1', 'y_2_2', 'y_2_3')

				//如果是第一种模式，初始化原始布局。
			} else if(data.modeal == 'first') {
				var panorama_height = data.panorama_height;
				var panorama_width = data.panorama_width;
				//初始化一个上面3个，下面一个的方框布局
				$("#cc_2").css({
					"display": "block"
				})
				$("#cc_1").css({
					"display": "none"
				})
				$("#cc_3").css({
					"display": "none"
				})
				$("#cc_4").css({
					"display": "none"
				})
				$("#cc_5").css({
					"display": "none"
				})
				$("#sq_2_1").layout("remove", "west")
				$("#sq_2_1").layout("remove", "center")
				$("#sq_2_1").layout("remove", "east")
				$("#sq_2_2").layout("remove", "west")
				$("#sq_2_2").layout("remove", "center")
				$("#sq_2_2").layout("remove", "east")
				$("#sq_2_1").layout('add', {
					region: 'center',
					width: (1 / 3) * 100 + "%",
					id: "hu_1_2",
					split: true,
				})
				$("#sq_2_1").layout('add', {
					region: 'west',
					width: (1 / 3) * 100 + "%",
					id: "hu_1_1",
					split: true,
				})
				$("#sq_2_1").layout('add', {
					region: 'east',
					width: (1 / 3) * 100 + "%",
					id: "hu_1_3",
					split: true,
				})
				$("#sq_2_2").layout('add', {
					id: "hu_2_2",
					region: 'center',
					width: "100%",
					split: true,
				})

				//调用公共部分的函数。
				common_use('hu_2_2', panorama_width, panorama_height, 'hu_1_1', 'hu_1_2', 'hu_1_3')

			}else if(data.modeal=='fourth'){
				var panorama_height = data.panorama_height;
				var panorama_width = data.panorama_width;
				var original_panorama_width= data.original_panorama_width;
				var original_panorama_height= data.original_panorama_height;
				var screenwall_width = data.screenwall_width;
				var screenwall_height = data.screenwall_height;
				var anticlockwise_rotation = data.anticlockwise_rotation;
				$("#cc_5").css({
					"display": "block"
				})
				$("#cc_1").css({
					"display": "none"
				})
				$("#cc_3").css({
					"display": "none"
				})
				$("#cc_4").css({
					"display": "none"
				})
				$("#cc_2").css({
					"display": "none"
				})
				$("#sq_5_1").layout('add', {
					id: "hu_5_1",
					region: 'center',
					width: "100%",
					split: true,
				})
				common_use2("hu_5_1",panorama_width, panorama_height,original_panorama_width,original_panorama_height,screenwall_width,screenwall_height,anticlockwise_rotation)
			}

		}, "utf-8")
	}
})