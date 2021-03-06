﻿// -------------------------------
// テンプレート
function ss_template(obj) {
	var base_obj = {
		is_skill: true,
	};
	return $.extend(true, base_obj, obj);
}

function ss_condition(obj) {
	var base_obj = {
		is_cond: true,
	};
	return $.extend(true, base_obj, obj);
}

// -------------------------------
// 敵攻撃系
/**
 * 敵全体に指定属性のダメージ
 * r:		攻撃威力(ex: 1.0		-> 効果値100)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 * ignore_counter: 反射無視を行うかどうか(trueで無視)
**/
function ss_damage_all(r, attrs, ignore_counter) {
	return ss_template({
		name: "ss_damage_all",
		type: "damage",
		target: "all",
		p1: r,
		p2: attrs,
		p3: ignore_counter,
		c_param: {
			"awake_rateup": {
				target: 0,
				rate_mlt: 0.01,
			},
			"awake_rateup_normal": {
				target: 0,
				rate_mlt: 0.01,
			},
		},
	});
}

/**
 * 敵単体に指定属性のダメージ
 * r:		攻撃威力(ex: 1.0		-> 効果値100)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 * atn:		攻撃回数(ex: 3		-> 3連撃)
 * ignore_counter: 反射無視を行うかどうか(trueで無視)
**/
function ss_damage_s(r, attrs, atn, ignore_counter) {
	return ss_template({
		name: "ss_damage_s",
		type: "damage",
		target: "single",
		p1: r,
		p2: attrs,
		p3: atn,
		p4: ignore_counter,
		c_param: {
			"awake_rateup": {
				target: 0,
				rate_mlt: 0.01,
			},
			"awake_rateup_normal": {
				target: 0,
				rate_mlt: 0.01,
			},
			"Awake_multihitadd": {
				target: 2,
			},
		},
	});
}

/**
 * 敵全体に指定属性の連撃ダメージ
 * r:		攻撃威力(ex: 1.0		-> 効果値100)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 * atn:		攻撃回数(ex: 3		-> 3連撃)
 * ignore_counter: 反射無視を行うかどうか(trueで無視)
**/
function ss_damage_all_cons(r, attrs, atn, ignore_counter) {
	return ss_template({
		name: "ss_damage_all_cons",
		type: "damage",
		target: "all",
		p1: r,
		p2: attrs,
		p3: atn,
		p4: ignore_counter,
		c_param: {
			"awake_rateup": {
				target: 0,
				rate_mlt: 0.01,
			},
			"awake_rateup_normal": {
				target: 0,
				rate_mlt: 0.01,
			},
			"Awake_multihitadd": {
				target: 2,
			},
		},
	});
}

/**
 * 敵単体に指定属性の連撃＆連撃数だけチェイン数プラス
 * r:		攻撃威力(ex: 1.0		-> 効果値100)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 * atn:		攻撃回数(ex: 3		-> 3連撃)
**/
function ss_damage_slash(r, attrs, atn) {
	return ss_template({
		name: "ss_damage_slash",
		type: "damage",
		target: "single",
		p1: r,
		p2: attrs,
		p3: atn,
	});
}

/**
 * 敵全体に指定属性の攻撃＆敵の数だけチェイン数プラス
 * r:		攻撃威力(ex: 1.0		-> 効果値100)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 **/
function ss_damage_slash_all(r, attrs) {
	return ss_template({
		name: "ss_damage_slash_all",
		type: "damage",
		target: "single",
		p1: r,
		p2: attrs,
	});
}

/**
 * 指定した敵とその左右の敵に指定属性のダメージ
 * r:		攻撃威力(ex: 1.0		-> 効果値100)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 * r_side:  両脇の敵への威力(未指定ならrと同じ値を使用)
 **/
function ss_damage_explosion(r, attrs, r_side) {
	r_side = r_side || r;
	return ss_template({
		name: "ss_damage_explosion",
		type: "damage",
		target: "withside",
		p1: r,
		p2: attrs,
		p3: r_side,
	});
}

/**
 * 蓄積大魔術・聖【全体】（回復総量に応じたダメージを敵に与える）
 * max_r:	最高威力(表記値をそのまま書く)
 * max_v:   最高威力を出すのに必要な回復量(ex: 250000  → 25万回復時に最高威力)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 * 
 **/
function ss_accumulateDamageOfHeal_all(max_r, max_v, attrs) {
	return ss_template({
		name: "ss_accumulateDamageOfHeal",
		type: "damage",
		target: "all",
		is_acc: true,
		p1: max_r,
		p2: max_v,
		p3: attrs,
	});	
}

/**
 * 蓄積大魔術・聖【単体】（回復総量に応じたダメージを敵に与える）
 * max_r:	最高威力(表記値をそのまま書く)
 * max_v:   最高威力を出すのに必要な回復量(ex: 250000  → 25万回復時に最高威力)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 *
 **/
function ss_accumulateDamageOfHeal_s(max_r, max_v, attrs) {
	return ss_toselect_single(
		ss_accumulateDamageOfHeal_all(max_r, max_v, attrs)
	);
}

/**
 * 蓄積大魔術・邪【全体】（被ダメージ総量に応じたダメージを敵に与える）
 * max_r:	最高威力(ex: 71.0		-> 効果値7100)
 * max_v:   最高威力を出すのに必要なダメージ量(ex: 250000  → 25万ダメージ時に最高威力)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 *
 **/
function ss_accumulateDamageOfBurn_all(max_r, max_v, attrs) {
	return ss_template({
		name: "ss_accumulateDamageOfBurn",
		type: "damage",
		target: "all",
		is_acc: true,
		p1: max_r,
		p2: max_v,
		p3: attrs,
	});
}

/**
 * 蓄積大魔術・邪【単体】（被ダメージ総量に応じたダメージを敵に与える）
 * max_r:	最高威力(ex: 71.0		-> 効果値7100)
 * max_v:   最高威力を出すのに必要なダメージ量(ex: 250000  → 25万ダメージ時に最高威力)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 *
 **/
function ss_accumulateDamageOfBurn_s(max_r, max_v, attrs) {
	return ss_toselect_single(
		ss_accumulateDamageOfBurn_all(max_r, max_v, attrs)
	);
}

/**
 * 蓄積大魔術・破【全体】（ASオーバーキルダメージに応じたダメージを敵に与える）
 * max_r:	最高威力(ex: 71.0		-> 効果値7100)
 * max_v:   最高威力を出すのに必要なOverkillダメージ量(ex: 250000  → 25万超過ダメージ時に最高威力)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 *
 **/
