<<<<<<< HEAD
<<<<<<< HEAD
// 解答したときの処理
function panel(attr) {
	var is_allkill = true;
	// もし誤答してたならチェインを切る
	if (attr.length <= 0) {
		Allys.Status.chain = 0;
	} else {
		// 全体について処理
		Allys.Status.chain += 1;
		// 各精霊について処理
		for (var i = 0; i < Allys.Deck.length; i++) {
			// AS処理
			answer_skill(i, attr);
			// SSチャージを1増やす
			Allys.Now[i].ss_current += 1;
		}
	}
	// 敵の処理
	for (var i = 0; i < Enemys.Data[Allys.Status.nowbattle - 1].enemy.length; i++) {
		// 全部の敵を倒してるかどうか判定する
		is_allkill = (is_allkill && Enemys.Data[Allys.Status.nowbattle - 1].enemy[i].nowhp == 0);
	}
	// 全ての敵を倒していたら
	if (is_allkill) {
		// 次に進む
=======
=======
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,
�ｻｿ// 隗｣遲斐＠縺溘→縺阪�ｮ蜃ｦ逅�
function panel(attr) {
	var is_allkill = true;
	// 繧ゅ＠隱､遲斐＠縺ｦ縺溘↑繧峨メ繧ｧ繧､繝ｳ繧貞��繧�
	if (attr.length <= 0) {
		Allys.Status.chain = 0;
	} else {
		// 蜈ｨ菴薙↓縺､縺�縺ｦ蜃ｦ逅�
		Allys.Status.chain += 1;
		// 蜷�邊ｾ髴翫↓縺､縺�縺ｦ蜃ｦ逅�
		for (var i = 0; i < Allys.Deck.length; i++) {
			// AS蜃ｦ逅�
			answer_skill(i, attr);
			// SS繝√Ε繝ｼ繧ｸ繧�1蠅励ｄ縺�
			Allys.Now[i].ss_current += 1;
		}
	}
	// 謨ｵ縺ｮ蜃ｦ逅�
	for (var i = 0; i < Enemys.Data[Allys.Status.nowbattle - 1].enemy.length; i++) {
		// 蜈ｨ驛ｨ縺ｮ謨ｵ繧貞�偵＠縺ｦ繧九°縺ｩ縺�縺句愛螳壹☆繧�
		is_allkill = (is_allkill && Enemys.Data[Allys.Status.nowbattle - 1].enemy[i].nowhp == 0);
	}
	// 蜈ｨ縺ｦ縺ｮ謨ｵ繧貞�偵＠縺ｦ縺�縺溘ｉ
	if (is_allkill) {
		// 谺｡縺ｫ騾ｲ繧�
<<<<<<< HEAD
>>>>>>> e22626d... 貎懷惠閭ｽ蜉幃未騾｣縺ｮ謨ｴ蛯�
=======
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,
		Allys.Status.nowbattle += 1;
		Allys.Status.durturn.push(Allys.Status.nowturn);
		Allys.Status.nowturn = 0;
	}
<<<<<<< HEAD
<<<<<<< HEAD
	// ターン追加
	Allys.Status.nowturn += 1;
	Allys.Status.totalturn += 1;
	// 表示
	sim_show();
}

// アンサースキルの処理
function answer_skill(no, attr) {
	// カード種類
	var card = Allys.Deck[no];
	var al_now = Allys.Now[no];
	// AS取得
	var ASkill = is_legendmode(card, al_now) ? card.AS2 : card.AS1;
	// 踏んだパネル色と属性のどれかが一致しているか確認
=======
=======
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,
	// 繧ｿ繝ｼ繝ｳ霑ｽ蜉�
	Allys.Status.nowturn += 1;
	Allys.Status.totalturn += 1;
	// 陦ｨ遉ｺ
	sim_show();
}

// 繧｢繝ｳ繧ｵ繝ｼ繧ｹ繧ｭ繝ｫ縺ｮ蜃ｦ逅�
function answer_skill(no, attr) {
	// 繧ｫ繝ｼ繝臥ｨｮ鬘�
	var card = Allys.Deck[no];
	var al_now = Allys.Now[no];
	// AS蜿門ｾ�
	var ASkill = is_legendmode(card, al_now) ? card.AS2 : card.AS1;
	// 雕上ｓ縺�繝代ロ繝ｫ濶ｲ縺ｨ螻樊�ｧ縺ｮ縺ｩ繧後°縺御ｸ�閾ｴ縺励※縺�繧九°遒ｺ隱�
<<<<<<< HEAD
>>>>>>> e22626d... 貎懷惠閭ｽ蜉幃未騾｣縺ｮ謨ｴ蛯�
=======
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,
	var is_match_attr = $.grep(attr, function (e) {
		return e == card.attr[0] || e == card.attr[1];
	}).length != 0;
	if (is_match_attr) {
<<<<<<< HEAD
<<<<<<< HEAD
		// エンハの処理

		// 攻撃スキルの処理

		// 回復スキルの処理
=======
=======
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,
		// 繧ｨ繝ｳ繝上�ｮ蜃ｦ逅�

		// 謾ｻ謦�繧ｹ繧ｭ繝ｫ縺ｮ蜃ｦ逅�

		// 蝗槫ｾｩ繧ｹ繧ｭ繝ｫ縺ｮ蜃ｦ逅�
<<<<<<< HEAD
>>>>>>> e22626d... 貎懷惠閭ｽ蜉幃未騾｣縺ｮ謨ｴ蛯�
=======
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,

	}
}

<<<<<<< HEAD
<<<<<<< HEAD
// 攻撃スキルの処理
function answer_attack(card, now, as, attr) {
	// それぞれの属性について処理を行う
	for (var i = 0; i < 2; i++) {
		// 属性無しなら処理しない
=======
=======
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,
// 謾ｻ謦�繧ｹ繧ｭ繝ｫ縺ｮ蜃ｦ逅�
function answer_attack(card, now, as, attr) {
	// 縺昴ｌ縺槭ｌ縺ｮ螻樊�ｧ縺ｫ縺､縺�縺ｦ蜃ｦ逅�繧定｡後≧
	for (var i = 0; i < 2; i++) {
		// 螻樊�ｧ辟｡縺励↑繧牙�ｦ逅�縺励↑縺�
<<<<<<< HEAD
>>>>>>> e22626d... 貎懷惠閭ｽ蜉幃未騾｣縺ｮ謨ｴ蛯�
=======
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,
		if (card.attr[i] === undefined) {
			continue;
		}



	}
}