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
           location.href = "/shop/order/thank-for-order";
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