function ss_accumulateDamageOfOverkill_all(max_r, max_v, attrs) {
	return ss_template({
		name: "ss_accumulateDamageOfOverkill",
		type: "damage",
		target: "all",
		is_acc: true,
		p1: max_r,
		p2: max_v,
		p3: attrs,
	});
}

/**
 * 蓄積大魔術・破【単体】（被ダメージ総量に応じたダメージを敵に与える）
 * max_r:	最高威力(ex: 71.0		-> 効果値7100)
 * max_v:   最高威力を出すのに必要なOverkillダメージ量(ex: 250000  → 25万超過ダメージ時に最高威力)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 *
 **/
function ss_accumulateDamageOfOverkill_s(max_r, max_v, attrs) {
	return ss_toselect_single(
		ss_accumulateDamageOfOverkill_all(max_r, max_v, attrs)
	);
}

/**
 * 統一大魔術【全体】（デッキの属性に応じたダメージを敵に与える）
 * max_r:	最高威力(ex: 71.0		-> 効果値7100)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 *
 **/
function ss_UnificationDamage_all(max_r, attrs) {
	return ss_template({
		name: "ss_UnificationDamage",
		type: "damage",
		target: "all",
		p1: max_r,
		p2: attrs,
	});
}

/**
 * 統一大魔術【単体】（デッキの属性に応じたダメージを敵に与える）
 * max_r:	最高威力(ex: 71.0		-> 効果値7100)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 *
 **/
function ss_UnificationDamage_s(max_r, attrs) {
	return ss_toselect_single(
		ss_UnificationDamage_all(max_r, attrs)
	);
}

/**
 * 捕食大魔術【全体】 デッキ内の(自身以外の)正解数カウントを全て消費して効果値を変動させる。
 * max_r:   効果値の最大値。
 * max_c:   効果値が最大になる正解数カウントの合計。
 * attrs:   攻撃属性
 **/
function ss_QuizcorrectDamage_all(max_r, max_c, attrs) {
	return ss_template({
		name: "ss_QuizcorrectDamage",
		type: "damage",
		target: "all",
		p1: max_r,
		p2: max_c,
		p3: attrs,
	});
}

/**
 * 捕食大魔術【単体】 デッキ内の(自身以外の)正解数カウントを全て消費して効果値を変動させる。
 * max_r:   効果値の最大値。
 * max_c:   効果値が最大になる正解数カウントの合計。
 * attrs:   攻撃属性
 **/
function ss_QuizcorrectDamage_s(max_r, max_c, attrs) {
	return ss_toselect_single(
		ss_QuizcorrectDamage_all(max_r, max_c, attrs)
	);
}


/**
 * パネル爆破大魔術【全体】 現在のパネルをすべて消費して、その属性に応じたダメージを与える。
 * rate:    攻撃1Hitにおける効果値。
 **/
function ss_PanelBurningDamage_all(rate) {
	return ss_template({
		name: "ss_PanelBurningDamage",
		type: "damage",
		target: "all",
		p1: rate,
	});
}

/**
 * パネル爆破大魔術【単体】 現在のパネルをすべて消費して、その属性に応じたダメージを与える。
 * rate:    攻撃1Hitにおける効果値。
 **/
function ss_PanelBurningDamage_s(rate) {
	return ss_toselect_single(
		ss_PanelBurningDamage_all(rate)
	);
}

/**
 * 敵全体に割合ダメージ
 * r: ダメージ割合(ex: 0.25 -> 25%)
**/
function ss_ratiodamage_all(r) {
	return ss_template({
		name: "ss_ratiodamage",
		type: "damage",
		subtype: "ratio",
		target: "all",
		p1: r,
	});
}

/**
 * 敵単体に割合ダメージ
 * r: ダメージ割合(ex: 0.25 -> 25%)
**/
function ss_ratiodamage_s(r) {
	return ss_template({
		name: "ss_ratiodamage",
		type: "damage",
		subtype: "ratio",
		target: "single",
		p1: r,
	});
}

/**
 * 味方全体スキルカウンター待機
 * r: 効果値
 * t: 継続ターン数
**/
function ss_skillcounter(r, t) {
	return ss_template({
		name: "ss_skillcounter",
		type: "turn_effect",
		subtype: "skill_counter",
		target: "ally",
		p1: r,
		p2: t,
	});
}

/**
 * 味方全体多段カウンター待機
 * t: 継続ターン数
 * r: 効果値
**/
function ss_dualcounter(t, r) {
	return ss_template({
		name: "ss_dualcounter",
		type: "turn_effect",
		subtype: "dual_counter",
		target: "ally",
		p1: t,
		p2: r,
	});
}

/**
 * 自身のみ多段カウンター待機
 * t: 継続ターン数
**/
function ss_dualcounter_own(t) {
	return ss_template({
		name: "ss_dualcounter",
		type: "turn_effect",
		subtype: "dual_counter",
		target: "own",
		p1: t,
	});
}

// ------------------------------------------------------
// 敵関連系
/**
 * 敵全体に毒の状態異常を付与
 * dm: ダメージ値
 * t: 継続ターン数
**/
function poison(dm, t) {
	return ss_template({
		name: "poison",
		type: "turn_effect",
		subtype: "poison",
		target: "all",
		p1: dm,
		p2: t,
		c_param: {
			"awake_rateup": {
				target: 0,
			},
			"awake_rateup_poison": {
				target: 0,
			},
			"awake_turnup": {
				target: 1,
			},
		},
	});
}

/**
 * 敵単体に時限大魔術
 * r:		攻撃威力(ex: 1.0		-> 効果値100)
 * attrs:	攻撃属性(ex: [0,1]	-> 火,水)
 * atkn:	攻撃回数(基本は1)
 * t:		発動ターン数(ex: 3		-> 3T後)
**/
function ss_damage_timebomb(r, attrs, atkn, t) {
	return ss_template({
		name: "ss_damage_timebomb",
		type: "damage",
		target: "single",
		p1: r,
		p2: attrs,
		p3: atkn,
		p4: t,
		c_param: {
			"Awake_bombTurnMinus": {
				target: 3,
			},
		},
	});
}

/**
 * 敵単体に無に帰す効果を付与する
 * turn: 即死効果発動ターン数
**/
function ss_death_limit(turn) {
	return ss_template({
		name: "ss_death_limit",
		type: "turn_effect",
		subtype: "death_limit",
		target: "single",
		p1: turn,
	});
}

