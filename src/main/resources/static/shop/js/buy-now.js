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

  $scope.inforcus = {
    name: "",
    phone: "",
    mail: "",
    address: "",
  };

  $scope.order = {
    get taiKhoan_donHang() {
      return { tenDangNhap: "annv143" };
    },
    hoTen: $scope.inforcus.name,
    get diaChiNhanHang() {
      return { id: 1 };
    },
    soDienThoai: $scope.inforcus.phone,
    mail: $scope.inforcus.mail,
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
          alert("Đặt hàng thành công!");
          $buy.clear();

          console.log(order);
          location.href = "/shop/order/thank-for-order";
        })
        .catch((error) => {
          alert("Đặt hàng lỗi!");
          console.log(error);
        });
    },
  };
});
