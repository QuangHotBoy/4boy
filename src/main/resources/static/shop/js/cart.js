function incrementQuantity() {
  var quantityInput = $("#quantity");
  var currentValue = parseInt(quantityInput.val());
  var maxQuantity = parseInt(quantityInput.attr("max"));

  console.log(maxQuantity);

  if (currentValue + 1 > maxQuantity) {
    iziToast.warning({
      title: 'Thông báo',
      message: 'Số lượng đạt tối đa hiện có.',
      position: 'topRight'
    });
  } else {
    quantityInput.val(currentValue + 1);
  }
}

function decrementQuantity() {
  var quantityInput = $("#quantity");
  var newValue = parseInt(quantityInput.val()) - 1;
  quantityInput.val(newValue >= 1 ? newValue : 1);
}

var app = angular.module("myApp", []);

app.controller("CartController", function ($scope, $http, $window) {
  // Lấy danh sách sản phẩm từ localStorage

  var user = JSON.parse($window.localStorage.getItem("account"));

  if (user === null) {
    $scope.cartCount = "0";
    $scope.calculateSubtotal = function () {
      return "0 đ";
    };
    $scope.calculateTotal = function () {
      return "30.000 đ";
    };
  } else {
    var user_id = user[0].tenDangNhap;

    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    $scope.cart = [];

    // Loại bỏ thuộc tính $$hashKey khỏi mỗi phần tử trong mảng
    for (var i = 0; i < cart.length; i++) {
      delete cart[i].$$hashKey;
    }

    // Lưu dữ liệu giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    for (var i = 0; i < cart.length; i++) {
      if (cart[i].user === user_id) {
        $scope.cart.push(cart[i]);
      }
    }

    // Tính tổng số lượng sản phẩm trong giỏ hàng
    $scope.calculateCartCount = function () {
      return $scope.cart.reduce(function (total, product) {
        return total + product.quantity;
      }, 0);
    };

    $scope.cartCount = $scope.calculateCartCount();

    // Hàm giảm số lượng sản phẩm
    $scope.decrementQuantity = function (index) {
      if ($scope.cart[index].quantity > 1) {
        $scope.cart[index].quantity--;
        $scope.cartCount = $scope.calculateCartCount();
        updateLocalStorage();
      }
    };

    // Hàm tăng số lượng sản phẩm
    $scope.incrementQuantity = function (index) {
      $scope.cart[index].quantity++;
      $scope.cartCount = $scope.calculateCartCount();
      updateLocalStorage();
    };

    // Hàm xóa sản phẩm
    $scope.deleteProduct = function (index) {
      $scope.cart.splice(index, 1);
      $scope.cartCount = $scope.calculateCartCount();
      updateLocalStorage();
    };

    // Hàm cập nhật localStorage
    function updateLocalStorage() {
      localStorage.setItem("cart", JSON.stringify($scope.cart));
    }

    // Hàm tính tổng tiền
    $scope.calculateTotal = function () {
      var total = 0;
      $scope.cart.forEach(function (product) {
        total += product.price * product.quantity;
      });

      total = total + 30000;
      return formatPrice(total);
    };

    // Hàm tính tổng tiền của các sản phẩm
    $scope.calculateSubtotal = function () {
      var subtotal = 0;
      $scope.cart.forEach(function (product) {
        subtotal += product.price * product.quantity;
      });
      return formatPrice(subtotal);
    };

    // Hàm định dạng giá
    function formatPrice(price) {
      return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }
  }
});