/**
 * 敵単体に属性弱体化効果を付与する
 * attr: 弱体化対象属性(ex: [1,0,0,0,0] -> 火 / null: 全属性)
 * rate: 効果値(ex: 30%UP -> 1.3)
 * turn: 継続ターン数
**/
function ss_attr_weaken_s(attr, rate, turn) {
	return ss_template({
		name: "ss_attr_weaken",
		type: "turn_effect",
		subtype: "attr_weaken",
		target: "single",
		p1: attr ? attr : [1,1,1,1,1],
		p2: rate,
		p3: turn,
	});
}

/**
 * 敵全体に属性弱体化効果を付与する
 * attr: 弱体化対象属性(ex: [1,0,0,0,0] -> 火 / null: 全属性)
 * rate: 効果値(ex: 30%UP -> 1.3)
 * turn: 継続ターン数
**/
function ss_attr_weaken_all(attr, rate, turn) {
	var s = ss_attr_weaken_s(attr, rate, turn);
	s.target = "all";
	return s;
}

/**
 * 全体遅延スキル
 * turn: 遅延ターン数。
**/
function ss_delay_all(turn) {
	return ss_template({
		name: "ss_delay",
		type: "delay",
		target: "all",
		p1: turn,
	});
}

/**
 * 単体遅延スキル
 * turn: 遅延ターン数。
**/
function ss_delay_s(turn) {
	return ss_template({
		name: "ss_delay",
		type: "delay",
		target: "single",
		p1: turn,
	});
}

// ------------------------------------------------------
// 味方サポート系
/**
 * 味方全体に攻撃エンハンスを付与
 * p:	上昇値(ex: 0.6 -> 60%)
 * t:	継続ターン数
 * attr	付与対象の属性(ex; [1,0,0,0,0]	-> 火属性のみに付与)
**/
function ss_enhance_all(p, t, attr, calltype) {
	return ss_template({
		name: "ss_enhance",
		type: "turn_effect",
		subtype: "enhance",
		target: "ally",
		p1: p,
		p2: t,
		p3: attr,
		p4: calltype,
		c_param: {
			"awake_rateup": {
				target: 0,
				rate_mlt: 0.01,
				rate_max: 50,
			},
			"awake_rateup_enhance": {
				target: 0,
				rate_mlt: 0.01,
			},
			"awake_turnup": {
				target: 1,
			},
		},
	});
}

/**
 * 味方全体に攻撃エンハンスを付与(副属性込みで更にアップ)
 * p:		上昇値(ex: 0.6 -> 60%)
 * p_sub:	副属性一致時の上昇値
 * t:		継続ターン数
 * attr		付与対象の属性(ex; [1,0,0,0,0]	-> 火属性のみに付与)
 * subattr	付与対象の副属性
**/
function ss_enhance_all_subattr(p, p_sub, t, attr, subattr, calltype) {
	return ss_template({
		name: "ss_enhance_subattr",
		type: "turn_effect",
		subtype: "enhance",
		target: "ally",
		p1: p,
		p2: p_sub,
		p3: t,
		p4: attr,
		p5: subattr,
		p6: calltype,
		c_param: {
			"awake_rateup": {
				target: [0, 1],
				rate_mlt: 0.01,
				rate_max: 50,
			},
			"awake_rateup_enhance": {
				target: [0, 1],
				rate_mlt: 0.01,
			},
			"awake_turnup": {
				target: 2,
			},
		},
	});
}

/**
 * 自身に攻撃エンハンスを付与
 * p:	上昇値(ex: 0.6 -> 60%)
 * t:	継続ターン数
**/
function ss_enhance_own(p, t) {
	return ss_template({
		name: "ss_enhance",
		type: "turn_effect",
		subtype: "enhance",
		target: "own",
		p1: p,
		p2: t,
		p3: null,
		c_param: {
			"awake_rateup": {
				target: 0,
				rate_mlt: 0.01,
				rate_max: 50,
			},
			"awake_rateup_enhance": {
				target: 0,
				rate_mlt: 0.01,
			},
			"awake_turnup": {
				target: 1,
			},
		},
	});
}

/**
* ブーストエンハンス(毎ターン自傷を伴うエンハンス)を味方全体にかける
* p:	 効果値
* t:	 継続ターン数
* dmg:	 毎ターン受けるダメージの割合
* attr: 対象属性(ex. [1,0,0,0,0] -> 火属性のみ), 未指定で全属性
**/
function ss_boost_enhance_all(p, t, dmg, attr) {
	return ss_template({
		name: "ss_boost_enhance",
		type: "turn_effect",
		subtype: "enhance_boost",
		target: "ally",
		p1: p,
		p2: t,
		p3: dmg,
		p4: attr,
		c_param: {
			"awake_rateup_boost": {
				target: 0,
				rate_mlt: 0.01,
				rate_max: 25,
			},
			"awake_dmgup_boost": {
				target: 2,
				rate_mlt: 0.01,
			},
			"awake_turnup": {
				target: 1,
			},
		},
	});
}

/**
 * ブーストエンハンス(毎ターン自傷を伴うエンハンス)を自身にかける
 * p:	 効果値
 * t:	 継続ターン数
 * dmg:	 毎ターン受けるダメージの割合
**/
function ss_boost_enhance_s(p, t, dmg) {
	return ss_template({
		name: "ss_boost_enhance",
		type: "turn_effect",
		subtype: "enhance_boost",
		target: "own",
		p1: p,
		p2: t,
		p3: dmg,
		c_param: {
			"awake_rateup_boost": {
				target: 0,
				rate_mlt: 0.01,
				rate_max: 25,
			},
			"awake_dmgup_boost": {
				target: 2,
				rate_mlt: 0.01,
			},
			"awake_turnup": {
				target: 1,
			},
		},
	});
}

/**
 * 味方全体に撃破強化エンハンスを付与
 * b:	基礎値(ex: 0.6 -> 60%)
 * u:	上昇値(ex: 0.6 -> 60%)
 * m:	上限値(ex: 0.6 -> 60%)
 * t:	継続ターン数
 **/
function ss_kill_enhance_all(b, u, m, t) {
	return ss_template({
		name: "ss_kill_enhance",
		type: "turn_effect",
		subtype: "enhance",
		target: "ally",
		p1: b,
		p2: u,
		p3: m,
		p4: t,
	});
}


/**
 * 凶暴化(攻撃対象がランダムになり,常にクリティカル)を自身にかける
 * t:	 継続ターン数
 **/
