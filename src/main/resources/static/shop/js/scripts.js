document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    // Load all images immediately
    lazyImages.forEach(function (lazyImage) {
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.classList.remove("lazy");
    });
  }
});

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
      return total + product.quantity;
    }, 0);

    // Hiển thị số lượng sản phẩm lên website
    $("#cart-count").text(cartCount);
  }
});

var isBuyNowPage = false;

// Kiểm tra khi trang sắp được thoát
$(window).on("beforeunload", function () {
  if (isBuyNowPage) {
    localStorage.removeItem("buynow");
  }
});

// Kiểm tra đường dẫn mỗi khi đường dẫn thay đổi
$(document).ready(function () {
  var currentPath = window.location.pathname;
  console.log(currentPath);
  isBuyNowPage = currentPath === "/shop/buy-now";
});

$(document).ready(function () {
  // Xử lý sự kiện khi người dùng nhấn vào nút "Thêm vào giỏ hàng"
  $(".btn-outline-warning.add-to-cart").click(function () {
    var account = JSON.parse(localStorage.getItem("account")) || null;

    if (account === null) {
      iziToast.warning({
        title: 'Thông báo',
        message: 'Vui lòng đăng nhập vào tài khoản.',
        position: 'topRight'
      });
    } else {
      // Lấy thông tin sản phẩm từ phần tử cha của nút được nhấn
      var productContainer = $(this).closest(".card");
      var isbn = $(this).data("isbn");
      var productName = productContainer.find("h5").text();
      var productPrice = productContainer
        .find(".fw-bold")
        .first()
        .text()
        .replace(" đ", "")
        .replace(".", "");
      var productImage = productContainer.find("img").attr("src");
      var quantity = 1;

      // Tạo đối tượng sản phẩm
      var product = {
        user: account[0].tenDangNhap,
        id: isbn,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity,
      };

      var productId = product; // ID của sản phẩm cần thêm
      addToCart(productId);

      // Hiển thị thông báo thành công
      iziToast.success({
        title: 'Thông báo',
        message: 'Đã thêm sản phẩm vào giỏ hàng.',
        position: 'topRight'
      });
    }
  });

  $(".text-bg-warning.buynow").click(function () {
    var account = JSON.parse(localStorage.getItem("account")) || null;

    if (account === null) {
      iziToast.warning({
        title: 'Thông báo',
        message: 'Vui lòng đăng nhập vào tài khoản.',
        position: 'topRight'
      });
    } else {
      // Lấy thông tin sản phẩm từ phần tử cha của nút được nhấn
      var productContainer = $(this).closest(".card");
      var isbn = $(this).data("isbn");
      var productName = productContainer.find("h5").text();
      var productPrice = productContainer
        .find(".fw-bold")
        .first()
        .text()
        .replace(" đ", "")
        .replace(".", "");
      var productImage = productContainer.find("img").attr("src");
      var quantity = 1;

      // Tạo đối tượng sản phẩm
      var product = {
        id: isbn,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity,
      };

      // Lấy danh sách sản phẩm từ LocalStorage (nếu có)
      var cart = JSON.parse(localStorage.getItem("buynow")) || [];

      // Thêm sản phẩm vào giỏ hàng
      cart.push(product);

      // Lưu lại danh sách sản phẩm vào LocalStorage
      localStorage.setItem("buynow", JSON.stringify(cart));

      location.href = "/shop/buy-now";
    }
  });

  function addToCart(productId) {
    var carts = JSON.parse(localStorage.getItem("cart")) || [];
    var found = false;

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    $.each(carts, function (index, item) {
      if (item.user === productId.user && item.id === parseInt(productId.id)) {
        item.quantity++; // Tăng số lượng nếu sản phẩm đã tồn tại
        found = true;
        return false; // Dừng vòng lặp khi tìm thấy sản phẩm
      }
    });

    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào
    if (!found) {
      var newItem = {
        user: productId.user,
        id: productId.id,
        name: productId.name,
        image: productId.image,
        price: productId.price,
        quantity: 1,
      };
      carts.push(newItem);
    }

    // Lưu lại giỏ hàng vào Local Storage
    localStorage.setItem("cart", JSON.stringify(carts));

    var user = JSON.parse(localStorage.getItem("account") || null);

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
      return total + product.quantity;
    }, 0);

    // Hiển thị số lượng sản phẩm lên website
    $("#cart-count").text(cartCount);
  }
});

var app = angular.module("myApp", []);

// Tạo một service chứa logic kiểm tra thoát khỏi đường dẫn
angular.module('myApp').service('ExitPathService', ['$location', function($location) {
  this.checkExitPath = function() {
      return !$location.path().startsWith('/shop');
  };
}]);

// Controller thứ hai
angular.module('myApp').controller('HomeCtrl', ['$scope', 'ExitPathService', function($scope, ExitPathService) {
  $scope.checkExit = function() {
      if (ExitPathService.checkExitPath()) {
          console.log('Người dùng đã thoát khỏi đường dẫn /shop/* từ Controller2');
          // Thực hiện các hành động tương ứng
      }
  };
}]);

app.controller("HomeCtrl", function ($scope, $http, $window) {

  $scope.cart = function (user_id) {
    $http.get("/rest/cart/" + user_id).then(function (resp) {

      var cart = localStorage.getItem("cart") || [];

      $scope.data = resp.data;

      for (var i = 0; i < Object.keys($scope.data).length; i++) {
        // Gọi hàm chuyển đổi
        var convertedData = arrayToObject($scope.data[i]);

        cart.push(convertedData);

        localStorage.setItem("cart", JSON.stringify(cart))
      }
    })
  }

  var user = JSON.parse(localStorage.getItem("account")) || [];

  if(user !== null){
    $scope.cart(user[0].tenDangNhap);
  }

  // Hàm chuyển đổi từ mảng con sang đối tượng
  function arrayToObject(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i][0];
      var value = arr[i][1];
      obj[key] = value;
    }
    return obj;
  }

})