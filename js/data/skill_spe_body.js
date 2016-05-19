// SS関数定義リスト
var SpSkill = {
	// -----------------------------
	// 敵全体に属性ダメージ
	"ss_damage_all": function (fld, n, cobj, params) {
		var r = params[0];
		var attrs = params[1];
		var ignore_counter = params[2];

		for (var a = 0; a < attrs.length; a++) {
			var atr = attrs[a];
			for (var i = 0; i < GetNowBattleEnemys().length; i++) {
				// 攻撃
				ss_damage(fld, r, atr, 1, n, i, ignore_counter);
			}
		}
		return true;
	},
	// -----------------------------
	// 敵単体に属性ダメージ
	"ss_damage_s": function (fld, n, cobj, params) {
		var r = params[0];
		var attrs = params[1];
		var atkn = params[2];
		var ignore_counter = params[3];

		var enemys = GetNowBattleEnemys();
		for (var an = 0; an < atkn; an++) {
			for (var a = 0; a < attrs.length; a++) {
				// 攻撃
				var atr = attrs[a];
				var atk_order = auto_attack_order(enemys, atr, n);
				ss_damage(fld, r, atr, atkn, n, atk_order, ignore_counter);
			}
		}
		return true;
	},
	// -----------------------------
	// 敵全体にダメージ&残滅ダメージ
	"ss_continue_damage": function (fld, n, cobj, params) {
		var dmg_r = params[0];
		var cont_r = params[1];
		var attrs = params[2];
		var turn = params[3];
		// 参照用にコピーを取る
		var now_state = $.extend(true, {}, fld.Allys.Now[n]);
		// 普通のダメージ
		var sda = ss_damage_all(dmg_r + 1, attrs, true);
		fld.log_push("Unit[" + (n + 1) + "]: 継続ダメージSS(威力: " + dmg_r * 100 + ")");
		ss_object_done(fld, n, sda);
		// 継続効果追加
		ss_continue_effect_add({
			type: "continue_damage",
			turn: turn,
			lim_turn: turn,
			index: n,
			effect: function (f, oi, ceff) {
				// 発動時の攻撃力などをコピーする
				var f_copy = $.extend(true, {}, f);
				f_copy.Allys.Now[oi] = now_state;
				// 継続ダメージ
				fld.log_push("Unit[" + (n + 1) + "]: 継続ダメージ発動(" + (cont_r * 100) + ")");
				var sda = ss_damage_all(cont_r + 1, attrs, true);
				ss_object_done(fld, n, sda);
				// SS状況を解除
				var es = GetNowBattleEnemys();
				for (var i = 0; i < es.length; i++) {
					es[i].flags.is_ss_attack = false;
				}
			}
		});
		return true;
	},
	// -----------------------------
	// 敵全体に割合ダメージ
	"ss_ratiodamage_all": function (fld, n, cobj, params) {
		var ratio = params[0];
		var enemys = GetNowBattleEnemys();
		for (var i = 0; i < enemys.length; i++) {
			var e = enemys[i];
			var dmg = Math.floor(e.nowhp * ratio);
			e.nowhp = Math.max(e.nowhp - dmg, 0);
			// SSフラグを立てる
			e.flags.is_ss_attack = true;
			// ダメージを与えた
			e.flags.on_damage = true;
			fld.log_push("Enemy[" + (i + 1) + "]: 割合ダメージ(" + (ratio * 100) + "%)(" + dmg + "ダメージ)");
		}
		// 敵ダメージ反応系
		enemy_damage_switch_check();
		return true;
	},
	// -----------------------------
	// 敵単体に割合ダメージ
	"ss_ratiodamage_s": function (fld, n, cobj, params) {
		var ratio = params[0];
		var enemys = GetNowBattleEnemys();
		var tg = auto_attack_order(enemys, -1, n);
		var e = enemys[tg];
		var dmg = Math.floor(e.nowhp * ratio);
		e.nowhp = Math.max(e.nowhp - dmg, 0);
		// SSフラグを立てる
		e.flags.is_ss_attack = true;
		fld.log_push("Enemy[" + (tg + 1) + "]: 割合ダメージ(" + (ratio * 100) + "%)(" + dmg + "ダメージ)");
		// 敵ダメージ反応系
		e.flags.on_damage = true;
		enemy_damage_switch_check();
		return true;
	},
	// -----------------------------
	// スキルカウンター待機
	"ss_skillcounter": function (fld, n, cobj, params) {
		var rate = params[0];
		var turn = params[1];
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			if (now.nowhp <= 0) { continue; }
			now.turn_effect.push({
				desc: "スキルカウンター待機(" + (rate * 100) + "%)",
				type: "ss_skill_counter",
				icon: "skill_counter",
				isdual: false,
				iscursebreak: true,
				turn: turn,
				lim_turn: turn,
				// 優先度: 最大
				priority: 99,
				// スキルカウンター定義
				effect: function (f, oi, teff, state, is_t, is_b) {
					var card = f.Allys.Deck[oi];
					var now_e = f.Allys.Now[oi];
					var sc_flag = now_e.flags.skill_counter;
					// スキルカウンター前行動
					var is_sc_cancel = $.grep(now_e.turn_effect, function (e) {
						return e.bef_skillcounter && !e.bef_skillcounter(f, oi);
					}).length > 0;
					if (is_t && !is_b && sc_flag.length > 0 && !is_sc_cancel) {
						f.log_push("Unit[" + (oi + 1) + "]: スキルカウンター発動(" + (rate * 100) + "%)");
						// スキルカウンター対象の敵の数だけ繰り返す
						for (var sci = 0; sci < sc_flag.length; sci++) {
							if (!sc_flag[sci]) { continue; }
							for (var atri = 0; atri < card.attr.length; atri++) {
								// 攻撃
								if (card.attr[atri] >= 0) {
									ss_damage(f, rate, card.attr[atri], 1, oi, sci, true);
									GetNowBattleEnemys(sci).flags.on_damage = true;
								}
							}
						}
						// 敵ダメージ反応系
						enemy_damage_switch_check();
						// スキル反射フラグを解除
						f.Allys.Now[oi].flags.skill_counter = [];
					}
				},
			});
		}
		fld.log_push("スキルカウンター待機(" + (rate * 100) + "%, " + turn + "t)");
		return true;
	},
	// -----------------------------
	// 毒ダメージを与える
	"poison": function (fld, n, cobj, params) {
		var dmg = params[0];
		var t = params[1];
		var enemys = GetNowBattleEnemys();
		for (var i = 0; i < enemys.length; i++) {
			(function () {
				var indx = i;
				var e = enemys[indx];
				if (e.nowhp <= 0) { return; }
				e.turn_effect.push({
					desc: "毒(" + dmg + ")",
					type: "poison",
					icon: "poison",
					isdual: false,
					turn: t,
					lim_turn: t,
					is_poison: true,
					effect: function (f, ei, teff, state, is_t, is_b) {
						if (is_t && !is_b) {
							e.nowhp = Math.max(e.nowhp - dmg, 0);
							e.flags.on_damage = true;
							if (e.nowhp <= 0) {
								// HPが0になったら敵スキルを全て解除
								turneff_allbreak(e.turn_effect, ei, false);
							}
							fld.log_push("Enemy[" + (indx + 1) + "]: 毒(" + dmg + "ダメージ)");
						}
						// 敵ダメージ反応系
						enemy_damage_switch_check();
					},
				});
			})();
			// SSフラグを立てる
			enemys[i].flags.is_ss_attack = true;
		}
		return true;
	},
	// -----------------------------
	// 全体エンハ
	"ss_enhance_all": function (fld, n, cobj, params) {
		var attr = params[2];
		if (!attr) {
			// 属性未指定なら全属性Up
			attr = [1, 1, 1, 1, 1];
		}
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var cd = fld.Allys.Deck[i];
			var now = fld.Allys.Now[i];
			if (now.nowhp > 0 && attr[cd.attr[0]] > 0) {
				SpSkill["ss_enhance_own"](fld, i, cobj, params);
			}
		}
		return true;
	},
	// -----------------------------
	// 単体エンハ
	"ss_enhance_own": function (fld, n, cobj, params) {
		var rate = params[0];
		var t = params[1];
		var now = fld.Allys.Now[n];
		now.turn_effect.push({
			desc: "攻撃力アップ(" + (rate * 100) + "%)",
			type: "ss_enhance",
			icon: "enhance",
			isdual: false,
			iscursebreak: true,
			turn: t,
			lim_turn: t,
			effect: function (f, oi, teff, state) {
				if (state == "first") {
					f.Allys.Now[oi].ss_enhance = rate;
				}
				else if (state == "end" || state == "dead") {
					f.Allys.Now[oi].ss_enhance = 0;
				}
			},
		});
		fld.log_push("Unit[" + (n + 1) + "]: 攻撃力Up(" + (rate * 100) + "%, " + t + "t)");
		return true;
	},
	// -----------------------------
	// ブーストエンハンスを味方全体にかける
	"ss_boost_enhance_all": function (fld, n, cobj, params) {
		var attr = params[3];
		if (!attr) {
			// 属性未指定なら全属性Up
			attr = [1, 1, 1, 1, 1];
		}
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var cd = fld.Allys.Deck[i];
			var now = fld.Allys.Now[i];
			if (now.nowhp > 0 && attr[cd.attr[0]] > 0) {

				SpSkill["ss_boost_enhance_s"](fld, i, cobj, params);
			}
		}
		return true;
	},
	// -----------------------------
	// ブーストエンハンスを単体にかける
	"ss_boost_enhance_s": function (fld, n, cobj, params) {
		var rate = params[0];
		var t = params[1];
		var dmg = params[2];
		var now = fld.Allys.Now[n];
		now.turn_effect.push({
			desc: "攻撃力アップ[ブースト](" + (rate * 100) + "%)",
			type: "ss_boost_enhance",
			icon: "enhance_boost",
			isdual: false,
			iscursebreak: true,
			turn: t,
			lim_turn: t,
			effect: function (f, oi, teff, state, is_t) {
				if (state == "first") {
					f.Allys.Now[oi].ss_boost_enhance = rate;
				}
				else if (state == "end" || state == "dead") {
					f.Allys.Now[oi].ss_boost_enhance = 0;
				}
				else if (is_t) {
					// 自傷
					var sco = ss_consume_own(dmg)
					ss_object_done(fld, n, sco);
				}
			},
		});
		fld.log_push("Unit[" + (n + 1) + "]: 自身攻撃力Up[Boost](" +
			(rate * 100) + "%, " + t + "t, dmg: " + (dmg * 100) + "%)");
		return true;
	},
	// -----------------------------
	// 精霊強化効果を味方全体に付与する
	"ss_reinforcement_all": function (fld, n, cobj, params) {
		var atkup = params[0];
		var grdup = params[1];
		var attr = params[2];
		var t = params[3];
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var cd = fld.Allys.Deck[i];
			var now = fld.Allys.Now[i];
			if (now.nowhp > 0 && attr[cd.attr[0]] > 0) {
				now.turn_effect.push({
					desc: "精霊強化(攻撃UP:" + (atkup * 100) + "%, 軽減:" + (grdup * 100) + "%)",
					type: "ss_reinforcement",
					icon: "enhance",
					isdual: false,
					iscursebreak: true,
					turn: t,
					lim_turn: t,
					effect: function (f, oi, teff, state, is_t) {
						if (state == "first") {
							f.Allys.Now[oi].ss_reinforcement_atk = atkup;
						}
						else if (state == "end" || state == "dead") {
							f.Allys.Now[oi].ss_reinforcement_atk = 0;
						}
					},
				});
			}
		}
		// 自身に行動不能効果を付与
		fld.Allys.Now[n].turn_effect.push({
			desc: "行動不能",
			type: "ss_reactionaly_noaction",
			icon: "all_sealed",		// 暫定
			isdual: false,
			iscursebreak: true,		// 呪い解除される(?)
			isreduce_stg: true,		// ターン跨ぎでカウントが減る
			effect: function () { },
			priority: 1,
			turn: t,
			lim_turn: t,
			ss_disabled: true,		// SS発動不可
			// 攻撃無効
			bef_answer: function (f, as) {
				return false;
			},
			// 反射無効
			bef_skillcounter: function (f, ai) {
				return false;
			},
		});
		// ログ出力
		fld.log_push("味方全体精霊強化(攻撃UP:" + (atkup * 100) + "%, 軽減:" + (grdup * 100) + "%)");
		return true;
	},
	// -----------------------------
	// 全体ステアップ
	"ss_statusup_all": function (fld, n, cobj, params) {
		var up_limit = params[1];
		var t = params[2];
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var up_arrs = $.extend(true, {}, params[0]);
			var now = fld.Allys.Now[i];
			if (now.nowhp <= 0) { continue; }
			// 既にかかってるステアップの値を取得する
			$.each(now.turn_effect, function (i, e) {
				if (e.type == "ss_statusup") {
					up_arrs[0] += e.up_hp;
					up_arrs[1] += e.up_atk;
				}
			});
			// 上限に達してたら上限に合わせる
			up_arrs[0] = Math.min(up_arrs[0], up_limit[0]);
			up_arrs[1] = Math.min(up_arrs[1], up_limit[1]);
			// 出力
			now.turn_effect.push({
				desc: "ステータスアップ(HP: " + up_arrs[0] + "/ATK: " + up_arrs[1] + ")",
				type: "ss_statusup",
				icon: "statusup",
				isdual: false,
				iscursebreak: true,
				turn: t,
				lim_turn: t,
				up_hp: up_arrs[0],
				up_atk: up_arrs[1],
				effect: function (f, oi, teff, state) {
					var nowtg = f.Allys.Now[oi];
					if (state == "first") {
						nowtg.maxhp = Math.max(teff.up_hp + nowtg.maxhp, 1);
						nowtg.atk = Math.max(teff.up_atk + nowtg.atk, 0);
						nowtg.nowhp = Math.min(nowtg.nowhp + (params[0][0] > 0 ? params[0][0] : 0), nowtg.maxhp);
					}
					else if (state == "end" || state == "overlay" || state == "dead") {
						nowtg.maxhp -= teff.up_hp;
						nowtg.nowhp = Math.min(nowtg.nowhp, nowtg.maxhp);
						nowtg.atk -= teff.up_atk;
					}
				},
			});
		}
		fld.log_push("味方全体ステータスUp(HP:" + up_arrs[0] + ", ATK: " + up_arrs[1] +
			(t != -1 ? (", " + t + "t") : "") + ")");
		return true;
	},
	// -----------------------------
	// 味方全体にダメージブロック
	"ss_damageblock_all": function (fld, n, cobj, params) {
		var rate = params[0];
		var t = params[1];
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var cd = fld.Allys.Deck[i];
			var now = fld.Allys.Now[i];
			if (now.nowhp > 0) {
				now.turn_effect.push({
					desc: "ダメージブロック(" + rate + ")",
					type: "ss_damage_block",
					icon: "damage_block",
					isdual: false,
					iscursebreak: true,
					turn: t,
					lim_turn: t,
					effect: function () { },
					priority: 1,
					on_damage: function (fld, dmg, attr) {
						if (dmg >= rate) {
							return dmg;
						} else {
							return 0;
						}
					}
				});
			}
		}
		fld.log_push("味方全体ダメージブロック(" + rate + "/" + t + "t)");
		return true;
	},
	// -----------------------------
	// 全体状態異常無効
	"ss_absattack_disable": function (fld, n, cobj, params) {
		var turn = params[0];
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			if (now.nowhp <= 0) { continue; }
			now.turn_effect.push({
				desc: "状態異常無効",
				type: "ss_absattack_disable",
				icon: "absattack_disable",
				isdual: false,
				iscursebreak: true,
				turn: turn,
				lim_turn: turn,
				effect: function () { },
				bef_absattack: function (fld, oi, ei) {
					return false;
				}
			});
		}
		return true;
	},
	// -----------------------------
	// スキルブースト
	"ss_skillboost": function (fld, n, cobj, params) {
		var f_rate = params[0];
		var rst = false;
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			// 自分にスキブをかけない
			if (i == n) { continue; }
			// スキブ処理
			var card = fld.Allys.Deck[i];
			var now = fld.Allys.Now[i];
			if (now.nowhp <= 0) { continue; }
			if (!now.ss_isboost && !is_legendmode(card, now)) {
				now.ss_current += f_rate;
				now.ss_isboost = true;
				// L化確認
				legend_timing_check(fld.Allys.Deck, fld.Allys.Now, i);
				rst = true;
			}
		}
		return rst;
	},
	// -----------------------------
	// チェイン直接追加
	"ss_addchain": function (fld, n, cobj, params) {
		var ch = params[0];
		fld.Status.chain += ch;
		return true;
	},
	// -----------------------------
	// チェイン保護
	"ss_chain_protect": function (fld, n, cobj, params) {
		var t = params[0];
		fld.Status.chain_status = 1;
		fld.Status.chainstat_turn = t;
		Field.log_push("Enemy[" + (n + 1) + "]: チェイン保護(" + t + "t)");
		return true;
	},
	// -----------------------------
	// 全体単純回復
	"ss_heal": function (fld, n, cobj, params) {
		var rate = params[0];
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			var hr = Math.floor(now.maxhp * rate);
			heal_ally(hr, i);
		}
		fld.log_push("味方全体HP回復(" + (rate * 100) + "%)");
		return true;
	},
	// -----------------------------
	// 指定値だけ全体回復(1000回復, etc)
	"ss_heal_absolute": function (fld, n, cobj, params) {
		var rate = params[0];
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			heal_ally(rate, i);
		}
		fld.log_push("味方全体HP回復(+" + rate + ")");
		return true;
	},
	// -----------------------------
	// 状態異常回復
	"ss_abstate_cure": function (fld, n, cobj, params) {
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			for (var te = 0; te < now.turn_effect.length; te++) {
				if (now.turn_effect[te].isabstate) {
					now.turn_effect.splice(te, 1);
					te--;
				}
			}
		}
		fld.log_push("味方全体異常回復");
		return true;
	},
	// -----------------------------
	// 味方全体にリジェネ付与
	"ss_regenerate": function (fld, n, cobj, params) {
		var rate = params[0];
		var t = params[1];
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			now.turn_effect.push({
				desc: "HPを徐々に回復(" + (rate * 100) + "%)",
				type: "ss_regenerate",
				icon: "regenerate",
				isdual: false,
				iscursebreak: true,
				priority: 1,
				turn: t,
				lim_turn: t,
				effect: function (f, oi, teff, state, is_t) {
					if (is_t) {
						var nd = f.Allys.Now[oi];
						var hr = Math.floor(nd.maxhp * rate);
						heal_ally(hr, oi);
						fld.log_push("Unit[" + (oi + 1) + "]: HP徐々に回復(+" + hr + ")");
					}
				},
			});
		}
		fld.log_push("味方全体リジェネ(" + (rate * 100) + "%, " + t + "t)");
		return true;
	},
	// -----------------------------
	// 起死回生
	"ss_revival": function (fld, n, cobj, params) {
		var rate = params[0];
		var t = params[1];
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			if (now.nowhp <= 0) { continue; }
			now.turn_effect.push({
				desc: "起死回生",
				type: "ss_revival",
				icon: "revival",
				isdual: false,
				iscursebreak: true,
				turn: t,
				lim_turn: t,
				effect: function () { },
				before_dead: function (f, oi) {
					var now = f.Allys.Now[oi];
					now.nowhp = Math.floor(now.maxhp * rate);
					f.log_push("Unit[" + (oi + 1) + "]: 起死回生発動");
				}
			});
		}
		return true;
	},
	// -----------------------------
	// 蘇生
	"ss_resurrection": function (fld, n, cobj, params) {
		var attr = params[0];
		var rate = params[1];
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var cd = fld.Allys.Deck[i];
			var now = fld.Allys.Now[i];
			if (now.nowhp <= 0 && attr[cd.attr[0]]) {
				now.nowhp = Math.min((now.maxhp * rate), now.maxhp);
				now.nowhp = Math.round(now.nowhp);
			}
		}
		fld.log_push("味方全体蘇生(" + (rate * 100) + "%)");
		return true;
	},
	// -----------------------------
	// 攻撃力アップパネル付与効果
	"panel_attackup": function (fld, n, cobj, params) {
		var p = params[0];
		var dsc = "攻撃力アップ(" + (p * 100) + "%)";
		return panel_addition(dsc, function (fld) {
			for (var i = 0; i < fld.Allys.Deck.length; i++) {
				var now = fld.Allys.Now[i];
				now.as_enhance = (now.as_enhance ? now.as_enhance : 0) + p;
			}
			fld.log_push("パネル付与効果: " + dsc);
		});
		return true;
	},
	// -----------------------------
	// チェインプラスパネル付与効果
	"panel_chainplus": function (fld, n, cobj, params) {
		var p = params[0];
		var dsc = "チェインプラス(+" + p + ")";
		return panel_addition(dsc, function (fld) {
			if (fld.Status.chain_status >= 0) {
				fld.Status.chain += p;
				fld.log_push("パネル付与効果: " + dsc);
			}
		});
		return true;
	},
	// -----------------------------
	// 回復パネル付与効果
	"panel_healally": function (fld, n, cobj, params) {
		var r = params[0];
		var dsc = "味方回復(" + (r * 100) + "%)";
		return panel_addition(dsc, function (fld) {
			for (var i = 0; i < fld.Allys.Deck.length; i++) {
				var now = fld.Allys.Now[i];
				heal_ally(now.maxhp * r, i);
			}
			fld.log_push("パネル付与効果: " + dsc);
		});
		return true;
	},
	// -----------------------------
	// スキルブーストパネル付与効果
	"panel_skillboost": function (fld, n, cobj, params) {
		var t = params[0];
		var dsc = "スキルブースト(+" + t + ")";
		return panel_addition(dsc, function (fld) {
			for (var i = 0; i < fld.Allys.Deck.length; i++) {
				// スキブ処理
				var card = fld.Allys.Deck[i];
				var now = fld.Allys.Now[i];
				if (now.nowhp <= 0) { continue; }
				if (!now.ss_isboost && !is_legendmode(card, now)) {
					now.ss_current += t;
					now.ss_isboost = true;
					// L化確認
					legend_timing_check(fld.Allys.Deck, fld.Allys.Now, i);
				}
			}
			fld.log_push("パネル付与効果: " + dsc);
		});
	},
	// -----------------------------
	// スキル反射無視
	"ss_ignore_skillcounter": function (fld, n, cobj, params) {
		var enemys = GetNowBattleEnemys();
		$.each(enemys, function (i, e) {
			if (e.flags) {
				e.flags.is_ss_attack = false;
			}
		});
		return true;
	},
	// -----------------------------
	// カウンター解除
	"ss_break_attackcounter": function (fld, n, cobj, params) {
		return ss_break_template(cobj.target, "attack_counter");
	},
	// スキル反射解除
	"ss_break_skillcounter": function (fld, n, cobj, params) {
		return ss_break_template(cobj.target, "skill_counter");
	},
	// ガード解除
	"ss_break_attrguard": function (fld, n, cobj, params) {
		return ss_break_template(cobj.target, "attr_guard");
	},
	// ダメブロ解除
	"ss_break_dblock": function (fld, n, cobj, params) {
		return ss_break_template(cobj.target, "damage_block");
	},
	// -----------------------------
	// SSコピー
	"ss_latest_copy": function (fld, n, cobj, params) {
		if (fld.Status.latest_ss) {
			var now = fld.Allys.Now[n];
			return ss_procdo(fld.Status.latest_ss, now, n);
		} else {
			return false;
		}
	},

	// -----------------------------
	// デメリット系: 自分に割合ダメージ
	"ss_consume_own": function (fld, n, cobj, params) {
		var p = params[0];
		var now = fld.Allys.Now[n];
		var dmg = Math.floor(p * now.maxhp);
		fld.log_push("Unit[" + (n + 1) + "]: 自傷(" + (p * 100) + "%)");
		damage_ally(dmg, n);
		return true;
	},
	// -----------------------------
	// デメリット系: 味方全体に割合ダメージ
	"ss_consume_all": function (fld, n, cobj, params) {
		var p = params[0];
		var ct = 0;
		fld.log_push("全体自傷(" + (p * 100) + "%)");
		for (var i = 0; i < fld.Allys.Deck.length; i++) {
			var now = fld.Allys.Now[i];
			var dmg = Math.floor(p * now.maxhp);
			if (now.nowhp > 0) {
				damage_ally(dmg, i);
				ct++;
			}
		}
		return ct;
	},
	// -----------------------------
	// デメリット系: 自身を封印状態にする
	"ss_allsealed_own": function (fld, n, cobj, params) {
		var t = params[0];
		// 封印攻撃を呼ぶ
		s_enemy_abstate_attack(
			fld, "封印", "all_sealed", t, [n], -1, true, {
				bef_answer: function (f, as) {
					return false;
				},
				bef_skillcounter: function (f, ai) {
					return false;
				},
				ss_disabled: true,
			}
		);
		return true;
	},

	/*
	// -----------------------------
	// テンプレート
	"ss_template": function (fld, n, cobj, params) {
		var xxx1 = params[0];
		var xxx2 = params[1];
		var xxx3 = params[2];
		var xxx4 = params[3];

		return true;
	},
	*/
}