function ss_berserk_s(t) {
	return ss_template({
		name: "ss_berserk",
		type: "turn_effect",
		subtype: "berserk",
		target: "own",
		p1: t,
	});
}

/**
 * 味方全体にAS倍率強化を付与する
 * rate_max: 効果値の最大値
 * mattr: 対象の主属性　ex. [0,0,1,0,0] で主雷が対象
 * sattr: 対象の副属性　ex. [0,1,0,0,0] で副水が対象
 * turn: 継続ターン数
 **/
function ss_asenhance_all(rate_max, mattr, sattr, turn) {
	return ss_template({
		name: "ss_asenhance",
		type: "turn_effect",
		subtype: "asenhance",
		target: "ally",
		p1: rate_max,
		p2: mattr,
		p3: sattr,
		p4: turn,
	});
}

/**
 * 味方全体に精霊強化効果を付与し、自分は行動不能になる
 * t: 行動不能ターン数
 * sss: ssの配列(ex: [ss_attr_guard([1,1,1,1,1], 0.1, 4, "RF"), ss_enhance_all(1, 4, [1,1,1,1,1], "RF")])
 * sssで呼び出す継続効果にはcalltype="RF"を付けること
 * sssで指定するスキルの継続ターン数は1にすること(毎ターンかけ直す)
**/
function ss_reinforcement_all(t, sss) {
	return ss_template({
		name: "ss_reinforcement",
		type: "turn_effect",
		subtype: "reinforcement",
		target: "ally",
		p1: t,
		p2: sss,
		delaychkparam: ["p2"],
	});
}

/**
 * 味方全体にステータスアップの効果を付与
 * up_arr:		上昇値(ex: [500,500] -> HP500,攻撃500UP)
 * up_limit:	上昇限界値(ex: [2000,2000] -> HP2000,攻撃2000以上は切り捨て)
 * t:			継続ターン数(ex: -1 -> 無制限)
 * attr:        上昇対象の属性
**/
function ss_statusup_all(up_arr, up_limit, t, attr) {
	return ss_template({
		name: "ss_statusup",
		type: "turn_effect",
		subtype: "statusup",
		target: "ally",
		p1: up_arr,
		p2: up_limit,
		p3: t,
		p4: attr,
	});
}

/**
 * 自身にステータスアップの効果を付与
 * up_arr:		上昇値(ex: [500,500] -> HP500,攻撃500UP)
 * up_limit:	上昇限界値(ex: [2000,2000] -> HP2000,攻撃2000以上は切り捨て)
 * t:			継続ターン数(ex: -1 -> 無制限)
**/
function ss_statusup_own(up_arr, up_limit, t) {
	return ss_template({
		name: "ss_statusup",
		type: "turn_effect",
		subtype: "statusup",
		target: "own",
		p1: up_arr,
		p2: up_limit,
		p3: t,
	});
}

/**
 * 味方全体にダメージブロックをかける
 * d:	無効ダメージ値
 * t:	継続ターン数
 * calltype: 未定義->SS "ringan"->凛眼
**/
function ss_damageblock_all(d, t, calltype) {
	return ss_template({
		name: "ss_damageblock",
		type: "turn_effect",
		subtype: "damageblock",
		target: "ally",
		p1: d,
		p2: t,
		p3: calltype,
	});
}

/**
 * 自身にダメージブロックをかける
 * d:	無効ダメージ値
 * t:	継続ターン数
**/
function ss_damageblock_own(d, t) {
	return ss_template({
		name: "ss_damageblock",
		type: "turn_effect",
		subtype: "damageblock",
		target: "own",
		p1: d,
		p2: t,
	});
}

/**
 * 味方全体に状態異常無効の効果を付与
 * t: 継続ターン数
**/
function ss_absattack_disable(t) {
	return ss_template({
		name: "ss_absattack_disable",
		type: "turn_effect",
		subtype: "state_guard",
		target: "ally",
		p1: t,
	});
}

/**
 * 味方全体に鉄壁の効果を付与
 * t: 継続ターン数
**/
function ss_impregnable_all(t) {
	return ss_template({
		name: "ss_impregnable",
		type: "turn_effect",
		subtype: "state_guard",
		target: "ally",
		p1: t,
	});
}

/**
 * 味方全体にダブルスキル効果を付与
 * t: 継続ターン数
 **/
function ss_doubleskill_all(t) {
	return ss_template({
		name: "ss_doubleskill",
		type: "turn_effect",
		subtype: "doubleskill",
		target: "ally",
		p1: t,
	});
}

/**
 * 味方全体にスキルブーストの効果を付与
 * f: 早めるターン数
**/
function ss_skillboost(f) {
	return ss_template({
		name: "ss_skillboost",
		type: "skillboost",
		target: "ally",
		p1: f,
	});
}

/**
 * 軽減スキル
 * attr: 軽減対象属性。(ex: [1,0,0,0,0] -> 火属性)
 * rate: 軽減割合。(ex. 0.2 -> 20%)
 * turn: 軽減継続ターン。
 * calltype: 未定義->SS "AS"->AS "精霊強化"->精霊強化
**/
function ss_attr_guard(attr, rate, turn, calltype) {
	return ss_template({
		name: "ss_attr_guard",
		type: "turn_effect",
		subtype: "attr_guard",
		target: "ally",
		p1: attr,
		p2: rate,
		p3: turn,
		p4: calltype,
	});
}


/**
 * AS変化スキル
 * turn: 継続ターン。
 * effects_obj: 秒数と適用するSSを組みにしたobject.
 *      ex: {
 *          "1": ss_enhance(), // 1秒以内でエンハンスをかける
 *          "no-excellent": ss_consume_all(), // エクセレント逃しをした際に自傷
 *      }
 **/
function ss_aseffectadd(turn, effects_obj) {
	return ss_template({
		name: "ss_aseffectadd",
		type: "turn_effect",
		subtype: "aseffectadd",
		target: "field",
		p1: turn,
		p2: effects_obj,
	});
}

// ------------------------------------------------------
// フィールド干渉系
/**
 * 残滅SSを発動する。
 * dmg_r:	SSでのダメージ率。表記+100。
 * cont_r:	継続ダメージ率。表記+100。
 * attrs:	攻撃ダメージ属性。
**/
function ss_continue_damage(dmg_r, cont_r, attrs, turn) {
	return ss_template({
		name: "ss_continue_damage",
		type: "damage",
		subtype: "continue_damage",
		target: "all",
		p1: dmg_r,
		p2: cont_r,
		p3: attrs,
		p4: turn,
		c_param: {
			"awake_rateup": {
				target: [0, 1],
				rate_mlt: 0.01,
			},
			"awake_rateup_normal": {
				target: [0, 1],
				rate_mlt: 0.01,
			},
			"awake_turnup": {
				target: 3,
			},
		},
	});
}

