// -------------------------
// 精霊データ
// -------------------------
Cards = [
	// No. -1: サンプルデータ ----------------
	{
		// 名前
		name: "デバッグに使いたまえよ つよい方の元帥",
		// 図鑑番号
		cardno: -1,
		// 画像読み込み用番号
		imageno: 3836,
		// LvMaxの時のHP
		hp: 4545,
		// LvMaxの時の攻撃力
		atk: 10293,
		// コスト
		cost: 500,
		// L精霊かどうか
		islegend: false,
		// 属性(0: fire, 1: water, 2: thunder, 3: light, 4: dark, -1: none)
		attr: [2,1],
		// 種族(0: 龍族, 1: 神族, 2: 魔族, 3: 天使, 4: 妖精, 5: 亜人, 
		//     6: 物質, 7: 魔法生物, 8: 戦士, 9: 術士, 10: アイテム, 11: AbCd)
		species: [8],
		// 潜在能力
		awakes: [
			// HPアップ200
			Statusup(200, 0),
			// パネルブースト雷Ⅰ
			Panel_boost([0, 0, 1], 1),
			// ファストスキルⅡ
			Fastskill(2),
			// 九死一生Ⅰ(30%)
			NEFTJOD(30),
			// パネルブースト雷Ⅰ
			Panel_boost([0, 0, 1], 1),
			// 雷属性攻撃力UpⅠ
			Attr_statusup(0, 100, [0, 0, 1]),
			// 水属性ダメージ軽減Ⅰ
			Attr_relief([0,1,0,0,0], 10),
			// 戦士攻撃力UpⅡ
			Spec_statusup(0, 200, [8]),
			// 戦士HPUpⅡ
			Spec_statusup(200, 0, [8]),
			// 戦後HP回復Ⅰ(10%)
			Heal_afterbattle(10),
		],
		// アンサースキル1
		as1: {
			// 説明
			desc: "3チェインで敵全体へダメージ(効果値: 1000)",
			// 内容
			proc: ChainAttack_plus(2.0, 0, 20, 3),
		},
		// スペシャルスキル1
		ss1: {
			// 説明
			desc: "敵全体へ雷属性のダメージ(効果値: 220)",
			// 発動にかかるターン
			turn: 3,
			// 内容
			proc: null,
		},
	},
	// ---------------------------------
	{name:"激烈大魔法使い アリエッタ・トワ",cardno:4691,imageno:5900,hp:1665,atk:4179,cost:45,islegend:true,attr:[1,0],species:[9],awakes:[Fastskill(1),Panel_boost([0,1,0],1),Attr_statusup(0,100,[0,1,0]),NEFTJOD(30),Statusup(0,200),Attr_statusup(100,0,[0,1,0]),Attr_relief([0,0,1,0,0],20),Fastskill(2),Spec_statusup(0,200,[9]),Spec_statusup(200,0,[9]),],Lawake:[Attr_statusup(0,100,[0,1,0]),Statusup(0,500),],as1:{desc:"3チェインで敵単体を3回連続攻撃(効果値:250)",proc:ChainDualAttack(3.5,3,3),},ss1:{desc:"敵単体へ水・火属性の5回連続ダメージ(効果値:180)",turn:5,proc:null,},as2:{desc:"3チェインで敵単体を3回連続攻撃(効果値:350)",proc:ChainDualAttack(4.5,3,3),},ss2:{desc:"敵単体へ水・火属性の5回連続ダメージ(効果値:380)",turn:8,proc:null,},},
	{
		name: "時忘れの新感覚 ユッカ",
		cardno: 4347,
		imageno: 6103,
		hp: 3494,
		atk: 2212,
		cost: 48,
		islegend: true,
		attr: [1, -1],
		species: [9],
		awakes: [
			Panel_boost([0, 1, 0], 1),
			Fastskill(1),
			Spec_statusup(200, 0, [9]),
			Attr_statusup(0, 100, [0, 1, 0]),
			Panel_boost([0, 1, 0], 1),
			NEFTJOD(30),
			Attr_statusup(100, 0, [0, 1, 0]),
			Spec_statusup(0, 200, [9]),
			Panel_boost([0, 1, 0], 1),
			Fastskill(2),
		],
		Lawake: [
			Statusup(500, 0),
			Statusup(0, 500),
		],
		as1: {
			desc: "5チェインで水属性の味方の攻撃力をアップ(効果値: 60)",
			proc: ChainEnhance(0.6, [0, 1, 0], 5),
		},
		ss1: {
			desc: "ジャンルパネルにチェインがプラス1の効果を付与",
			turn: 3,
			proc: null,
		},
		as2: {
			desc: "5チェインで水属性の味方の攻撃力をアップ(効果値: 90)",
			proc: ChainEnhance(0.9, [0, 1, 0], 5),
		},
		ss2: {
			desc: "ジャンルパネルにチェインがプラス2の効果を付与",
			turn: 5,
			proc: null,
		},
	},
];