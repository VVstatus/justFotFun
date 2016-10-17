//var urlbase = "https://ydyx.lccb.com.cn:9443/markbank/";
var urlbase="https://60.10.20.15:8443/markbank/";
//var urlbase="http://10.18.10.159:9080/markbank/";
//var urlbase="http://192.168.0.102:8088/perbank/";
var alertStr="廊坊银行";
/**
 * @param {String} type 交易的名称
 * @param {JSON} params 提交数据
 * @param {Function} successCall 执行成功回调函数
 * @param {Function} errorCall 执行失败回调函数
 * @param {Boolean} wait 是否锁屏
 */
function appProduct(name, params, successCall, errorCall, wait) {
	var flag = null; //appInfo有几种请求，pinInfotype＝002的时候才需要登录
	if (name == 'appInfo' && params.picInfotype != '002') {
		flag = getFlag(name + '2');
	} else {
//		flag = getFlag(name);
	}
	if (flag && !new UserInfo().hasLogin()) {
		mui.toast('请先登录！');
		openLogin(this.main);
		return;
	}
	if (wait === undefined) {
		wait = true;
	}
	if (wait) {
		var waitTitle = '加载中...';
		if ('waitTitle' in params) {
			waitTitle = params.waitTitle;
			delete params.waitTitle;
		}
		plus.nativeUI.showWaiting(waitTitle, {
			padlock: true
		});
	}
	var url = urlbase + name + ".do";
	console.log('请求参数' + JSON.stringify(params));
	console.log('请求连接' + url);
	mui.ajax(url, {
		headers: {
			'APP_UUID': plus ? plus.device.uuid : '',
			'PLATFORM': plus ? plus.os.name : ''
		},
		data: params,
		dataType: 'json',
		type: 'post',
		timeout: 90000,
		success: function(data) {
			if (data == null) {
				alert('未查询到相关信息，请核实后再查询！');
				return;
			}
			console.log('返回信息:' + JSON.stringify(data));
			if (wait) {
				plus.nativeUI.closeWaiting();
			}
			if (data.ec == '20000') {
				alert('登录失效，请重新登录！');
				new UserInfo().clear();
				mui.fire(plus.webview.getLaunchWebview(), 'updateHeader', {
					login: 'n'
				});
				mui.toast('请先登录！');
				openLogin(this.main);
				return;
			}
			if (typeof successCall == 'function') {
				successCall(data);
			}
		},
		error: function(xhr, type, errorThrown) {
			console.log(name + "_" + type + "_" + url);
			if (wait) {
				plus.nativeUI.closeWaiting();
			}
			if (errorCall && errorCall['error'] && typeof errorCall['error'] == 'function') {
				console.log('errorCall');
				errorCall['error']();
			}
			plus.nativeUI.alert('网络请求超时，请稍后再试', undefined, alertStr, '确定');
		}
	});
}
/*
 * 上传照片
 * i，上传的照片编号
 * max，上传照片最大值
 * map,照片集合
 * fun，成功后的执行方法
 */
function uploadOneFile(i, max,name,map, fun) {
	max=map.size();
	var ulurl = urlbase+name+'.do';
	plus.nativeUI.closeWaiting();
	plus.nativeUI.showWaiting('正在上传第 ' + i + ' 张照片');
	var upload_1 = plus.uploader.createUpload(ulurl, {method: "post"},
		function(t, status) {
			if (status == 200) {
				if(i < max) {
					i++;
					uploadOneFile(i, max,name,map, fun);
				} else {
					plus.nativeUI.closeWaiting();
					mui.toast("照片上传成功！");
					if(fun!=null&&fun!=undefined){
					fun();	
					}				
				}
			} else {
				plus.nativeUI.closeWaiting();
				mui.toast("照片上传失败！");
				return;
			}
		}
	);
	if(map.get('picUpload' + i) != null && map.get('picUpload' + i) != '') {
		upload_1.addData("picUploadFile", map.get('picUpload' + i));
		upload_1.addFile(map.get('picUpload' + i), {key:'picUpload' + i});
		upload_1.start();
	}
}