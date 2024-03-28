var app = angular.module("myApp", []);

app.controller("CartController", function ($scope) {
  // Lấy danh sách sản phẩm từ localStorage
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  $scope.cart = cart;

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  $scope.cartCount = cart.reduce(function (total, product) {
    return total + product.quantity;
  }, 0);

  // Hàm giảm số lượng sản phẩm
  $scope.decrementQuantity = function (index) {
    if ($scope.cart[index].quantity > 1) {
      $scope.cart[index].quantity--;
      updateLocalStorage();
    }
  };

  // Hàm tăng số lượng sản phẩm
  $scope.incrementQuantity = function (index) {
    $scope.cart[index].quantity++;
    updateLocalStorage();
  };

  // Hàm xóa sản phẩm
  $scope.deleteProduct = function (index) {
    $scope.cart.splice(index, 1);
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
    return total;
  };

  // Hàm tính tổng tiền của các sản phẩm
  $scope.calculateSubtotal = function () {
    var subtotal = 0;
    $scope.cart.forEach(function (product) {
      subtotal += product.price * product.quantity;
    });
    return subtotal;
  };
});
