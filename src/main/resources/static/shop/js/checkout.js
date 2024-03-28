// window.addEventListener("load", function () {
//   // Lấy giá trị từ input
//   var price = $("input[name='prices']").val();
//   var ship = $("input[name='shipper']").val();

//   // Chuyển đổi giá trị thành số
//   var tongTien = parseInt(price) + parseInt(ship);

//   // Kiểm tra xem có phải là số không
//   if (!isNaN(tongTien)) {
//     // Định dạng tiền tệ và gán giá trị vào phần tử
//     $(".total").text(
//       price.toLocaleString("vi-VN", {
//         style: "currency",
//         currency: "VND",
//       })
//     );

//     $("input[name='total']").val(price);

//     var formattedTongTien = tongTien.toLocaleString("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     });

//     $(".total-payment-infor").text(formattedTongTien);

//     // Gán giá trị vào input
//     $("input[id='payment']").val(tongTien);

//     console.log(tongTien);
//   } else {
//     console.log("Giá trị không hợp lệ");
//   }
// });

// function submitForm() {
//   var voucherCode = $("input[name='voucher']").val();
//   var total = $("input[name='total']").val();
//   var thanhToan = $("input[name='payment']").val();

//   $.ajax({
//     type: "POST",
//     url: "/shop/check-out/add-voucher",
//     data: { voucher: voucherCode, total: total },
//     success: function (response) {
//       if (response.isValid) {
//         console.log(1);
//         if (response.isActive) {
//           console.log(2);
//           if (response.isTrue) {
//             console.log(3);
//             var dateEnd = new Date(response.dateEnd);
//             var currentDate = new Date();

//             if (dateEnd > currentDate) {
//               console.log(4);
//               $("#voucherCode").attr("readonly", true);

//               var discountAmount = response.discount;
//               $(".voucher-info").text(
//                 "-" +
//                   discountAmount.toLocaleString("vi-VN", {
//                     style: "currency",
//                     currency: "VND",
//                   })
//               );

//               // Tính toán tổng thanh toán sau giảm giá
//               var totalPayment = thanhToan - discountAmount;

//               console.log(totalPayment);

//               // Định dạng số và gán vào total-payment-info
//               var formattedTotalPayment = totalPayment.toLocaleString("vi-VN", {
//                 style: "currency",
//                 currency: "VND",
//               });
//               $(".total-payment-infor").text(formattedTotalPayment);

//               // Gán giá trị vào input
//               $("input[id='payment']").val(totalPayment);
//             } else {
//               Swal.fire({
//                 title: "Knotrea Thông Báo!",
//                 text: "Mã giảm giá quá hạn sử dụng!",
//                 icon: "error",
//                 timer: 1000,
//                 showConfirmButton: false,
//               });
//             }
//           } else {
//             Swal.fire({
//               title: "Knotrea Thông Báo!",
//               text: "Đơn hàng không đủ điều kiện!",
//               icon: "error",
//               timer: 1000,
//               showConfirmButton: false,
//             });
//           }
//         } else {
//           Swal.fire({
//             title: "Knotrea Thông Báo!",
//             text: "Mã giảm giá đã kết thúc!",
//             icon: "error",
//             timer: 1000,
//             showConfirmButton: false,
//           });
//         }
//       } else {
//         Swal.fire({
//           title: "Knotrea Thông Báo!",
//           text: "Mã giảm giá không tồn tại!",
//           icon: "error",
//           timer: 1000,
//           showConfirmButton: false,
//         });
//       }
//     },
//     error: function (error) {
//       console.log("Error:", error);
//     },
//   });
// }

// window.addEventListener("load", function () {
//   // Add an event listener to the button click event
//   document.forms["frmthanhtoan"].addEventListener("submit", function (event) {
//     // Helper function to show warning and focus on the specified element
//     function showWarningAndFocus(message, elementId) {
//       event.preventDefault();
//       Swal.fire("Knotrea Thông báo!", message, "warning");
//       document.getElementById(elementId).focus();
//     }

//     // Get the values of the input fields
//     var hoTenValue = document.forms["frmthanhtoan"]["hoTen"].value.trim();
//     var diaChiValue = document.forms["frmthanhtoan"]["diaChi"].value.trim();
//     var emailValue = document.forms["frmthanhtoan"]["email"].value.trim();
//     var dienthoaiValue = document.forms["frmthanhtoan"]["dienThoai"].value.trim();

//     // Regular expressions for email and Vietnamese phone number formats
//     var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     var phoneRegex = /^(0|\+84)(9[0-9]|3[2-9]|7[0-9]|8[0-9]|5[6-9])+([0-9]{7})$/;

//     // Check if any of the fields is empty
//     if (hoTenValue === "") {
//       showWarningAndFocus("Họ tên người nhận đang để trống!", "billing-name");
//     }

