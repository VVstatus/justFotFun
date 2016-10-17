
function pwdAES(id) {
	var $chars = 'abcdefghijklmnopqrstuvwxyz1234567890'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
	var maxPos = $chars.length;　　
	var pwd = '';　　
	for (i = 0; i < 32; i++) {　　　　
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
	}
	alert(pwd);
	plus.pluginPGKeyboard.openAESKeyboard(aes, "false", 1, 10, "true", "false", "false", pwd,
		function(result) {
			if (result) {
				if (result.status) {
					var json = result.payload;//cipherText
					var obj = $.parseJSON(json);
					document.getElementById(id).value = obj.text == null ? "" : obj.text;
				} else {
					alert(result.message);
				}
			} else {
				alert("调用插件时发生异常。");
			}
		},
		function(result) {
			alert(result);
		});
}
