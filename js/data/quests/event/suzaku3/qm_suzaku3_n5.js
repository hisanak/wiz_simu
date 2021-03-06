{
   id: "suzaku3_n5",
   name: "絶級 AUDEAMUS",
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
               name: "浮遊機雷 ゴウカ",
               hp: 30000,
               imageno: 8206,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(500, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "浮遊機雷 ライカ",
               hp: 10000,
               imageno: 8210,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     m_enemy_once(s_enemy_force_reservoir()),
                     m_enemy_once(s_enemy_attack(750, 5, 1, true)),
                     s_enemy_attack(375, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "浮遊機雷 ゴウカ",
               hp: 30000,
               imageno: 8206,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(500, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 2,
                  wait: 1
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
               name: "自動迎撃式機雷 カゲロウ",
               hp: 50000,
               imageno: 8207,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(250, 3, 3, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "インターセプター ファイアアント",
               hp: 25000,
               imageno: 8212,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_force_reservoir())
                  ],
                  on_move: [
                     m_enemy_once(s_enemy_attack(1500, 5, 1, true)),
                     s_enemy_attack(750, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "チャンスメドレー フラムボヤント",
               hp: 50000,
               imageno: 8213,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(250, 3, 3, true)
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
            3
         ],
         enemy: [
            {
               name: "自動迎撃式機雷 カゲロウ",
               hp: 30000,
               imageno: 8207,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(damage_block_own(6000, 3))
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
               name: "チャンスメドレー フラムボヤント",
               hp: 60000,
               imageno: 8213,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(attack_counter(1500, 5))
                  ],
                  on_move: [
                     s_enemy_attack(200, 5, 3, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "浮遊機雷 ゴウカ",
               hp: 30000,
               imageno: 8206,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     m_enemy_once(s_enemy_poison(500, 5, 2)),
                     s_enemy_attack(600, 5, 1, true)
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
               name: "自動迎撃式機雷 カゲロウ",
               hp: 150000,
               imageno: 8207,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_attrguard_all([0,1,0,0,0], 0.25, 100)/* Warning: 属性要確認： 水属性防御25%（99T） */),
                     damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true)
                  ],
                  on_move: [
                     s_enemy_attack(300, 3, 3, true)
                  ],
                  on_angry: [
                     skill_counter_func(s_enemy_attack, "3体に3連撃（DMG+100%）", 100, false, 600, 3, 3, true)
                  ],
                  on_move_angry: [
                     s_enemy_attack(300, 3, 3, true),
                     s_enemy_attack(300, 3, 3, true),
                     s_enemy_attack(300, 3, 3, true),
                     s_enemy_attack(300, 3, 3, true),
                     s_enemy_attack(300, 3, 3, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "終の収穫者 タモン＆アドヴェリタス",
               hp: 200000,
               imageno: 8199,
               attr: 1,
               spec: 2,
               isStrong: true,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_all_sealed/* Warning: ターン数を確認してください： 5体を完全に封印する（1T） */, "5体を完全に封印する（1T）", 100, false, 5, 2)),
                     damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true)
                  ],
                  on_move: [
                     s_enemy_attack(300, 5, 3, true)
                  ],
                  on_angry: [
                     s_enemy_panicshout(0, 5, 2)
                  ],
                  on_move_angry: [
                     s_enemy_attack(300, 5, 3, true),
                     s_enemy_attack(300, 5, 3, true),
                     s_enemy_attack(300, 5, 3, true),
                     s_enemy_attack(300, 5, 3, true),
                     s_enemy_attack(300, 5, 3, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "浮遊機雷 ゴウカ",
               hp: 100000,
               imageno: 8206,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_attack, "3体に3連撃（DMG+200%）", 100, false, 900, 3, 3, true)),
                     damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true)
                  ],
                  on_move: [
                     s_enemy_attack(300, 3, 3, true)
                  ],
                  on_angry: [
                     attack_counter_dual(700, 100)
                  ],
                  on_move_angry: [
                     s_enemy_attack(300, 3, 3, true),
                     s_enemy_attack(300, 3, 3, true),
                     s_enemy_attack(300, 3, 3, true),
                     s_enemy_attack(300, 3, 3, true),
                     s_enemy_attack(300, 3, 3, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 2
               }
            }
         ]
      }
   ]
}