//清除小数后面没用的0
function re(val) {
	return parseFloat(val);
}
//限制两位小数
function checkAmount(amount) {
	if(amount == '' || amount == null) {
		return false;
	} else {
		reg = /^[0-9]+\.?[0-9]{0,2}$/;
		if(reg.test(amount) == false) {
			return false;
		}
		var aarray = amount.split('.');
		if(aarray.length == 2) {
			if(aarray[1].length == 0) {
				return false;
			}
		}
	}
	return true;
}
//去掉字符串中不要的字符,输出去掉后的字符串
/*
 m:不要的字符
 n:字符串
 * */
function splits(m,n){
    var q =	n.split(m);
    var p = "";
    for(var i in q){
    	p =p + q[i];
    }
    return p;
}