//     if (diaChiValue === "") {
//       showWarningAndFocus("Địa chỉ giao hàng đang để trống!", "billing-address");
//     }

//     if (emailValue === "") {
//       showWarningAndFocus("Email đang để trống!", "billing-email-address");
//     }

//     if (dienthoaiValue === "") {
//       showWarningAndFocus("Số điện thoại đang để trống!", "billing-phone");
//     }

//     // Check email format
//     if (!emailRegex.test(emailValue)) {
//       showWarningAndFocus("Email sai định dạng!", "billing-email-address");
//     }

//     // Check phone number format
//     if (!phoneRegex.test(dienthoaiValue)) {
//       showWarningAndFocus("Số điện thoại không hợp lệ!", "billing-phone");
//     }
//   });
// });

var app = angular.module("myApp", []);

app.controller("CheckoutController", function ($scope, $http) {
  // Lấy danh sách sản phẩm từ localStorage
  var $cart = ($scope.cart = {
    items: [],
    // add(id) {
    //   // thêm sản phẩm vào giỏ hàng
    //   var item = this.items.find((item) => item.id == id);
    //   if (item) {
    //     item.qty++;
    //     this.saveToLocalStorage();
    //   } else {
    //     $http.get(`/rest/products/${id}`).then((resp) => {
    //       resp.data.qty = 1;
    //       this.items.push(resp.data);
    //       this.saveToLocalStorage();
    //     });
    //   }
    // },
    // remove(id) {
    //   // xóa sản phẩm khỏi giỏ hàng
    //   var index = this.items.findIndex((item) => item.id == id);
    //   this.items.splice(index, 1);
    //   this.saveToLocalStorage();
    // },
    clear() {
      // Xóa sạch các mặt hàng trong giỏ
      this.items = [];
      this.saveToLocalStorage();
    },
    // amt_of(item) {
    //   // tính thành tiền của 1 sản phẩm
    //   return item.price * item.qty;
    // },
    // get count() {
    //   // tính tổng số lượng các mặt hàng trong giỏ
    //   return this.items
    //     .map((item) => item.qty)
    //     .reduce((total, qty) => (total += qty), 0);
    // },
    // get amount() {
    //   // tổng thành tiền các mặt hàng trong giỏ
    //   return this.items
    //     .map((item) => this.amt_of(item))
    //     .reduce((total, amt) => (total += amt), 0);
    // },
    // saveToLocalStorage() {
    //   // lưu giỏ hàng vào local storage
    //   var json = JSON.stringify(angular.copy(this.items));
    //   localStorage.setItem("cart", json);
    // },
    loadFromLocalStorage() {
      // đọc giỏ hàng từ local storage
      var json = localStorage.getItem("cart");
      this.items = json ? JSON.parse(json) : [];
    },
    format(item){
      item.price = formatPrice(item.price);
      console.log(item.price);
      return item.price;
    },
  });

  $cart.loadFromLocalStorage();

  // Hàm tính tổng tiền của các sản phẩm
  $scope.subtotal = function () {
    var subtotal = 0;
    $cart.items.forEach(function (product) {
      subtotal += product.price * product.quantity;
    });

    return subtotal;
  };

  $scope.subpayment = $scope.subtotal() + 30000;

  $scope.total = formatPrice($scope.subtotal());

  $scope.payment = formatPrice($scope.subpayment);

  $scope.order = {
    get taiKhoan_donHang() {
      return { tenDangNhap: "annv143" };
    },
    hoTen: "",
    get diaChiNhanHang() {
      return { id: 1 };
    },
    soDienThoai: "",
    mail: "",
    ngayDatHang: new Date(),
    tongTien: $scope.subpayment,
    get maGiamGia() {
      return { id: "HUBERT" };
    },
    ghiChu: "",
    get trangThai_donDatHang() {
      return { id: 8 };
    },
    get phuongThucThanhToan() {
      return { id: 2 };
    },
    get chiTietDonDatHang() {
      return $cart.items.map((item) => {
        return {
          sanPham_donDatHang: { isbn: item.id },
          donGia: item.price,
          soLuong: item.quantity,
        };
      });
    },
    purchase() {
      var order = angular.copy(this);
      // Thực hiện đặt hàng
      $http
        .post("/rest/orders", order)
        .then((resp) => {
          alert("Đặt hàng thành công!");
          $cart.clear();
          // location.href = "/order/detail/" + resp.data.id;
        })
        .catch((error) => {
          alert("Đặt hàng lỗi!");
          console.log(error);
        });
    },
  };

  // Hàm định dạng giá
  function formatPrice(price) {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  // Chuyển đổi đối tượng từ dạng có $$hashKey sang dạng không có $$hashKey
  function removeHashKeys(array) {
    return array.map(function (item) {
      var newItem = Object.assign({}, item);
      delete newItem.$$hashKey;
      return newItem;
    });
  }
});
