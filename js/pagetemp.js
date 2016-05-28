// template page loader
$(function () {
	// iframe対策
	if (window != parent) {
		top.location.href = document.location.href;
		return;
	}
	// コンテンツ読み込み
	$("#Header").load("/template/header.html", function () {
		$('#menu').slicknav({
			label: "",
			duration: 500,
			prependTo: "#mobile_menu",
		});
	});
	$("#Footer").load("/template/footer.html");
})

