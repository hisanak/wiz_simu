category_jp = {
    "event": {
		jp: "イベントクエスト",
		is_dispsim: false,
	},
    "past_event": {
		jp: "過去のイベントトーナメント",	// jp: カテゴリ名
		is_dispsim: true,			// is_dispsim: 試走クエスト選択に表示させるかどうか
		sim_index: 50,				// sim_index: 表示させる場合の表示順(昇順)
		is_notusedhelper: true,		// is_notusedhelper: 助っ人使用不可かどうか
		disable_date:"3000/1/1 12:00"		// disable_date: 指定した日時になったら表示をやめる
	},
	/*
		*************sim_indexのメモ*************
		イベントトーナメント=1
		トーナメント=2
		期間限定イベント=11
		----（sim_indexが12未満のものはdispsim=trueなら敵情報DBにも表示）----
		魔導士の家系イベント=12
		通常クエスト=30
		素材クエスト=31
		blader=40  			(特例として40以上50以下は敵情報DBに表示)
		abcd=41
		過去のイベトナメ=50
		シミュレータオリジナル系=999
		未指定=9999
	 */
    "tornament": {
		jp: "通常トーナメント",
		is_dispsim: true,
		sim_index: 2,
		is_notusedhelper: true,	
	},
    "evtornament": {
		jp: "イベントトーナメント",
		is_dispsim: true,
		sim_index: 1,
		is_notusedhelper: true,	
	},
    "other": {
		jp: "その他",
		is_dispsim: true,
		sim_index: 999,
	},
    "debug": {
		jp: "for debug",
		is_dispsim: true,
		sim_index: 114514,
	},
    "id": {
		jp: "未設定",
	},
    "": {
		jp: "未設定",
	},
    "mareless4": {
    	jp: "黄昏メアレス4",
    	is_dispsim: true,
    	sim_index: 11,
		disable_date:"2018/5/14 16:00",
    },
    "outlander": {
		is_dispsim: true,
		sim_index: 11,
		jp: "眠れる遺跡のアウトランダー",
		disable_date:"2018/3/14 16:00",
	},
    "wiz_museum": {
		is_dispsim: true,
		sim_index: 11,
		jp: "黒ウィズミュージアム",
		disable_date:"2018/1/31 16:00",
	},
    "wbtcolabo": {
		is_dispsim: true,
		sim_index: 11,
		jp: "黒白テニスコラボ",
		disable_date:"2017/6/31 16:00",
	},
    "kuugarize": {
		is_dispsim: true,
		sim_index: 12,
		jp: "喰牙RIZE",
		disable_date:"2018/6/16 16:00",
	},
    "1703miku": {
		is_dispsim: true,
		sim_index: 11,
		jp: "輝く想いの魔法(ミクコラボ)",
		disable_date:"2017/4/7 16:00",
	},
    "xderive": {
		is_dispsim: true,
		sim_index: 11,
		jp: "響命クロスディライブ",
		disable_date:"2017/4/13 16:00",
	},
    "zoba": {
		is_dispsim: true,
		sim_index: 11,
		jp: "魔轟三鉄傑 対 地獄三十六歌仙",
		disable_date:"2017/2/7 16:00",
	},
    "esuterera1": {
		is_dispsim: true,
		sim_index: 11,
		jp: "聖なる空のエステレラ",
		disable_date:"2017/1/16 16:00",
	},
    "shinryu1": {
		is_dispsim: true,
		sim_index: 11,
		jp: "神竜降臨！",
		disable_date:"2016/12/16 16:00",
	},
    "shinryu2": {
		is_dispsim: true,
		sim_index: 11,
		jp: "神竜降臨Ⅱ",
		disable_date:"2016/12/16 16:00",
	},
    "shinryu3": {
		is_dispsim: true,
		sim_index: 11,
		jp: "心竜天翔 Rising Dragon",
		disable_date:"2016/12/16 16:00",
	},
    "radiant1": {
		is_dispsim: true,
		sim_index: 11,
		jp: "追憶のレディアント",
		disable_date:"2016/11/14 16:00",
	},
    "losteden2": {
		is_dispsim: true,
		sim_index: 11,
		jp: "双翼のロストエデン　ＷＷＭＦ",
		disable_date:"2016/10/31 16:00",
	},
    "losteden3": {
		is_dispsim: true,
		sim_index: 11,
		jp: "双翼のロストエデンⅢ",
		disable_date:"2017/12/15 16:00",
	},
    "mareless2": {
		is_dispsim: true,
		sim_index: 11,
		jp: "黄昏メアレスⅡ 残響dearless",
		disable_date:"2016/11/30 16:00",
	},
    "chronicle1": {
		is_dispsim: false,
		sim_index: 12,
		jp: "天界の双子 訣別のクロニクル",
	},
    "satajo": {
		jp: "サタニック女学院",
	},
    "suzaku": {
		jp: "スザク",
	},
    "suzaku2": {
		jp: "スザクⅡ",
	},
    "suzaku3": {
		jp: "スザクⅢ",
		is_dispsim: false,
		sim_index: 11,
	},
    "reloaded": {
		jp: "幻魔特区RELOADED",
		is_dispsim: false,
		sim_index: 11,
	},
	"darcmass2": {
		is_dispsim: false,
		jp: "空戦のドルキマスⅡ",
		sim_index: 11,
	},
	"darcmass3": {
		is_dispsim: false,
		jp: "空戦のドルキマスⅢ",
		sim_index: 12,
	},
	"chromag6":{
		jp: "クロム・マグナ ゼロ",
		is_dispsim: false,
		sim_index: 11,
	},
    "8millionz": {
		jp: "YAOYORO Z",
		is_dispsim: false,
		sim_index: 11,
	},
    "usg": {
		jp: "アルティメットサマーガールズ",
		is_dispsim: false,
		sim_index: 11,
	},
    "eva2": {
    	jp: "幻想と歪曲の槍",
    	is_dispsim: false,
    	sim_index: 11,
    },
    "gqw": {
    	jp: "高校生クイズ",
    	is_dispsim: false,
    	sim_index: 11,
    },
    "8million2": {
    	jp: "八百万神秘譚2",
    	is_dispsim: false,
    	sim_index: 16,
    },
    "mareless1": {
    	jp: "黄昏メアレス",
    	is_dispsim: false,
    	sim_index: 16,
    },
    "sennenzakura1": {
    	jp: "古の森の千年桜",
    	is_dispsim: false,
    	sim_index: 16,
    },
    "itazuramegami1": {
    	jp: "ｲﾀｽﾞﾗ女神とうさぎのおはなし",
    	is_dispsim: true,
    	//sim_index: 12,
    	sim_index: 11,
		disable_date:"2016/12/16 16:00",
    },
   "abcd": {
		jp: "AbyssCode",
		is_dispsim: true,
		sim_index: 41,
	},
    "blader": {
		jp: "Blader",
		is_dispsim: true,
		sim_index: 40,
	},
   "orlha": {
		jp: "Orlha Report",
		is_dispsim: true,
		sim_index: 20,
		disable_date:"2017/12/1 16:00",
	},
   "vzone": {
		jp: "VOID ZONE",
		is_dispsim: false,
		sim_index: 11,
	},
    "burningtower": {
		jp: "バーニングタワー",
		is_dispsim: true,
		sim_index: 21,
		disable_date:"2017/1/20 16:00",
	},
    "material": {
		jp: "素材クエスト",
		is_dispsim: true,
		sim_index: 31,
	},
    "normal": {
		jp: "ノーマルクエスト",
		is_dispsim: true,
		sim_index: 30,
	}
}
