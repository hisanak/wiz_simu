{
   id: "suzaku3_h5",
   name: "帰郷級 想いの怪物",
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
               name: "浮遊機雷 ヒョウカ",
               hp: 50000,
               imageno: 8208,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(300, 3, 4, true),
					s_enemy_division(0.5)
                  ],
                  atrandom: false,
                  turn: 2,
                  wait: 1
               }
            },
            {
               name: "自動迎撃式機雷 ミズノツキ",
               hp: 20,
               imageno: 8209,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(impregnable(99))
                  ],
                  on_move: [
                     s_enemy_attack(1200, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "自動迎撃式機雷 ミズノツキ",
               hp: 50000,
               imageno: 8209,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(300, 3, 4, true),
					s_enemy_division(0.5)
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
               name: "インターセプター スノークラブ",
               hp: 70000,
               imageno: 8214,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_ss_sealed(5, 2))
                  ],
                  on_move: [
                     s_enemy_attack(875, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "チャンスメドレー アヴァランチ",
               hp: 75000,
               imageno: 8215,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(375, 3, 4, true)
                  ],
                  on_popup: [
                     damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true)
                  ],
                  on_angry: [
                     s_enemy_healreverse(1, 5)
                  ],
                  on_move_angry: [
                     s_enemy_attack(375, 3, 4, true),
                     s_enemy_attack(375, 3, 4, true),
                     s_enemy_attack(375, 3, 4, true),
                     s_enemy_attack(375, 3, 4, true),
                     s_enemy_attack(375, 3, 4, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "浮遊機雷 ヒョウカ",
               hp: 100000,
               imageno: 8208,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(2125, 1, 1, true)
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
               name: "浮遊機雷 ヒョウカ",
               hp: 200000,
               imageno: 8208,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_poison, "毒ダメージ 5体×3000DMG×5T", 100, false, 3000, 5, 5))
                  ],
                  on_move: [
                     s_enemy_attack(1200, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 2
               }
            },
            {
               name: "インターセプター スノークラブ",
               hp: 100000,
               imageno: 8214,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_chain_sealed(6)),
                     damage_switch(s_enemy_when_hpdown(0.7), m_enemy_angry(), true)
                  ],
                  on_move: [
                     s_enemy_attack(400, 3, 4, true)
                  ],
                  on_angry: [
                     s_enemy_chain_break()
                  ],
                  on_move_angry: [
                     s_enemy_attack(400, 3, 4, true),
                     s_enemy_attack(400, 3, 4, true),
                     s_enemy_attack(400, 3, 4, true),
                     s_enemy_attack(400, 3, 4, true),
                     s_enemy_attack(400, 3, 4, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "チャンスメドレー アヴァランチ",
               hp: 120000,
               imageno: 8215,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(attack_counter_dual(700, 6)),
                     damage_switch(s_enemy_when_hpdown(0.5), m_enemy_angry(), true)
                  ],
                  on_move: [
                     s_enemy_attack(800, 5, 1, true)
                  ],
                  on_angry: [
                     s_enemy_heal_own(0.5)
                  ],
                  on_move_angry: [
                     s_enemy_attack(800, 5, 1, true),
                     s_enemy_attack(800, 5, 1, true),
                     s_enemy_attack(800, 5, 1, true),
                     s_enemy_attack(800, 5, 1, true),
                     s_enemy_attack(800, 5, 1, true)
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
               name: "浮遊機雷 ヒョウカ",
               hp: 25,
               imageno: 8208,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(impregnable(99)),
                     damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true)
                  ],
                  on_move: [
                     s_enemy_attack_ratio(0.7, 5, true)
                  ],
                  on_angry: [
                     s_enemy_attack_ratio(0.7, 5, true)
                  ],
                  on_move_angry: [
                     s_enemy_attack_ratio(0.7, 5, true),
                     s_enemy_attack_ratio(0.7, 5, true),
                     s_enemy_attack_ratio(0.7, 5, true),
                     s_enemy_attack_ratio(0.7, 5, true),
                     s_enemy_attack_ratio(0.7, 5, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "終の収穫者 タモン＆アドヴェリタス",
               hp: 500000,
               imageno: 8199,
               attr: 1,
               spec: 2,
               isStrong: true,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_all_sealed/* Warning: ターン数を確認してください： 5体を完全に封印する（5T） */, "5体を完全に封印する（5T）", 100, false, 5, 6)),
                     damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true)
                  ],
                  on_move: [
                     s_enemy_attack(500, 3, 5, true)
                  ],
                  on_angry: [
                     s_enemy_attr_weaken([0,1,0,0,0], 1.5, 5, 6)/* Warning: 属性要確認： 水属性弱体化50%（5T） */
                  ],
                  on_move_angry: [
                     s_enemy_attack(500, 3, 5, true),
                     s_enemy_attack(500, 3, 5, true),
                     s_enemy_attack(500, 3, 5, true),
                     s_enemy_attack(500, 3, 5, true),
                     s_enemy_attack(500, 3, 5, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "チャンスメドレー アヴァランチ",
               hp: 180000,
               imageno: 8215,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter(9999, 100))
                  ],
                  on_move: [
                     m_enemy_once(s_enemy_discharge(5, 2)),
                     s_enemy_attack(250, 3, 4, true)
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