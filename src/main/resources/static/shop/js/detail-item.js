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
      var isbn = $(this).data("isbn");
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

      var product = {
        user: account[0].tenDangNhap,
        id: isbn,
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
      var isbn = $(this).data("isbn");
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

      var product = {
        id: isbn,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity,
      };

      localStorage.removeItem("buynow");

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
        user: productId.user,
        id: productId.id,
        name: productId.name,
        image: productId.image,
        price: productId.price,
        quantity: 1,
      };

      cart.push(newItem);
    }

    // Lưu lại giỏ hàng vào Local Storage
    localStorage.setItem("cart", JSON.stringify(cart));
  }

});

function submitReview() {
  // Lấy giá trị đánh giá từ input radio đã được chọn
  var rating = $("input[name='rating']:checked").val();
  if (!rating) {
    // Hiển thị thông báo thành công
    iziToast.warning({
      title: 'Thông báo',
      message: 'Vui lòng chọn điểm đánh giá.',
      position: 'topRight'
    });
    return; // Không tiếp tục nếu không có đánh giá được chọn
  }

  // Lấy giá trị nhận xét từ textarea
  var comment = $("#comment").val();
  var isbn = $("#productId").val();
  var user_id = JSON.parse(localStorage.getItem("account")) || null;

  // Kiểm tra nếu nhận xét chứa từ cấm
  $.ajax({
    url: "/rest/banned-word",
    type: "GET",
    success: function (bannedWords) {
      // Lấy danh sách từ cấm từ response
      var bannedWordsList = bannedWords.map(function (word) {
        return word.toLowerCase(); // Chuyển tất cả các từ thành chữ thường để so sánh
      });

      // Kiểm tra xem nhận xét có chứa từ cấm không
      var containsBannedWord = bannedWordsList.some(function (word) {
        return comment.toLowerCase().includes(word);
      });

      if (containsBannedWord) {
        // Hiển thị thông báo nếu nhận xét chứa từ cấm
        iziToast.warning({
          title: 'Thông báo',
          message: 'Nhận xét của bạn chứa từ cấm.',
          position: 'topRight'
        });
      } else {
        // Gửi dữ liệu đánh giá lên máy chủ sử dụng jQuery AJAX nếu không có từ cấm
        $.ajax({
          url: "/rest/review/" + isbn + "/" + rating + "/" + comment + "/" + user_id[0].tenDangNhap,
          type: "POST",
          success: function (response) {
            // Xử lý kết quả trả về từ máy chủ
            $("#comment").val(""); // Xóa giá trị của textarea
            $("input[name='rating']").prop("checked", false); // Xóa giá trị của rating
            // Hiển thị thông báo thành công
            iziToast.success({
              title: 'Thông báo',
              message: 'Đã thêm đánh giá thành công.',
              position: 'topRight'
            });
            location.reload();
          },
          error: function (error) {
            console.error("Error:", error);
          }
        });
      }
    },
    error: function (error) {
      console.error("Error:", error);
    }
  });
}

var app = angular.module("myApp", []);

app.controller("DetailproductCtrl", function ($scope, $http, $filter) {

  $scope.user = JSON.parse(localStorage.getItem("account")) || null;

  $scope.checkOrder = function () {
    var isbn = $("#productId").val();
    $http.get("/rest/order/check/" + $scope.user[0].tenDangNhap + "/" + isbn).then(function (resp) {
      $scope.orderCheck = resp.data;
      console.log(resp.data);
    })
  }

  $scope.checkUserReview = function () {

    var isbn = $("#productId").val();

    if ($scope.user[0].tenDangNhap !== null) {
      $http.get("/rest/review-check/" + $scope.user[0].tenDangNhap + "/" + isbn).then((resp) => {
        $scope.reviewCheck = resp.data;
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        var dateObject = new Date($scope.reviewCheck.date);

        // Định dạng ngày thành chuỗi "dd/MM/yyyy"
        $scope.formattedDate = $filter('date')(dateObject, 'dd/MM/yyyy');
        console.log(resp.data);
      })
    }
  }
  $scope.checkOrder();

  $scope.checkUserReview();


});
