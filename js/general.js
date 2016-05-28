// ------------------------------------
// 便利関数
// ------------------------------------
 

// 画像のURLを返却する
function get_image_url(no) {
	if (no < 0) {
		return "/image/noimage.png";
	}
	return "http://i.quiz.colopl.jp/img/card/small/card_" + ("0000" + no).slice(-5) + "_0.png"
}


// 属性配列を属性文字列に変換する
function get_attr_string(attr) {
	Attr= [
		"火",
		"水",
		"雷",
		"光",
		"闇",
	]
	if (attr == undefined || attr.length < 1){
		return false;
	}else{
		isBIN = true;
		// 1,0表示の配列による属性を文字列にする
		attrstr = "";
		if(attr.length >= 5){
			for(var i = 0; i < 5; i++){
				if(attr[i] == 1){
					attrstr += attrstr != "" ? "・" : ""
					attrstr += Attr[i];
				}else if(attr[i] != 0){
					isBIN = false;
				}
			}
		}else{
			isBIN = false;
		}
		// 属性番号直打ちの配列による属性を文字列にする
		if(isBIN == false){
			attrstr = "";
			oldnum = -1;
			attr.sort(function(a,b){
				if( a < b ) return -1;
				if( a > b ) return 1;
				return 0;
			});
			for(var i = 0; i < attr.length; i++){
				if(oldnum == attr[i] || attr[i] > Attr.length - 1){
					return false;
				}else{
					attrstr += attrstr != "" ? "・" : ""
					attrstr += Attr[attr[i]];
					oldnum = attr[i];
				}
			}
		}
		if(attrstr == "火・水・雷・光・闇"){
			attrstr = "全";
		}
		attrstr += "属性";
		return attrstr;
	}
}


// 種族配列を種族文字列に変換する
function get_spec_string(spec) {
	Species= [
		"龍族",
		"神族",
		"魔族",
		"天使",
		"妖精",
		"亜人",
		"物質",
		"魔法生物",
		"戦士",
		"術士",
		"アイテム",
		"AbCd",
	]
	if (spec == undefined || spec.length < 1){
		return false;
	}else{
		specstr = "";
		oldnum = -1;
		spec.sort(function(a,b){
			if( a < b ) return -1;
			if( a > b ) return 1;
			return 0;
		});
		for(var i = 0; i < spec.length; i++){
			if(oldnum == spec[i] || spec[i] > Species.length - 1){
				return false;
			}else{
				specstr += specstr != "" ? "・" : ""
				specstr += Species[spec[i]];
				oldnum = spec[i];
			}
		}
		return specstr
	}
}