// ------------------------------------
// SS条件関数定義リスト
var SpCondSkill = {
	// -----------------------------
	// HP条件(一定以上)
	"ss_hp_more": function (fld, oi, cobj, params) {
		var cond = params[0];
		var a = params[1];
		var b = params[2];
		var now = fld.Allys.Now[oi];
		return (now.nowhp >= (now.maxhp * cond)) ? a : b;
	},
	// -----------------------------
	// HP条件(一定以下)
	"ss_hp_less": function (fld, oi, cobj, params) {
		var cond = params[0];
		var a = params[1];
		var b = params[2];
		var now = fld.Allys.Now[oi];
		return (now.nowhp <= (now.maxhp * cond)) ? a : b;
	},
	// -----------------------------
	// HP条件(一定未満)
	"ss_hp_under": function (fld, oi, cobj, params) {
		var cond = params[0];
		var a = params[1];
		var b = params[2];
		var now = fld.Allys.Now[oi];
		return (now.nowhp < (now.maxhp * cond)) ? a : b;
	},
	// -----------------------------
	// リーダー時に効果値アップ
	"ss_when_leader": function (fld, oi, cobj, params) {
		var a = params[0];
		var b = params[1];
		return (oi == 0) ? a : b;
	},
	// -----------------------------
	// 属性特攻
	"special_attr": function (fld, oi, cobj, params) {
		var attrs = params[0];
		var a = params[1] + 1;
		var b = params[2] + 1;
		var e = GetNowBattleEnemys();
		var rst = [];
		for (var i = 0; i < e.length; i++) {
			rst[i] = (attrs[e[i].attr] > 0) ? a : b;
		}
		return rst;
	},
	// -----------------------------
	// 味方全体自傷して自傷した数だけ効果値を増やす
	"ss_consume_all_cond": function (fld, oi, cobj, params) {
		var base = params[0];
		var dmg = params[1];
		var sca = ss_consume_all(dmg);
		return base * ss_object_done(fld, oi, sca);
	},
	// -----------------------------
	// 自身が毒かどうか
	"ss_is_poison_own": function (fld, oi, cobj, params) {
		var a = params[0];
		var b = params[1];
		var now = fld.Allys.Now[oi];
		var is_poison = $.grep(now.turn_effect, function (e) {
			return e.type == "poison";
		}).length > 0;
		if (is_poison) {
			return a;
		}
		return b;
	},
	// -----------------------------
	// 相手が毒かどうか
	"ss_is_poison_enemy": function (fld, oi, cobj, params) {
		var a = params[0];
		var b = params[1];
		var rst = [];
		var es = GetNowBattleEnemys();
		for (var i = 0; i < es.length; i++) {
			var is_poison = $.grep(edat.turn_effect, function (e) {
				return e.type == "poison";
			}).length > 0;
			rst[i] = is_poison ? a : b;
		}
		return rst;
	},
	// -----------------------------
	// チェイン分岐
	"ss_chain_cond": function (fld, oi, cobj, params) {
		var ch = params[0];
		var a = params[1];
		var b = params[2];
		return (fld.Status.chain >= ch) ? a : b;
	},
	"ss_chain_cond_skill": function (fld, oi, cobj, params) {
		var scc_rst = this["ss_chain_cond"](fld, oi, cobj, params);
		return ss_object_done(fld, oi, scc_rst);
	},
	// -----------------------------
	// チェイン消費
	"ss_chain_cost": function (fld, oi, cobj, params) {
		var ch = params[0];
		var a = params[1];
		var b = params[2];
		if (fld.Status.chain >= ch) {
			fld.Status.chain -= ch;
			fld.log_push("チェイン消費: " + ch);
			return a;
		}
		return b;
	},
	"ss_chain_cost_skill": function (fld, oi, cobj, params) {
		var scc_rst = this["ss_chain_cost"](fld, oi, cobj, params);
		return ss_object_done(fld, oi, scc_rst);
	},

	/*
	// -----------------------------
	// テンプレート
	"ss_template": function (fld, oi, cobj, params) {
		var xxx1 = params[0];
		var xxx2 = params[1];
		var xxx3 = params[2];
		var xxx4 = params[3];

		return true;
	},
	*/
}

