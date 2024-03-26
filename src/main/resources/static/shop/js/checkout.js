window.addEventListener("load", function () {
  // Lấy giá trị từ input
  var price = $("input[name='prices']").val();
  var ship = $("input[name='shipper']").val();

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

    $("input[name='total']").val(price);

    var formattedTongTien = tongTien.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    $(".total-payment-infor").text(formattedTongTien);

    // Gán giá trị vào input
    $("input[name='payments']").val(tongTien);

    console.log(tongTien);
  } else {
    console.log("Giá trị không hợp lệ");
  }
});

function submitForm() {
  var voucherCode = $("input[name='voucher']").val();
  var total = $("input[name='total']").val();
  var thanhToan = $("input[name='payments']").val();

  console.log(total);

  $.ajax({
    type: "POST",
    url: "/shop/check-out/add-voucher",
    data: { voucher: voucherCode, total: total },
    success: function (response) {
      if (response.isValid) {
        console.log(1);
        if (response.isActive) {
          console.log(2);
          if (response.isTrue) {
            console.log(3);
            var dateEnd = new Date(response.dateEnd);
            var currentDate = new Date();

            if (dateEnd > currentDate) {
              console.log(4);
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
              $("input[name='payments']").val(totalPayment);
            } else {
              Swal.fire({
                title: "Knotrea Thông Báo!",
                text: "Mã giảm giá quá hạn sử dụng!",
                icon: "error",
                timer: 1000,
                showConfirmButton: false,
              });
            }
          } else {
            Swal.fire({
              title: "Knotrea Thông Báo!",
              text: "Đơn hàng không đủ điều kiện!",
              icon: "error",
              timer: 1000,
              showConfirmButton: false,
            });
          }
        } else {
          Swal.fire({
            title: "Knotrea Thông Báo!",
            text: "Mã giảm giá đã kết thúc!",
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      } else {
        Swal.fire({
          title: "Knotrea Thông Báo!",
          text: "Mã giảm giá không tồn tại!",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
}

window.addEventListener("load", function () {
  // Add an event listener to the button click event
  document.forms["frmthanhtoan"].addEventListener("submit", function (event) {
    // Helper function to show warning and focus on the specified element
    function showWarningAndFocus(message, elementId) {
      event.preventDefault();
      Swal.fire("Knotrea Thông báo!", message, "warning");
      document.getElementById(elementId).focus();
    }

    // Get the values of the input fields
    var hoTenValue = document.forms["frmthanhtoan"]["hoTen"].value.trim();
    var diaChiValue = document.forms["frmthanhtoan"]["diaChi"].value.trim();
    var emailValue = document.forms["frmthanhtoan"]["email"].value.trim();
    var dienthoaiValue = document.forms["frmthanhtoan"]["dienThoai"].value.trim();

    // Regular expressions for email and Vietnamese phone number formats
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneRegex = /^(0|\+84)(9[0-9]|3[2-9]|7[0-9]|8[0-9]|5[6-9])+([0-9]{7})$/;

    // Check if any of the fields is empty
    if (hoTenValue === "") {
      showWarningAndFocus("Họ tên người nhận đang để trống!", "billing-name");
    }

    if (diaChiValue === "") {
      showWarningAndFocus("Địa chỉ giao hàng đang để trống!", "billing-address");
    }

    if (emailValue === "") {
      showWarningAndFocus("Email đang để trống!", "billing-email-address");
    }

    if (dienthoaiValue === "") {
      showWarningAndFocus("Số điện thoại đang để trống!", "billing-phone");
    }

    // Check email format
    if (!emailRegex.test(emailValue)) {
      showWarningAndFocus("Email sai định dạng!", "billing-email-address");
    }

    // Check phone number format
    if (!phoneRegex.test(dienthoaiValue)) {
      showWarningAndFocus("Số điện thoại không hợp lệ!", "billing-phone");
    }
  });
});

