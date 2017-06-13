// template page loader
$(function () {
	// iframe対策
	if (window != parent) {
		top.location.href = document.location.href;
		return;
	}
	// コンテンツ読み込み
	$("#Top").load("/template/top.html", function () {
		var tgl_tg = $(".spmenu_toggle");
		tgl_tg.click(function () {
			var tg = [
				$("#menu"),
				$("body")
			];
			$.each(tg, function (i, e) {
				e.toggleClass("mn_opened");
			});
			$("#menu").click(function () {
				$.each(tg, function (i, e) {
					e.removeClass("mn_opened");
				});
			})
		});
	});
	$("#Header").load("/template/header.html", function () {
		// twitter関連のcookieがあるかチェック
		var ld = $.cookie("wt_tld");
		if (ld) {
			var ld_jsn = JSON.parse(ld);
			// ログイン済み
			$("li#twlogin ul.submenu").html('<li id="mn_twitter"><a>ログイン中(@' + ld_jsn.scname + ')</a></li>');
		} else {
			// 未ログイン
			$("li#twlogin ul.submenu").html('<li id="mn_twitter"><a href="//api.wiztools.net/twitter/login.php">Twitterでログイン</a></li>');
		}
		// category_jsを読み込む
		$.getScript("/js/data/quests/%23category_jp.js", function () {
			var appearQuests = [];
			var nowDt = new Date();
			for (var cId in category_jp) {
				var nowCate = category_jp[cId];
				if (nowCate.sim_index <= 11 || (nowCate.sim_index >= 40 && nowCate.sim_index <= 50)) {
					if (nowCate.is_dispsim) {
						if (!nowCate.disable_date || Date.parse(nowCate.disable_date) > nowDt) {
							appearQuests.push({ id: cId, name: nowCate.jp, sim_index: nowCate.sim_index })
						}
					}
				}
			}
			appearQuests = appearQuests.sort(function (a, b) {
				if (a.sim_index < b.sim_index) return -1;
				if (a.sim_index > b.sim_index) return 1;
				return 0;
			})
			var dbtxt = "";
			appearQuests.forEach(function (q) {
				dbtxt += '<li class="mn_db"><a href="/simulator/quest/?genre=' + q.id + '">' + q.name + '</a></li>';
			})
			dbtxt += '<li class="mn_db"><a href="/simulator/quest/">全て表示</a></li>';
			if(document.getElementById("enm_db")){
				enm_db.innerHTML = dbtxt
			}
		});
		$("#Footer").load("/template/footer.html");
	});
	
	// 横持ち状態で横幅が800pxない場合には縮小表示する
	if(w_width > w_height && w_width < 800 && w_width >= 600){
		$('meta[name="viewport"]').attr("content", "width=800");
	}
})