/**
 * 連鎖解放大魔術SSを発動する。
 * base_r:	基礎効果値。
 * max_r:	最大効果値。
 * max_ch:	最大効果値を出すのに必要なチェイン数。
 * attrs:	攻撃ダメージ属性。
 * exp_c:	ダメージの増加幅(指数部分)指定。不明な場合は0を指定すること。
 **/
function ss_burst_attack(base_r, max_r, max_ch, attrs, exp_c) {
	return ss_template({
		name: "ss_burst_attack",
		type: "damage",
		subtype: "burst_attack",
		target: "field",
		p1: base_r,
		p2: max_r,
		p3: max_ch,
		p4: attrs,
		p5: exp_c,
		c_param: {
		},
	});
}

/**
 * チェインを直接追加する。チェイン封印の効果を受けない。
 * ch: 追加チェイン数。
**/
function ss_addchain(ch) {
	return ss_template({
		name: "ss_addchain",
		type: "chain",
		target: "field",
		p1: ch,
	});
}

/**
 * チェイン保護する。チェイン封印を上書きする
 * t: 継続ターン。
**/
function ss_chain_protect(t) {
	return ss_template({
		name: "ss_chain_protect",
		type: "chain",
		target: "field",
		p1: t,
		c_param: {
			"awake_turnup": {
				target: 0,
			},
		},
	});
}

/**
 * チェイン犠牲強化を発動する。
 * r:       効果値。
 * red_ch:  減少チェイン数。
 * t:       継続ターン。
 **/
function ss_chain_enhance(r, red_ch, t) {
	return ss_template({
		name: "ss_chain_enhance",
		type: "chain",
		target: "field",
		p1: r,
		p2: red_ch,
		p3: t,
	});
}



// ------------------------------------------------------
// 味方回復系
/**
 * 味方全体を効果値だけ回復する。
 * p: 回復効果値(ex. 0.25 -> 25%)
**/
function ss_heal(p) {
	return ss_template({
		name: "ss_heal",
		type: "heal",
		target: "ally",
		p1: p,
	});
}

/**
 * 味方全体を効果値だけ回復、副属性が一致していたら更に回復する。
 * m_attr:  対象の主属性。(ex: [1,0,0,0,0] → 火属性)
 * m_p:     (主属性が一致した時)回復効果値(ex. 0.25 -> 25%)
 * s_attr:  対象の副属性。(ex: [0,1,0,0,0] → 水属性)
 * s_p:     (副属性も一致した時)回復効果値(ex. 0.80 -> 80%)
 **/
function ss_heal_subattr(m_attr, m_p, s_attr, s_p) {
	return ss_template({
		name: "ss_heal_subattr",
		type: "heal",
		target: "ally",
		p1: m_attr,
		p2: m_p,
		p3: s_attr,
		p4: s_p,
	});
}

/**
 * 自身を効果値だけ回復する。
 * p: 回復効果値(ex. 0.25 -> 25%)
**/
function ss_heal_own(p) {
	return ss_template({
		name: "ss_heal",
		type: "heal",
		target: "own",
		p1: p,
	});
}

/**
 * 味方全体を固定値だけ回復する。
 * p: 回復値
**/
function ss_heal_absolute(p) {
	return ss_template({
		name: "ss_heal_absolute",
		type: "heal",
		target: "ally",
		p1: p,
	});
}

/**
 * 味方全体の状態異常を回復する。
**/
function ss_abstate_cure() {
	return ss_template({
		name: "ss_abstate_cure",
		type: "heal",
		subtype: "abstate",
		target: "ally",
	});
}

/**
 * 味方全体にリジェネの効果を付与する
 * p: 回復割合
 * t: 継続ターン数
**/
function ss_regenerate(p, t, calltype) {
	return ss_template({
		name: "ss_regenerate",
		type: "turn_effect",
		subtype: "regenerate",
		target: "ally",
		p1: p,
		p2: t,
		p3: calltype,
	});
}

/**
 * 味方単体にリジェネの効果を付与する
 * p: 回復割合
 * t: 継続ターン数
**/
function ss_regenerate_own(p, t, calltype) {
	return ss_template({
		name: "ss_regenerate",
		type: "turn_effect",
		subtype: "regenerate",
		target: "own",
		p1: p,
		p2: t,
		p3: calltype,
	});
}

/**
 * 味方全体に起死回生の効果を付与する
 * r: 蘇生回復割合
 * t: 継続ターン数
**/
function ss_revival(r, t) {
	return ss_template({
		name: "ss_revival",
		type: "turn_effect",
		subtype: "revival",
		target: "ally",
		p1: r,
		p2: t,
	});
}

/**
 * 味方全体を蘇生する
 * r: 蘇生対象の属性(ex. [1,0,0,0,0] -> 火属性のみ)
 * p: 蘇生回復割合
**/
function ss_resurrection(r, p) {
	return ss_template({
		name: "ss_resurrection",
		type: "heal",
		subtype: "resurrection",
		target: "ally",
		p1: r,
		p2: p,
	});
}


// ------------------------------------------------------
// パネル変換/付与系

/**
 * パネル変換を行う。
 * attr: 変換属性。(ex: [1,0,0,0,0] -> 火属性)
 **/
function ss_panel_change(attr) {
	return ss_template({
		name: "ss_panel_change",
		type: "panel_change",
		target: "panel",
		p1: attr,
	});
}

/**
 * パネルリザーブ
 * attr: 変換属性。(ex: [1,0,0,0,0] -> 火属性)
 * turn: 持続ターン数
 * added_effects: 追加効果
 *      ex1: [panel_consume_add(0.2), panel_skillboost(1)]
 *          自傷20%, パネルブースト1のランダム付与(シミュ上では任意選択)
 *      ex2: [panel_multieffect([panel_consume_add(0.2), panel_skillboost(1)]) ]
 *          自傷20%, パネルブースト1の両立パネルを付与
 **/
function ss_panel_reserve(attr, turn, added_effects) {
	return ss_template({
		name: "ss_panel_reserve",
		type: "panel_change",
		target: "panel",
		p1: attr,
		p2: turn,
	});
}

