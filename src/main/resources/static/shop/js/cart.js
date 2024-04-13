$(document).ready(function () {
  var user = JSON.parse(localStorage.getItem("account") || null);

  if (user === null) {
    $("#cart-count").text(0);
  } else {
    var user_id = user[0].tenDangNhap;

    // Lấy danh sách sản phẩm từ localStorage
    var carts = JSON.parse(localStorage.getItem("cart")) || [];

    var cart = [];

    for (var i = 0; i < carts.length; i++) {
      if (carts[i].user === user_id) {
        cart.push(carts[i]);
      }
    }

    // Đếm số lượng sản phẩm trong giỏ hàng
    var cartCount = cart.reduce(function (total, product) {
      return total + parseInt(product.quantity);
    }, 0);

    // Hiển thị số lượng sản phẩm lên website
    $("#cart-count").text(cartCount);
  }

  // Lặp qua từng sản phẩm trong giỏ hàng (cart-item)
  $('.cart-item').each(function() {
    var maSP = $(this).find('.maSP').val(); // Lấy giá trị maSP của sản phẩm

    console.log(maSP);

    // Thực hiện AJAX request
    $.ajax({
        url: '/rest/products/' + maSP, // URL để lấy dữ liệu
        type: 'GET', // Phương thức HTTP (GET, POST, PUT, DELETE,...)
        dataType: 'json', // Kiểu dữ liệu trả về từ server
        success: function(data) {
            // Xử lý dữ liệu trả về khi thành công
            $(this).find('.product-quantity').append(data.soLuong); // Hiển thị dữ liệu soLuong
        }.bind(this), // Dùng bind để đảm bảo ngữ cảnh (context) của 'this' trong hàm success là phần tử đang được lặp qua
        error: function(xhr, status, error) {
            // Xử lý lỗi khi request thất bại
            console.error('Error:', status, error);
        }
    });
});
});

var app = angular.module("myApp", []);

app.filter('vnCurrency', function () {
  return function (input) {
    if (isNaN(input)) return input;
    return input.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
});

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

    if ($scope.cart.length > 0) {
      $scope.cartCheck = true;
    } else {
      $scope.cartCheck = false;
    }

    // Tính tổng số lượng sản phẩm trong giỏ hàng
    $scope.calculateCartCount = function () {
      return $scope.cart.reduce(function (total, product) {
        return total + parseInt(product.quantity);
      }, 0);
    };

    $scope.cartCount = $scope.calculateCartCount();

    $scope.decrementQuantity = function (index) {
      if ($scope.cart[index].quantity > 1) {
        $scope.cart[index].quantity--;
        $scope.cartCount = $scope.calculateCartCount();
        updateLocalStorage();
        $("#cart-count").text($scope.calculateCartCount());
      }
    };

    $scope.incrementQuantity = function (index) {
      var quantityInput = $("input[name='maSP']").eq(index);

      $http.get("/rest/products/" + quantityInput.val()).then((resp) => {
        var maxQuantity = resp.data.soLuong; // Số lượng tối đa từ resp.data.soLuong

        // Kiểm tra nếu giá trị hiện tại của quantity đã đạt tới giới hạn
        if ($scope.cart[index].quantity === maxQuantity) {
          iziToast.warning({
            title: 'Thông báo',
            message: 'Số lượng đã đạt tối đa.',
            position: 'topRight'
          });
          return; // Không làm gì nữa nếu đã đạt tối đa
        }

        // Tăng giá trị quantity nếu chưa đạt tối đa
        $scope.cart[index].quantity++;
        $scope.cartCount = $scope.calculateCartCount();

        updateLocalStorage();
        $("#cart-count").text($scope.calculateCartCount());
      }).catch((error) => {
        console.error("Error retrieving max quantity:", error);
      });
    };

    // Hàm xóa sản phẩm
    $scope.deleteProduct = function (index) {
      $scope.cart.splice(index, 1);
      $scope.cartCount = $scope.calculateCartCount();
      updateLocalStorage();
      $("#cart-count").text($scope.calculateCartCount());
    };

    // Hàm cập nhật localStorage
    function updateLocalStorage() {
      localStorage.setItem("cart", JSON.stringify($scope.cart));
    }

    // Hàm tính tổng tiền của mỗi sản phẩm trong giỏ hàng
    $scope.calculateItemTotal = function (item) {
      return formatPrice(item.price * item.quantity);
    };

    // Hàm tính tổng tiền của các sản phẩm
    $scope.calculateSubtotal = function () {
      var subtotal = 0;
      $scope.cart.forEach(function (product) {
        subtotal += product.price * product.quantity;
      });
      return formatPrice(subtotal);
    };

    $scope.formatPrice = function (price) {
      price = parseInt(price);
      return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    };

    // Hàm định dạng giá
    function formatPrice(price) {
      return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }
  }

  $scope.checkLogin = function () {
    var account = localStorage.getItem("account") || null;
    if (account === null) {
      location.href = "/shop/login";
    } else {
      location.href = "/shop/auth/index";
    }
  }

  $scope.isUserLoggedIn = function () {
    var account = localStorage.getItem("account");
    return !!account; // Trả về true nếu có giá trị trong localStorage.getItem("account")
  };

  // đăng xuất
  $scope.logout = function () {
    $scope.addToCart();
    localStorage.removeItem("account");
    location.href = "/shop/home";
  }

  $scope.info_user = JSON.parse(localStorage.getItem("account")) || null;

  $scope.addToCart = function () {
    // Đăng xuất lưu lại cart từ localStorage vào database
    var carts = JSON.parse(localStorage.getItem("cart")) || [];

    $scope.cart = [];

    for (let i = 0; i < carts.length; i++) {
      if (carts[i].user === $scope.info_user[0].tenDangNhap) {
        $scope.cart.push(carts[i]);
      }
    }

    // Xác định các sản phẩm cần xóa khỏi localStorage
    var productsToRemove = $scope.cart.map(function (product) {
      return product.id; // Giả sử id là thuộc tính duy nhất định danh sản phẩm
    });

    function removeFromLocalStorage(productsToRemove) {
      var carts = JSON.parse(localStorage.getItem("cart")) || [];

      // Loại bỏ các sản phẩm đã xác định khỏi mảng carts
      carts = carts.filter(function (product) {
        return !productsToRemove.includes(product.id);
      });

      // Lưu mảng đã cập nhật vào localStorage
      localStorage.setItem("cart", JSON.stringify(carts));
    }

    $scope.addCart = {
      get taiKhoan_gioHang() {
        return { tenDangNhap: $scope.info_user[0].tenDangNhap };
      },
      get gioHang() {
        return $scope.cart.map((item) => {
          return {
            sanPham_gioHang: { isbn: item.id },
            soLuong: item.quantity
          }
        });
      },
      add() {
        var cart = angular.copy(this);
        $http.post("/rest/add-cart", cart).then((resp) => {
          removeFromLocalStorage(productsToRemove);
        }).catch((error) => {
          console.log(error);
        })
      }
    }

    $scope.addCart.add();

    // Hiển thị số lượng sản phẩm lên website
    $("#cart-count").text(0);
  }
});