// ------------------------------------
// (内部用)実行関数
function ss_object_done(fld, n, c_obj) {
	// type switch
	var skl_list = c_obj.is_skill ? SpSkill : SpCondSkill;
	// 未定義なら実行しない
	if (!skl_list || !skl_list[c_obj.name]) {
		return null;
	}
	// 引数チェック
	var params = [];
	var count = 0;
	while (c_obj["p" + (count + 1)]) {
		var p = c_obj["p" + (count + 1)];
		// 遅延評価関数なら特に何もしない
		if(c_obj.is_delay){
			params[count] = p;
		}
		// 条件またはスキルなら再帰
		else if (p.is_cond || p.is_skill) {
			params[count] = ss_object_done(fld, n, p);
		}
		// 関数なら実行
		else if ($.isFunction(p)) {
			params[count] = p();
		}
		// 関数型でないならそのまま
		else {
			params[count] = p;
		}
		count++;
	}
	// 関数実行
	return skl_list[c_obj.name](fld, n, c_obj, params);
}

// (内部用)敵にSSダメージ
function ss_damage(fld, r, atr, atkn, own, tg, isnot_ss) {
	var enemy = GetNowBattleEnemys(tg);
	var card = fld.Allys.Deck[own];
	var now = fld.Allys.Now[own];
	var rnd = damage_rand();
	// 威力が配列で渡されたら取り出す
	var rate = $.isArray(r) ? r[tg] : r;
	// 潜在結晶考慮
	var aw_c = pickup_awakes(card, "awake_rateup", false);
	for (var i = 0; i < aw_c.length; i++) {
		rate += Math.floor(aw_c[i].upvalue / 100);
	}
	attack_enemy(enemy, now, atr, rate, atkn, [atr],
		fld.Status.chain, rnd, own, tg, true);
	// SSフラグを立てる
	enemy.flags.is_ss_attack = (isnot_ss != true);
}

// (内部用)パネル付与効果
function panel_addition(dsc, fc) {
	Field.Status.panel_add.push({
		desc: dsc,
		func: fc,
	});
	return true;
}

// (内部用)敵スキル解除系テンプレ
function ss_break_template(target, type, logtext) {
	var _break_temp_fc = function (fld, oi, ei) {
		var is_break = false;
		var em = GetNowBattleEnemys(ei);
		for (var i = 0; i < em.turn_effect.length; i++) {
			var eff = em.turn_effect[i];
			// typeを含んでいる場合除く
			// (attack_counterが指定されてたら多段カウンターも除く)
			if (eff.type.indexOf(type) >= 0) {
				eff.splice(i, 1);
				i--;
				is_break = true;
			}
		}
		return is_break;
	};
	return function (fld, n) {
		var cd = fld.Allys.Deck[n];
		var es = GetNowBattleEnemys();
		if (target == "all") {
			for (var i = 0; i < es.length; i++) {
				_break_temp_fc(fld, n, i);
			}
		} else {
			_break_temp_fc(fld, n, auto_attack_order(es, cd.attr[0], n));
		}
	}
}