/**
 * 複合パネル付与
 * pnls: 付与したいパネル効果を[]内に書く
 *  例
 *      // 攻撃力50%UP + チェインプラス2
 *      panel_multieffect([
 *          panel_attackup(0.5),
 *          panel_chainplus(2),
 *      ])
 **/
function panel_multieffect(...pnls){
	return ss_template({
		name: "panel_multieffect",
		type: "panel_add",
		target: "panel",
		p1: pnls,
		delaychkparam: ["p1"],
	});
}

/**
 * 攻撃力アップ効果をパネルに付与する
 * p: 攻撃力アップ割合
**/
function panel_attackup(p) {
	return ss_template({
		name: "panel_attackup",
		type: "panel_add",
		target: "panel",
		p1: p,
	});
}

/**
 * チェインプラス効果をパネルに付与する
 * p: 増加チェイン数
**/
function panel_chainplus(p) {
	return ss_template({
		name: "panel_chainplus",
		type: "panel_add",
		target: "panel",
		p1: p,
	});
}

/**
 * 回復付与効果をパネルに付与する
 * r: 回復割合
**/
function panel_healally(r) {
	return ss_template({
		name: "panel_healally",
		type: "panel_add",
		target: "panel",
		p1: r,
	});
}

/**
 * スキルブースト効果をパネルに付与する
 * t: ブースト数
**/
function panel_skillboost(t) {
	return ss_template({
		name: "panel_skillboost",
		type: "panel_add",
		target: "panel",
		p1: t,
	});
}

/**
 * パネルに軽減効果を付与する
 * attr: 軽減対象属性。(ex: [1,0,0,0,0] -> 火属性)
 * rate: 軽減割合。(ex. 0.2 -> 20%)
**/
function panel_attr_guard(attr, rate) {
	return ss_template({
		name: "panel_attr_guard",
		type: "panel_add",
		target: "panel",
		p1: attr,
		p2: rate,
	});
}

/**
 * パネルに自傷効果を付与する
 * rate: 自傷割合。(ex. 0.2 -> 20%)
 **/
function panel_consume_add(rate) {
	return ss_template({
		name: "panel_consume_add",
		type: "panel_add",
		target: "panel",
		p1: rate,
	});
}

// ------------------------------------------------------
// 解除系
/**
 * 敵のスキル反射効果を無効化する
 * （スキル攻撃後に記載することで無効化される）
**/
function ss_ignore_skillcounter() {
	return ss_template({
		name: "ss_ignore_skillcounter",
		type: "break",
		target: "all",
	});
}

/**
 * 敵の物理カウンター効果を無効化する
 * target: 「"all"」と記述することで全体対象、それ以外は単体対象
**/
function ss_break_attackcounter(target) {
	var tg = (target == "all") ? "all" : "single";
	return ss_template({
		name: "ss_break_attackcounter",
		type: "break",
		target: tg,
		p1: tg,
	});
}

/**
 * 敵のスキルカウンター効果を無効化する
 * target: 「"all"」と記述することで全体対象、それ以外は単体対象
**/
function ss_break_skillcounter(target) {
	var tg = (target == "all") ? "all" : "single";
	return ss_template({
		name: "ss_break_skillcounter",
		type: "break",
		target: tg,
		p1: tg,
	});
}

/**
 * 敵のガード効果を無効化する
 * target: 「"all"」と記述することで全体対象、それ以外は単体対象
**/
function ss_break_attrguard(target) {
	var tg = (target == "all") ? "all" : "single";
	return ss_template({
		name: "ss_break_attrguard",
		type: "break",
		target: tg,
		p1: tg,
	});
}

/**
 * 敵のダメージブロック効果を無効化する
 * target: 「"all"」と記述することで全体対象、それ以外は単体対象
**/
function ss_break_dblock(target) {
	var tg = (target == "all") ? "all" : "single";
	return ss_template({
		name: "ss_break_dblock",
		type: "break",
		target: tg,
		p1: tg,
	});
}

/**
 * 敵の属性吸収効果を無効化する
 * target: 「"all"」と記述することで全体対象、それ以外は単体対象
**/
function ss_break_absorb(target) {
	var tg = (target == "all") ? "all" : "single";
	return ss_template({
		name: "ss_break_absorb",
		type: "break",
		target: tg,
		p1: tg,
	});
}

// ------------------------------------------------------
// その他
/**
 * 前回発動したスキルをコピーする。
 * 
**/
function ss_latest_copy() {
	return ss_template({
		name: "ss_latest_copy",
		type: "skill_copy",
		is_skillcopy: true,
	});
}

// ------------------------------------------------------
// 未実装系
/**
 * パネルシャッフルを行う。
 * (引数なし)
**/
function ss_panel_shuffle() {
	return ss_template({
		name: "ss_panel_shuffle",
		type: "panel_change",
		target: "panel",
	});
}

/**
 * AS発動時間を延長する。
 * sec:	延長後のAS適用時間。
 * t:	延長適用ターン数。
**/
function ss_astime_ext(sec, t) {
	return ss_template({
		name: "ss_astime_ext",
		type: "others",
		p1: sec,
		p2: t,
	});
}

/**
 * 問題の選択肢を削る。
 * num: 削る選択肢の数。
**/
function ss_answer_narrow(num) {
	return ss_template({
		name: "ss_answer_narrow",
		type: "others",
		p1: num,
	});
}

/**
 * 問題の解答を見破る。
 * (引数なし)
**/
function ss_answer_foresight() {
	return ss_template({
		name: "ss_answer_foresight",
		type: "others",
	});
}

/**
 * 挑発効果を自身に付与する
 * rate: 軽減割合。(軽減効果がない場合は0を指定)
 * turn: 効果ターン数
**/
function ss_provocate(rate, turn) {
	return ss_template({
		name: "ss_provocate",
		type: "turn_effect",
		subtype: "provocate",
		target: "own",
		p1: rate,
		p2: turn,
	});
}

/**
 * 決闘効果を自身と敵1体に付与する
 * turn: 効果ターン数
 * rate: 軽減割合。(軽減効果がない場合は0を指定)
 * attr: 軽減属性。(軽減効果がない場合は[0,0,0,0,0]を指定)
 **/
function ss_duelmode(turn, rate, attr) {
	return ss_template({
		name: "ss_duelmode",
		type: "turn_effect",
		subtype: "duelmode",
		target: "single",
		p1: turn,
		p2: rate,
		p3: attr,
	});
}

