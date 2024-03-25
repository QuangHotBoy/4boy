window.addEventListener("load", function() {
	// Lấy giá trị từ input
	var prices = $("input[name='prices']").val();
	var ship = $("input[id='shipper']").val();


	// Chuyển đổi giá trị thành số
	var tongTien = parseInt(prices) + parseInt(ship);

	// Kiểm tra xem có phải là số không
	if (!isNaN(tongTien)) {
		// Định dạng tiền tệ và gán giá trị vào phần tử
		var formattedPrice = prices.toLocaleString('vi-VN', {
			style: 'currency',
			currency: 'VND'
		});

		$(".total").text(formattedPrice);

		var formattedTongTien = tongTien.toLocaleString('vi-VN', {
			style: 'currency',
			currency: 'VND'
		});

		$(".total-payment-infor").text(formattedTongTien);

		// Gán giá trị vào input
		$("input[name='totalPayment']").val(tongTien);
	} else {
		console.log("Giá trị không hợp lệ");
	}
});