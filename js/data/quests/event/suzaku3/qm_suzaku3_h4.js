{
   id: "suzaku3_h4",
   name: "異形級 古き悪夢の目覚め",
   category: "suzaku3",
   category_jp: "スザクⅢ",
   desc: "",
   overlap: false,
   aprnum: 4,
   data: [
      {
         appearance: [
            1
         ],
         enemy: [
            {
               name: "浮遊機雷 ライカ",
               hp: 50000,
               imageno: 8210,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(300, 3, 4, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 2
               }
            },
            {
               name: "インターセプター サンダーバグ",
               hp: 60000,
               imageno: 8216,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     s_enemy_healreverse(0.5, 5)
                  ],
                  on_move: [
                     s_enemy_attack(375, 3, 4, true),
                     s_enemy_attack(375, 3, 4, true),
                     s_enemy_attack(375, 3, 4, true),
                     s_enemy_attack(375, 3, 4, true),
                     s_enemy_healreverse(0.5, 5)/* Info: 先制行動を再使用します */
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 2
               }
            },
            {
               name: "チャンスメドレー スパークラー",
               hp: 50000,
               imageno: 8217,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(300, 3, 4, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 2
               }
            }
         ]
      },
      {
         appearance: [
            2
         ],
         enemy: [
            {
               name: "浮遊機雷 ライカ",
               hp: 50000,
               imageno: 8210,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_healreverse(0.5, 5))
                  ],
                  on_move: [
                     s_enemy_attack(150, 3, 5, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 2
               }
            },
            {
               name: "浮遊機雷 ライカ",
               hp: 70000,
               imageno: 8210,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_attack_ratio(0.5, 5, true))
                  ],
                  on_move: [
                     s_enemy_attack(750, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "自動迎撃式機雷 イナズマ",
               hp: 50000,
               imageno: 8211,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_continue_damage/* Warning: 相当動作が怪しいので必ず実機検証してください。:継続大魔術（固定値：1000）3T */, "継続大魔術（固定値：1000）3T", 100, false, 1, 250, 250))
                  ],
                  on_move: [
                     s_enemy_attack(250, 3, 5, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 2
               }
            }
         ]
      },
      {
         appearance: [
            3
         ],
         enemy: [
            {
               name: "自動迎撃式機雷 イナズマ",
               hp: 80000,
               imageno: 8211,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_continue_damage/* Warning: 相当動作が怪しいので必ず実機検証してください。:継続大魔術（固定値：1000）3T */, "継続大魔術（固定値：1000）3T", 100, false, 1, 250, 250))
                  ],
                  on_move: [
                     s_enemy_attack(600, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "浮遊機雷 ライカ",
               hp: 65000,
               imageno: 8210,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(1200, 5, 1, true)
                  ],
                  on_popup: [
                     damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true)
                  ],
                  on_angry: [
                     s_enemy_continue_damage(1, 250, 250)/* Warning: 相当動作が怪しいので必ず実機検証してください。:継続大魔術（固定値：1000）3T */
                  ],
                  on_move_angry: [
                     s_enemy_attack(600, 3, 4, true),
                     s_enemy_attack(600, 3, 4, true),
                     s_enemy_attack(600, 3, 4, true),
                     s_enemy_attack(600, 3, 4, true),
                     s_enemy_attack(600, 3, 4, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "インターセプター サンダーバグ",
               hp: 70000,
               imageno: 8216,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_force_reservoir())
                  ],
                  on_move: [
                     m_enemy_once(s_enemy_attack(2000, 1, 1, true)),
                     s_enemy_attack(1000, 1, 1, true),
                     s_enemy_attack(1000, 1, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            }
         ]
      },
      {
         appearance: [
            4
         ],
         enemy: [
            {
               name: "チャンスメドレー スパークラー",
               hp: 170000,
               imageno: 8217,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     m_enemy_once(s_enemy_healreverse(1, 5)),
                     s_enemy_attack(300, 3, 5, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 2
               }
            },
            {
               name: "虚無の収穫者 ヒミカ＆アドミローラ",
               hp: 400000,
               imageno: 8195,
               attr: 2,
               spec: 2,
               isStrong: true,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_continue_damage/* Warning: 相当動作が怪しいので必ず実機検証してください。:継続大魔術（固定値：1000）3T */, "継続大魔術（固定値：1000）3T", 100, false, 1, 250, 250)),
                     damage_switch(s_enemy_when_hpdown(0.5), m_enemy_angry(), true)
                  ],
                  on_move: [
                     s_enemy_attack(437.5, 5, 4, true)
                  ],
                  on_angry: [
                     s_enemy_continue_damage(1, 250, 250)/* Warning: 相当動作が怪しいので必ず実機検証してください。:継続大魔術（固定値：1000）3T */
                  ],
                  on_move_angry: [
                     s_enemy_healreverse(1, 5),
                     s_enemy_attack(437.5, 5, 4, true),
                     s_enemy_attack(437.5, 5, 4, true),
                     s_enemy_attack(437.5, 5, 4, true),
                     s_enemy_attack(437.5, 5, 4, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "浮遊機雷 ライカ",
               hp: 170000,
               imageno: 8210,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_healreverse(1, 5))
                  ],
                  on_move: [
                     s_enemy_attack(300, 3, 5, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            }
         ]
      }
   ]
}