// ------------------------------------------------------
// デメリット系
/**
 * 自分に割合ダメージを与える。
 * p: 与えるダメージ(ex. 0.1 -> 10%)
**/
function ss_consume_own(p) {
	return ss_template({
		name: "ss_consume_own",
		type: "demerit",
		p1: p,
	});
}

/**
 * 味方全体に割合ダメージを与える。
 * p: 与えるダメージ(ex. 0.1 -> 10%)
**/
function ss_consume_all(p) {
	return ss_template({
		name: "ss_consume_all",
		type: "demerit",
		p1: p,
	});
}

/**
 * 味方全体に切り上げの割合ダメージを与える。
 * p: 与えるダメージ(ex. 0.1 -> 10%)
 **/
function ss_consumeCeil_all(p) {
	return ss_template({
		name: "ss_consumeCeil_all",
		type: "demerit",
		p1: p,
	});
}

/**
 * 自身を封印状態にする
 * t: 封印ターン数
**/
function ss_allsealed_own(t) {
	return ss_template({
		name: "ss_allsealed_own",
		type: "demerit",
		p1: t,
	});
}


// ------------------------------------------------------
// 条件/効果値分岐系
/**
 * (条件系)HPが指定以上の時a,それ以外の場合bを返す。
 * cond: 条件HP(ex. 0.2 -> 20%)
 * a:	 条件を満たした時の値。
 * b:	 条件を満たさなかった時の値。
**/
function ss_hp_more(cond, a, b) {
	return ss_condition({
		name: "ss_hp_more",
		type: "own_hp",
		p1: cond,
		p2: a,
		p3: b,
	});
}

/**
 * (条件系)HPが指定以下の時a,それ以外の場合bを返す。
 * cond: 条件HP(ex. 0.2 -> 20%)
 * a:	 条件を満たした時の値。
 * b:	 条件を満たさなかった時の値。
**/
function ss_hp_less(cond, a, b) {
	return ss_condition({
		name: "ss_hp_less",
		type: "own_hp",
		p1: cond,
		p2: a,
		p3: b,
	});
}

/**
 * (条件系)HPが指定未満の時a,それ以外の場合bを返す。
 * cond: 条件HP(ex. 0.2 -> 20%)
 * a:	 条件を満たした時の値。
 * b:	 条件を満たさなかった時の値。
**/
function ss_hp_under(cond, a, b) {
	return ss_condition({
		name: "ss_hp_under",
		type: "own_hp",
		p1: cond,
		p2: a,
		p3: b,
	});
}

/**
 * (条件系)精霊がリーダーの時a,それ以外の場合bを返す。
 * a:	 条件を満たした時の値。
 * b:	 条件を満たさなかった時の値。
**/
function ss_when_leader(a, b) {
	return ss_condition({
		name: "ss_when_leader",
		type: "own_position",
		p1: a,
		p2: b,
	});
}

/**
 * (条件系)敵属性が指定属性と合致した時a,それ以外の場合bを返す。
 * attrs:	対象の敵属性。(ex. [1,0,0,0,0] -> 火属性が対象)
 * a:		条件を満たした時の値。
 * b:		条件を満たさなかった時の値。
**/
function special_attr(attrs, a, b) {
	return ss_condition({
		name: "special_attr",
		type: "enemy_attr",
		p1: attrs,
		p2: a,
		p3: b,
		c_param: {
			"awake_rateup_sp": {
				target: 1,
				rate_mlt: 0.01,
			},
		},
	});
}

/**
 * (条件系)現在の回答時間に応じて、a+b*timeの値を返す。
 * a: 基礎値。例えば1なら、最低保証値が1になる。
 * b: 乗算値。この値×(5-回答時間)が基礎値に追加される。
**/
function ss_answertime(a, b) {
	return ss_condition({
		name: "ss_answertime",
		type: "other",
		p1: a,
		p2: b,
	});
}

/**
 * (条件系)Lmodeの精霊数に応じて、a+b*numの値を返す。
 * a: 基礎値。例えば1なら、最低保証値が1になる。
 * b: 乗算値。この値×L精霊数が基礎値に追加される。
**/
function ss_legendnum(a, b) {
	return ss_condition({
		name: "ss_legendnum",
		type: "other",
		p1: a,
		p2: b,
	});
}

/**
 * (条件系)単属性の精霊数に応じて、a+b*numの値を返す。
 * a: 基礎値。例えば1なら、最低保証値が1になる。
 * b: 乗算値。この値×単属性精霊数が基礎値に追加される。
 **/
function ss_singleattr_num(a, b) {
	return ss_condition({
		name: "ss_singleattr_num",
		type: "other",
		p1: a,
		p2: b,
	});
}

/**
 * (条件系)発動回数に応じて値をn倍したものを返す。[r = a + b * c ^ x]
 * [例]効果値が320,640,...,6400と増加していく場合、ss_intenselyval(0, 3.2, 64)
 * a:	基礎値[無条件加算値]。
 * b:	乗算値。発動回数分掛け算される。初回発動時のxは0。
 * max:	効果値最大値。戻り値がこの値以上になった場合、この値に切り捨てられる。
 * c:   乗数。未指定なら自動的に2が割り当てられる。
**/
function ss_intenselyval(a, b, max, c) {
	c = c || 2;
	return ss_condition({
		name: "ss_intenselyval",
		type: "other",
		p1: a,
		p2: b,
		p3: max,
		p4: c
	});
}

/**
 * (条件系)味方全体の自傷を行い、自傷した数*基礎値の数値を返す。
 * base: 掛け算の基礎値。
 * p:	 自傷ダメージ割合。
**/
function ss_consume_all_cond(base, p) {
	return ss_condition({
		name: "ss_consume_all_cond",
		type: "consume_cond",
		p1: base,
		p2: p,
	});
}

/**
 * (条件系)味方全体に封印をかけ、対象数*基礎値の数値を返す。
 * base: 掛け算の基礎値。
**/
function ss_seal_all_cond(base, turn) {
	turn = turn || 1;
	return ss_condition({
		name: "ss_seal_all_cond",
		type: "consume_cond",
		p1: base,
		p2: turn,
	});
}

/**
 * (条件実行系)自身がAS封印の場合ssを実行する。
 * ss: 条件を満たした時のスキル。
**/
function ss_is_assealed_own_skill(ss) {
	return ss_condition({
		name: "ss_is_assealed_own_skill",
		type: "is_abstate_own",
		p1: ss,
		p2: null,
		is_delay: true,
	});
}

