window.addEventListener("load", function () {
  // Lấy giá trị từ input
  var price = $("input[name='prices']").val();
  var ship = $("input[id='shipper']").val();

  // Chuyển đổi giá trị thành số
  var tongTien = parseInt(price) + parseInt(ship);

  // Kiểm tra xem có phải là số không
  if (!isNaN(tongTien)) {
    // Định dạng tiền tệ và gán giá trị vào phần tử
    $(".total").text(
      price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    );

    var formattedTongTien = tongTien.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    $(".total-payment-infor").text(formattedTongTien);

    // Gán giá trị vào input
    $("input[name='totalPayment']").val(tongTien);
  } else {
    console.log("Giá trị không hợp lệ");
  }
});

function submitForm() {
  var voucherCode = $("input[name='voucher']").val();
  var thanhToan = $("input[name='totalPayment']").val();

  $.ajax({
    type: "POST",
    url: "/shop/check-out/add-voucher",
    data: { voucher: voucherCode },
    success: function (response) {
      if (!response.isValid) {
        Swal.fire({
          title: "Knotrea Thông Báo!",
          text: "Mã giảm giá không tồn tại!",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        if (!response.isActive) {
          Swal.fire({
            title: "Knotrea Thông Báo!",
            text: "Mã giảm giá đã kết thúc!",
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          $("#voucherCode").attr("readonly", true);

          var discountAmount = response.discount;
          $(".voucher-info").text(
            "-" +
              discountAmount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
          );

          // Tính toán tổng thanh toán sau giảm giá
          var totalPayment = thanhToan - discountAmount;

          console.log(totalPayment);

          // Định dạng số và gán vào total-payment-info
          var formattedTotalPayment = totalPayment.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          });
          $(".total-payment-infor").text(formattedTotalPayment);

          // Gán giá trị vào input
          $("input[name='totalPayment']").val(totalPayment);
        }
      }
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
}
