var app = angular.module("myApp", []);

app.controller("BuynowController", function ($scope, $http) {
  var $buy = ($scope.buy = {
    item: [],
    clear() {
      // Xóa sạch các mặt hàng trong giỏ
      this.item = [];
      this.saveToLocalStorage();
    },
    amt_of(item) {
      // tính thành tiền của 1 sản phẩm
      return item.price * item.quantity;
    },
    saveToLocalStorage() {
      // lưu giỏ hàng vào local storage
      var json = JSON.stringify(angular.copy(this.item));
      localStorage.setItem("buynow", json);
    },
    loadFromLocalStorage() {
      // đọc giỏ hàng từ local storage
      var json = localStorage.getItem("buynow");
      this.item = json ? JSON.parse(json) : [];
    },
  });

  $buy.loadFromLocalStorage();

  $scope.subtotal = function (item) {
    return $buy.amt_of(item);
  };

  $scope.subpayment = $scope.subtotal($buy.item[0]) + 30000;

  $scope.total = formatPrice($scope.subtotal($buy.item[0]));

  $scope.payment = formatPrice($scope.subpayment);

  // Hàm định dạng giá
  function formatPrice(price) {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  $scope.formatPrice = function (price) {
    price = parseInt(price)
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  $scope.voucher = {
    dateEnd: '',
    discount: ''
  };

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
      return $buy.item.map((item) => {
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
            $buy.clear();
            location.href = "/shop/order/thank-for-order";
          } else {
            location.href = "/shop/order/vnpay-payment?amount=" + resp.data.tongTien + "&order-id=" + resp.data.maDonHang + "&hoTen=" + resp.data.hoTen + "&soDienThoai=" + resp.data.soDienThoai + "&mail=" + resp.data.mail;
          }
        })
        .catch((error) => {
          alert("Đặt hàng lỗi!");
          console.log(error);
        });
    },
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

});
