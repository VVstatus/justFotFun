window.onload = function() {
	var str = "看见了你考虑|新性别|01|是否境内居民|02|旧性别|01";
	var m = str.indexOf("旧性别");
	fun(str);
	alert(m);
}

function fun(str) {
	if (str.indexOf("北京") > 0) {
		alert(1);
	}
}