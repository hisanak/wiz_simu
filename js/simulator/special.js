<<<<<<< HEAD
<<<<<<< HEAD
// SSを発動する
function ss_push(n) {

	// SSターンをリセット
	Allys.Now[n].ss_current = 0;
	Allys.Now[n].ss_isfirst = false;
	// 再表示
	sim_show();
}

// Lモードに入っているかどうかを判定する
=======
=======
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,
�ｻｿ// SS繧堤匱蜍輔☆繧�
function ss_push(n) {


	// SS繧ｿ繝ｼ繝ｳ繧偵Μ繧ｻ繝�繝�
	Allys.Now[n].ss_current = 0;
	Allys.Now[n].ss_isfirst = false;
	// 蜀崎｡ｨ遉ｺ
	sim_show();
}

// L繝｢繝ｼ繝峨↓蜈･縺｣縺ｦ縺�繧九°縺ｩ縺�縺九ｒ蛻､螳壹☆繧�
<<<<<<< HEAD
>>>>>>> e22626d... 貎懷惠閭ｽ蜉幃未騾｣縺ｮ謨ｴ蛯�
=======
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,
function is_legendmode(card, ally_n) {
	return get_ssturn(card, ally_n)[1] == 0;
}

<<<<<<< HEAD
<<<<<<< HEAD
// SSが残り何ターンで打てるかを配列で返す
=======
// SS縺梧ｮ九ｊ菴輔ち繝ｼ繝ｳ縺ｧ謇薙※繧九°繧帝�榊�励〒霑斐☆
>>>>>>> e22626d... 貎懷惠閭ｽ蜉幃未騾｣縺ｮ謨ｴ蛯�
=======
// SS縺梧ｮ九ｊ菴輔ち繝ｼ繝ｳ縺ｧ謇薙※繧九°繧帝�榊�励〒霑斐☆
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,
function get_ssturn(card, ally_n) {
	// SS1 default
	var ss1_def = card.ss1.turn;
	// SS2 default
	var ss2_def = (card.islegend ? card.ss2.turn : undefined);
<<<<<<< HEAD
<<<<<<< HEAD
	// SSチャージターン
	var cg = ally_n.ss_current;
	// 発動してないかどうか
	var fst = ally_n.ss_isfirst;
	// 計算
	var ss1 = Math.max(ss1_def - cg - (fst ? has_fastnum(card) : 0), 0);
	var ss2 = ss2_def !== undefined ? (Math.max(ss2_def - cg - (fst ? has_fastnum(card) : 0), 0)) : undefined;
	// 返却
=======
=======
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,
	// SS繝√Ε繝ｼ繧ｸ繧ｿ繝ｼ繝ｳ
	var cg = ally_n.ss_current;
	// 逋ｺ蜍輔＠縺ｦ縺ｪ縺�縺九←縺�縺�
	var fst = ally_n.ss_isfirst;
	// 繝輔ぃ繧ｹ繝医ｒ縺�縺上▽謖√▲縺ｦ縺�繧九°
	var fast_num = has_fastnum(card);
	// 險育ｮ�
	var ss1 = Math.max(ss1_def - cg - (fst ? fast_num : 0), 0);
	var ss2 = ss2_def !== undefined ? (Math.max(ss2_def - cg - (fst ? fast_num : 0), 0)) : undefined;
	// 霑泌唆
<<<<<<< HEAD
>>>>>>> e22626d... 貎懷惠閭ｽ蜉幃未騾｣縺ｮ謨ｴ蛯�
=======
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,
	return [ss1, ss2];
}