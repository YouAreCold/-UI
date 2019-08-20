/*******************************************
 * 
 * Plug-in:T9nuoya页面加载效果
 * Author:Kevin
 * Time:2017/1/3
 *
 *********************************************/

jQuery.t9Loading = {
	start: function(options) {
		var defaults = {
			opacity: 1, //loading页面透明度
			backgroundColor: "#000", //loading页面背景色
			delayTime: 1000, //页面加载完成后，加载页面渐出速度
			zindex: 999, //loading页面层次
			sleep: 0 //设置挂起,等于0时则无需挂起
		}
		var options = $.extend(defaults, options);

		//获取页面宽高
		var _PageHeight = $(window).height(),
			_PageWidth = $(window).width();

		//在页面未加载完毕之前显示的loading Html自定义内容
		var _LoadingHtml = '<div id="loadingPage" style="position:fixed;left:0;top:0;position: absolute;width:100%;height:' + _PageHeight + 'px;background:' + options.backgroundColor + ';opacity:' + options.opacity + ';filter:alpha(opacity=' + options.opacity * 100 + ');z-index:' + options.zindex + ';overflow:hidden;"><canvas id="c" style="position:absolute;top:0;left:0;z-index:-1;"></canvas><div style="position:absolute;top:80px;left:120px;"><img src="./images/logo.png" width="100%" height="100%"/></div><div id ="main_img" style="position: absolute;top: 8%;left: 0px;right:0px;width:1149px;height:679px;margin:auto;"><img src="./images/demo2.png" width="100%" height="100%" /></div></div>';

		//呈现loading效果
		$("body").append(_LoadingHtml);

		var c = document.getElementById("c");
		var ctx = c.getContext("2d");
		c.width = _PageWidth;
		c.height = _PageHeight;
		//		ctx.fillRect(0,0,100,100);
		//		a,b,c,d分别代表x方向偏移,y方向偏移,宽，高
		var string1 = "abcdefghijklmnopqrstuvwxyz";
		string1.split("");
		var fontsize = 20;
		columns = c.width / fontsize;
		var drop = [];
		for(var x = 0; x < columns; x++) {
			drop[x] = 0;
		}
		setInterval(drap, 30);

		//监听页面加载状态
		document.onreadystatechange = PageLoaded;

		//当页面加载完成后执行
		function PageLoaded() {
			if(document.readyState == "complete") {
				var loadingMask = $('#loadingPage');

				setTimeout(function() {
						loadingMask.animate({
								"opacity": 0
							},
							options.delayTime,
							function() {
								$(this).hide();

							});

					},
					options.sleep);

			}
		}

		function drap() {
			ctx.fillStyle = "rgba(0,0,0,0.07)";
			ctx.fillRect(0, 0, c.width, c.height);
			ctx.fillStyle = "#0F0";
			ctx.font = fontsize + "px arial";
			for(var i = 0; i < drop.length; i++) {
				var text1 = string1[Math.floor(Math.random() * string1.length)];
				ctx.fillText(text1, i * fontsize, drop[i] * fontsize);
				drop[i]++;
				if(drop[i] * fontsize > c.height && Math.random() > 0.9) { //90%的几率掉落
					drop[i] = 0;
				}
			}
		}

		function centerLoader() {

			var winW = $(window).width();
			var winH = $(window).height();

			$('#loadingPage').css({
				'width': winW,
				'height': winH
			});

			c.width = winW;
			c.height = winH;

			//var img_width = $("#main_img").width();
			//$("#main_img").css({
			//'left':(winW/2)-(img_width/2)
			//})
		}

		$(window).load(function() {
			centerLoader();
			$(window).resize(function() {
				centerLoader();
			});
		});
	},
	end: function() {
		$("#loadingPage").remove();
	}
}