/**
 * (条件系)自身が状態異常の場合a,そうでない場合bを返す。
 * a: 条件を満たした時の値。
 * b: 条件を満たさなかった時の値。
**/
function ss_is_abstate_own(a, b) {
	return ss_condition({
		name: "ss_is_abstate_own",
		type: "is_abstate_own",
		p1: a,
		p2: b,
	});
}

/**
 * (条件系)自身が毒の場合a,そうでない場合bを返す。
 * a: 条件を満たした時の値。
 * b: 条件を満たさなかった時の値。
**/
function ss_is_poison_own(a, b) {
	return ss_condition({
		name: "ss_is_poison_own",
		type: "is_abstate_own",
		p1: a,
		p2: b,
	});
}

/**
 * (条件系)自身が呪いの場合a,そうでない場合bを返す。
 * a: 条件を満たした時の値。
 * b: 条件を満たさなかった時の値。
 **/
function ss_is_cursed_own(a, b) {
	return ss_condition({
		name: "ss_is_cursed_own",
		type: "is_abstate_own",
		p1: a,
		p2: b,
	});
}

/**
 * (条件系)相手が毒の場合a,そうでない場合bを返す。
 * a: 条件を満たした時の値。
 * b: 条件を満たさなかった時の値。
**/
function ss_is_poison_enemy(a, b) {
	return ss_condition({
		name: "ss_is_poison_enemy",
		type: "is_abstate_enemy",
		p1: a,
		p2: b,
	});
}

/**
 * (条件系)デッキ内の純属性精霊数に応じて効果値を変動させる。
 * max:     効果値の最大値。
 * t_attr:  対象の属性。
 **/
function ss_pureattr_cond(max, t_attr) {
	return ss_condition({
		name: "ss_pureattr_cond",
		type: "deckattr",
		p1: max,
		p2: t_attr,
	});
}

/**
 * (条件系)デッキ内の属性数(副属性込み)に応じて効果値を変動させる。
 * max:	効果値の最大値。
 **/
function ss_multiattr_cond(max) {
	return ss_condition({
		name: "ss_multiattr_cond",
		type: "deckattr",
		p1: max,
	});
}

/**
 * (条件系)デッキ内の(主属性+副属性)が一致する数に応じて効果値を変動させる。
 * max:	効果値の最大値。
 **/
function ss_matchattr_cond(max, m_attr, s_attr) {
	return ss_condition({
		name: "ss_matchattr_cond",
		type: "deckattr",
		p1: max,
		p2: m_attr,
		p3: s_attr
	});
}

/**
 * (条件系)チェインが一定以上の場合a,そうでない場合bを返す。
 * ch:	条件チェイン数。
 * a:	条件を満たした時の値。
 * b:	条件を満たさなかった時の値。
**/
function ss_chain_cond(ch, a, b) {
	return ss_condition({
		name: "ss_chain_cond",
		type: "chain",
		p1: ch,
		p2: a,
		p3: b,
	});
}

/**
 * (条件系)チェインが消費できる場合強制消費してa,そうでない場合bを返す。
 * ch:	消費するチェイン数。
 * a:	条件を満たした時の値。
 * b:	条件を満たさなかった時の値。
**/
function ss_chain_cost(ch, a, b) {
	return ss_condition({
		name: "ss_chain_cost",
		type: "chain",
		p1: ch,
		p2: a,
		p3: b,
	});
}

/**
 * (条件実行系)チェイン消費してSS分岐を行う
 * ch:	消費するチェイン数。
 * ss1:	消費して発動するSS。
 * ss2:	消費せず発動するSS。
**/
function ss_chain_cost_skill(ch, ss1, ss2) {
	return ss_condition({
		name: "ss_chain_cost_skill",
		type: "chain",
		p1: ch,
		p2: ss1,
		p3: ss2,
		is_delay: true,
	});
}

/**
 * (条件実行系)現在のチェイン数に応じて実行SSを分岐する際に使用する
 * ch:	条件チェイン
 * ss1:	条件を満たしていた場合に発動するSS
 * ss2:	条件を満たしていない場合に発動するSS
**/
function ss_chain_cond_skill(ch, ss1, ss2) {
	return ss_condition({
		name: "ss_chain_cond_skill",
		type: "chain",
		p1: ch,
		p2: ss1,
		p3: ss2,
		is_delay: true,
	});
}

/**
 * (条件実行系)自身のHPが指定%以上の時にスキルを実行する
 * r:	条件HP。
 * ss:	条件を満たした時に発動するSS。
**/
function ss_hp_more_skill(r, ss) {
	return ss_condition({
		name: "ss_hp_more_skill",
		type: "own_hp",
		p1: r,
		p2: ss,
		p3: null,
		is_delay: true,
	});
}

/**
 * (条件実行系)自身のHPが指定%以下の時にスキルを実行する
 * r:	条件HP。
 * ss:	条件を満たした時に発動するSS。
**/
function ss_hp_less_skill(r, ss) {
	return ss_condition({
		name: "ss_hp_less_skill",
		type: "own_hp",
		p1: r,
		p2: ss,
		p3: null,
		is_delay: true,
	});
}

/**
 * (条件実行系)自身が毒の場合にスキルを実行する。
 * ss: 条件を満たした時に発動するSS。
**/
function ss_is_poison_own_skill(ss) {
	return ss_condition({
		name: "ss_is_poison_own_skill",
		type: "is_abstate_own",
		p1: ss,
		p2: null,
		is_delay: true,
	});
}

/**
 * (条件実行系)自身が呪いの場合にスキルを実行する。
 * ss: 条件を満たした時に発動するSS。
 **/
function ss_is_cursed_own_skill(ss) {
	return ss_condition({
		name: "ss_is_cursed_own_skill",
		type: "is_abstate_own",
		p1: ss,
		p2: null,
		is_delay: true,
	});
}

// ------------------------------------------------------
// 内部用
/**
 * 全員のスキルを使用可能にする
**/
function spskill_maxcharge() {
	return ss_template({
		name: "spskill_maxcharge",
		type: "for_internal",
	});
}
function spskill_maxcharge_spec(specNo) {
	return ss_template({
		name: "spskill_maxcharge_spec",
		type: "for_internal",
		p1: specNo+1,
	});
}

/**
 * 未定義スキル
 **/
function ss_warning(str) {
	return ss_template({
		name: "ss_warning",
		type: "for_internal",
		p1: str,
	});
}
function ss_undefined(str, text) {
	return ss_template({
		name: "ss_undefined",
		type: "for_internal",
		p1: str,
		p2: text,
	});
}

