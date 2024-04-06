function incrementQuantity() {
  var quantityInput = $("#quantity");
  var currentValue = parseInt(quantityInput.val());
  var maxQuantity = parseInt(quantityInput.attr("max"));

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

$(document).ready(function () {
  // Xử lý sự kiện khi người dùng nhấn vào nút "Thêm vào giỏ hàng"
  $(".btn-outline-warning.add-to-cart").click(function () {
    // Lấy thông tin sản phẩm từ phần tử cha của nút được nhấn
    var account = JSON.parse(localStorage.getItem("account")) || null;

    if (account === null) {
      iziToast.warning({
        title: 'Thông báo',
        message: 'Vui lòng đăng nhập vào tài khoản.',
        position: 'topRight'
      });
    } else {
      var productContainer = $(this).closest(".product-container"); // Thay đổi lựa chọn để chọn phần tử chứa thông tin sản phẩm
      var productName = productContainer.find(".product-name").text(); // Thay đổi để lấy tên sách từ thẻ h4
      var productImage = productContainer.find("img").attr("src"); // Thay đổi để lấy đường dẫn ảnh từ thẻ img
      var productPrice;

      // Kiểm tra xem sản phẩm có giảm giá hay không
      if (productContainer.find(".text-warning").length > 0) {
        // Nếu có giảm giá, lấy giá sau khi giảm giá
        productPrice = productContainer
          .find(".text-warning")
          .first()
          .text()
          .replace(" đ", "")
          .replace(".", "");
      } else {
        // Nếu không có giảm giá, lấy giá ban đầu
        productPrice = productContainer
          .find(".text-warning")
          .text()
          .replace(" đ", "")
          .replace(".", "");
      }

      var quantity = parseInt(productContainer.find("#quantity").val()); // Lấy số lượng sản phẩm từ input

      // Tạo đối tượng sản phẩm
      var product = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity,
      };

      addToCart(product); // Gọi hàm addToCart với thông tin sản phẩm

      // Hiển thị thông báo thành công
      iziToast.success({
        title: 'Thông báo',
        message: 'Đã thêm sản phẩm vào giỏ hàng.',
        position: 'topRight'
      });
    }
  });

  $(".text-bg-warning.buynow").click(function () {
    // Lấy thông tin sản phẩm từ phần tử cha của nút được nhấn
    var account = JSON.parse(localStorage.getItem("account")) || null;

    if (account === null) {
      iziToast.warning({
        title: 'Thông báo',
        message: 'Vui lòng đăng nhập vào tài khoản.',
        position: 'topRight'
      });
    } else {
      var productContainer = $(this).closest(".product-container"); // Thay đổi lựa chọn để chọn phần tử chứa thông tin sản phẩm
      var productName = productContainer.find(".product-name").text(); // Thay đổi để lấy tên sách từ thẻ h4
      var productImage = productContainer.find("img").attr("src"); // Thay đổi để lấy đường dẫn ảnh từ thẻ img
      var productPrice;

      // Kiểm tra xem sản phẩm có giảm giá hay không
      if (productContainer.find(".text-warning").length > 0) {
        // Nếu có giảm giá, lấy giá sau khi giảm giá
        productPrice = productContainer
          .find(".text-warning")
          .first()
          .text()
          .replace(" đ", "")
          .replace(".", "");
      } else {
        // Nếu không có giảm giá, lấy giá ban đầu
        productPrice = productContainer
          .find(".text-warning")
          .text()
          .replace(" đ", "")
          .replace(".", "");
      }

      var quantity = parseInt(productContainer.find("#quantity").val()); // Lấy số lượng sản phẩm từ input

      // Tạo đối tượng sản phẩm
      var product = {
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
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var found = false;

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    $.each(cart, function (index, item) {
      if (item.id === parseInt(productId.id)) {
        item.quantity++; // Tăng số lượng nếu sản phẩm đã tồn tại
        found = true;
        return false; // Dừng vòng lặp khi tìm thấy sản phẩm
      }
    });

    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào
    if (!found) {
      var newItem = {
        id: productId.id,
        name: productId.name,
        image: productId.image,
        price: productId.price,
        quantity: productId.quantity,
      };

      cart.push(newItem);
    }

    // Lưu lại giỏ hàng vào Local Storage
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});

var app = angular.module("myApp", []);

app.controller("DetailproductCtrl", function ($scope, $http) {

  $scope.user = JSON.parse(localStorage.getItem("account")) || null;

  $scope.submitReview = function () {
    // Lấy giá trị đánh giá từ input radio đã được chọn
    if (!$scope.rating) {
      // Hiển thị thông báo thành công
      console.log($scope.rating);
      iziToast.warning({
        title: 'Thông báo',
        message: 'Vui lòng chọn điểm đánh giá.',
        position: 'topRight'
      });
    } else {
      // Lấy giá trị nhận xét từ textarea
      var comment = $scope.comment;
      var isbn = $("#productId").val();
      var user_id = $scope.user[0].tenDangNhap;

      // Gửi yêu cầu GET để lấy danh sách từ localhost
      $http
        .get("/rest/banned-word")
        .then(function (response) {
          // Lấy danh sách từ response
          var noiDungList = response.data;

          // Kiểm tra xem comment có chứa từ nào trong noiDungList không
          var containsRestrictedWord = false;
          for (var i = 0; i < noiDungList.length; i++) {
            if (comment.includes(noiDungList[i])) {
              containsRestrictedWord = true;
              break;
            }
          }

          if (containsRestrictedWord) {
            // Hiển thị thông báo cảnh báo
            iziToast.warning({
              title: 'Cảnh báo',
              message: 'Nội dung nhận xét không được chứa các từ không phù hợp.',
              position: 'topRight'
            });
          } else {
            // Gửi dữ liệu đánh giá lên máy chủ sử dụng $http.post
            $http
              .post("/rest/review/" + isbn + "/" + $scope.rating + "/" + comment + "/" + user_id)
              .then(function (response) {
                // Xử lý kết quả trả về từ máy chủ
                $scope.comment = ""; // Xóa giá trị của textarea
                $scope.rating = ""; // Xóa giá trị của rating
                // Hiển thị thông báo thành công
                iziToast.success({
                  title: 'Thông báo',
                  message: 'Đã thêm đánh giá thành công.',
                  position: 'topRight'
                });
              })
              .catch(function (error) {
                console.error("Error:", error);
              });
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    }
  };

  $scope.checkOrder = function () {
    var isbn = $("#productId").val();
    $http.get("/rest/order/check/" + $scope.user[0].tenDangNhap + "/" + isbn).then(function (resp) {
      $scope.orderCheck = resp.data;
    })
  }
  $scope.checkOrder();

});
