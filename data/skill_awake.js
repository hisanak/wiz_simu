<<<<<<< HEAD
<<<<<<< HEAD
// ファストスキル
function fastskill(t) {
	return {
		type: "ss_fast",
		turn: t,			// 短縮ターン数
=======
�ｻｿ// 繝輔ぃ繧ｹ繝医せ繧ｭ繝ｫ
function Fastskill(t) {
	return {
		type: "ss_fast",
		turn: t,			// 遏ｭ邵ｮ繧ｿ繝ｼ繝ｳ謨ｰ
>>>>>>> e22626d... 貎懷惠閭ｽ蜉幃未騾｣縺ｮ謨ｴ蛯�
	};
}

// 閾ｪ霄ｫ縺ｮ繧ｹ繝�繝ｼ繧ｿ繧ｹUp
function Statusup(hp, atk) {
	return {
		type: "own_status_up",
		up_hp: hp,
		up_atk: atk,
	};
}

// 螻樊�ｧ繧ｹ繝�Up
function Attr_statusup(hp, atk, attrs) {
	return {
		type: "status_up",
		attr: attrs,
		spec: create_specs(1),
		up_hp: hp,
		up_atk: atk,
	};
}

// 遞ｮ譌上せ繝�Up
function Spec_statusup(hp, atk, specs) {
	return {
		type: "status_up",
		attr: [1, 1, 1, 1, 1],
		spec: specific_specs(specs),
		up_hp: hp,
		up_atk: atk,
	};
}

// 荵晄ｭｻ荳�逕�(Narrow escape from the jaw of death)
function NEFTJOD(perc) {
	return {
		type: "neftjod",
		perc: perc,
	};
}

// 繝代ロ繝ｫ繝悶�ｼ繧ｹ繝�(迴ｾ迥ｶ縺ｧ縺ｯ菴輔ｂ縺励∪縺帙ｓ)
function Panel_boost(attrs, efv) {
	return {
		type: "panel_boost",
		attr: attrs,
		efv: efv,
	};
}

// 螻樊�ｧ霆ｽ貂�
function Attr_relief(attrs, perc) {
	return {
		type: "attr_relief",
		attr: attrs,
		perc: perc,
	};
}

// 謌ｦ蠕粂P蝗槫ｾｩ
function Heal_afterbattle(perc) {
	return {
		type: "heal_after_battle",
		perc: perc,
=======
�ｻｿ// 繝輔ぃ繧ｹ繝医せ繧ｭ繝ｫ
function Fastskill(t) {
	return {
		type: "ss_fast",
		turn: t,			// 遏ｭ邵ｮ繧ｿ繝ｼ繝ｳ謨ｰ
>>>>>>> 447b73f... 貎懷惠閭ｽ蜉帶棧邨�縺ｿ菴懈��,
	};
}

// 閾ｪ霄ｫ縺ｮ繧ｹ繝�繝ｼ繧ｿ繧ｹUp
function Statusup(hp, atk) {
	return {
		type: "own_status_up",
		up_hp: hp,
		up_atk: atk,
	};
}

// 螻樊�ｧ繧ｹ繝�Up
function Attr_statusup(hp, atk, attrs) {
	return {
		type: "status_up",
		attr: attrs,
		spec: create_specs(1),
		up_hp: hp,
		up_atk: atk,
	};
}

// 遞ｮ譌上せ繝�Up
function Spec_statusup(hp, atk, specs) {
	return {
		type: "status_up",
		attr: [1, 1, 1, 1, 1],
		spec: specific_specs(specs),
		up_hp: hp,
		up_atk: atk,
	};
}

// 荵晄ｭｻ荳�逕�(Narrow escape from the jaw of death)
function NEFTJOD(perc) {
	return {
		type: "neftjod",
		perc: perc,
	};
}

// 繝代ロ繝ｫ繝悶�ｼ繧ｹ繝�(迴ｾ迥ｶ縺ｧ縺ｯ菴輔ｂ縺励∪縺帙ｓ)
function Panel_boost(attrs, efv) {
	return {
		type: "panel_boost",
		attr: attrs,
		efv: efv,
	};
}

// 螻樊�ｧ霆ｽ貂�
function Attr_relief(attrs, perc) {
	return {
		type: "attr_relief",
		attr: attrs,
		perc: perc,
	};
}

// 謌ｦ蠕粂P蝗槫ｾｩ
function Heal_afterbattle(perc) {
	return {
		type: "heal_after_battle",
		perc: perc,
	};
}
