var app = angular.module("myApp", []);

app.controller("CheckoutController", function ($scope, $http) {
  // Lấy danh sách sản phẩm từ localStorage
  var $cart = ($scope.cart = {
    items: [],
    clear() {
      // Xóa sạch các mặt hàng trong giỏ
      this.items = [];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      // lưu giỏ hàng vào local storage
      var json = JSON.stringify(angular.copy(this.items));
      localStorage.setItem("cart", json);
    },
    loadFromLocalStorage() {
      // đọc giỏ hàng từ local storage
      var json = localStorage.getItem("cart");
      this.items = json ? JSON.parse(json) : [];
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

  $scope.discount;

  $scope.formatPrice = function (price) {
    price = parseInt(price);
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  $scope.info_user = JSON.parse(localStorage.getItem("account")) || null;

  $scope.order = {
    get taiKhoan_donHang() {
      return { tenDangNhap: $scope.info_user[0].tenDangNhap };
    },
    hoTen: $scope.info_user[1].hoTen,
    get diaChiNhanHang() {
      return { id: $scope.info_user[1].id };
    },
    soDienThoai: $scope.info_user[1].sdt,
    mail: $scope.info_user[0].email,
    ngayDatHang: new Date(),
    tongTien: $scope.subpayment,
    get maGiamGia() {
      return { id: $('input[name="voucher"]').val() };
    },
    ghiChu: "",
    get trangThai_donDatHang() {
      return { id: 8 };
    },
    get phuongThucThanhToan() {
      return { id: $('input[name="pay-method"]:checked').val() };
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
          if (resp.data.phuongThucThanhToan.id === 2) {
            alert("Đặt hàng thành công!");
            $cart.clear();
            location.href = "/shop/order/thank-for-order";
          } else {
            location.href = "/shop/order/vnpay-payment?amount=" + resp.data.tongTien + "&order-id=" + resp.data.maDonHang + "&hoTen=" + resp.data.hoTen + "&soDienThoai=" + resp.data.soDienThoai + "&mail=" + resp.data.mail;
          }
        })
        .catch((error) => {
          alert("Đặt hàng lỗi!");
          console.log(order);
          console.log(error);
        });
    },
  };

  console.log($scope.order);

  $scope.voucher = {
    dateEnd: "",
    discount: "",
  };

  $scope.checkVoucher = function () {
    var voucherCode = $scope.voucherCode; // Lấy giá trị mã giảm giá từ model
    var total = $scope.subpayment; // Thay bằng giá trị tổng tiền thực tế

    // Gửi yêu cầu POST đến backend
    $http
      .get("/rest/voucher?voucher=" + voucherCode + "&total=" + total)
      .then(function (response) {
        // Xử lý dữ liệu từ phản hồi
        var data = response.data;
        if (data.isValid) {
          if (data.isActive) {
            if (data.isTrue) {
              // Mã giảm giá hợp lệ và đủ điều kiện
              $scope.voucher.dateEnd = data.dateEnd;
              $scope.voucher.discount = data.discount;
              $scope.subpayment = $scope.subpayment - data.discount;

              console.log($scope.subpayment);

              $scope.discount = formatPrice(data.discount);
              $scope.payment = formatPrice($scope.subpayment);
            } else {
              // Mã giảm giá không đủ điều kiện
              console.log("Mã giảm giá không đủ điều kiện.");
            }
          } else {
            // Mã giảm giá đã hết hạn hoặc không hoạt động
            console.log("Mã giảm giá đã hết hạn hoặc không hoạt động.");
          }
        } else {
          // Mã giảm giá không hợp lệ
          console.log("Mã giảm giá không hợp lệ.");
        }
      })
      .catch(function (error) {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi gửi yêu cầu: " + error);
        console.log(voucherCode + total);
      });
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
