var app = angular.module("myApp", []);

app.controller("CheckoutController", function ($scope, $http) {
  var user = JSON.parse(localStorage.getItem("account")) || null;

  var user_id = user[0].tenDangNhap;

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

  var carts = JSON.parse(localStorage.getItem("cart")) || [];

  $scope.cart = [];

  for (let i = 0; i < carts.length; i++) {
    if (carts[i].user === user_id) {
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

  // Hàm tính tổng tiền của các sản phẩm
  $scope.subtotal = function () {
    var subtotal = 0;
    var items = $scope.cart;
    //console.log(items + '1');
    for (var i = 0; i < items.length; i++) {
      var product = items[i];
      subtotal += product.price * product.quantity;
    }

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

  $scope.selectedAddress = function () {
    $http.get("/rest/address/all-of-user/" + $scope.info_user[0].tenDangNhap).then((resp) => {
      $scope.addresses = resp.data; // Lưu trữ dữ liệu địa chỉ từ resp vào biến addresses
    });
  };

  $scope.addressChanged = function () {
    console.log($scope.selectedAddress); // Log ra ID của địa chỉ được chọn

    // Lấy ra địa chỉ được chọn từ danh sách địa chỉ
    var selectedAddress = $scope.addresses.find(address => address.id === $scope.selectedAddress);

    // Cập nhật các thông tin của $scope.info_user[1] tương ứng với địa chỉ mới
    $scope.order.hoTen = selectedAddress.hoTen;
    $scope.order.diaChiNhanHang = selectedAddress.diaChi;
    $scope.order.diaChi = { id: selectedAddress.id };
    $scope.order.soDienThoai = selectedAddress.sdt;
  };

  $scope.selectedAddress();

  $scope.order = {
    get taiKhoan_donHang() {
      return { tenDangNhap: $scope.info_user[0].tenDangNhap };
    },
    hoTen: $scope.info_user[1].hoTen,
    diaChiNhanHang: $scope.info_user[1].diaChi,
    get diaChi() {
      // Lấy ID của địa chỉ từ combo box nếu có, nếu không thì lấy từ $scope.info_user[1]
      var selectedAddressId = $scope.selectedAddress ? $scope.selectedAddress : $scope.info_user[1].id;
      return { id: selectedAddressId };
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
      return $scope.cart.map((item) => {
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
      if (
        !order.hoTen ||
        !order.diaChiNhanHang ||
        !order.mail ||
        !order.soDienThoai || !$scope.isValidEmail(order.mail) || !$scope.isValidPhone(order.soDienThoai)
      ) {
        if (!order.hoTen ||
          !order.diaChiNhanHang ||
          !order.mail ||
          !order.soDienThoai) {
          // Hiển thị thông báo thành công
          iziToast.warning({
            title: 'Thông báo',
            message: 'Vui lòng không để trống thông tin nhận hàng.',
            position: 'topRight'
          });
          return;
        } else {
          // Hiển thị thông báo thành công
          iziToast.warning({
            title: 'Thông báo',
            message: 'Vui lòng kiểm tra lại số điện thoại hoặc email.',
            position: 'topRight'
          });
          return;
        }
      } else {
        $http
          .post("/rest/orders", order)
          .then((resp) => {
            if (resp.data.phuongThucThanhToan.id === 1) {
              removeFromLocalStorage(productsToRemove);
              location.href = "/shop/order/thank-for-order";
            } else {
              removeFromLocalStorage(productsToRemove);
              location.href =
                "/shop/order/vnpay-payment?amount=" +
                resp.data.tongTien +
                "&order-id=" +
                resp.data.maDonHang +
                "&hoTen=" +
                resp.data.hoTen +
                "&soDienThoai=" +
                resp.data.soDienThoai +
                "&mail=" +
                resp.data.mail;
            }
          })
          .catch((error) => {
            // Hiển thị thông báo thành công
            iziToast.info({
              title: 'Thông báo',
              message: 'Đặt hàng xảy ra lỗi! Vui lòng thử lại sau.',
              position: 'topRight'
            });
            console.log(error);
          });
      }
    },
  };

  $scope.isValidPhone = function(phone) {
    // Biểu thức chính quy để kiểm tra số điện thoại
    var phonePattern = /^\d{10,11}$/;
    return phonePattern.test(phone);
};

$scope.isValidEmail = function(email) {
    // Biểu thức chính quy để kiểm tra email
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
};

  $scope.voucher = {
    dateEnd: "",
    discount: "",
  };

  $scope.checkVoucher = function () {
    var voucherCode = $scope.voucherCode; // Lấy giá trị mã giảm giá từ model
    var total = $scope.subpayment; // Thay bằng giá trị tổng tiền thực tế
    var user = $scope.info_user[0].tenDangNhap;

    // Gửi yêu cầu POST đến backend
    $http
      .get("/rest/voucher?voucher=" + voucherCode + "&total=" + total + "&user=" + user)
      .then(function (response) {
        // Xử lý dữ liệu từ phản hồi
        var data = response.data;
        if (data.isValid) {
          if (data.isActive) {
            if (data.isUse) {
              if (data.isTrue) {
                // Mã giảm giá hợp lệ và đủ điều kiện
                $scope.voucher.dateEnd = data.dateEnd;
                $scope.voucher.discount = data.discount;
                $scope.subpayment = $scope.subpayment - data.discount;

                $('input[name="voucher"]').attr('readonly', true);

                $scope.discount = formatPrice(data.discount);
                $scope.payment = formatPrice($scope.subpayment);
              } else {
                // Mã giảm giá không đủ điều kiện// Hiển thị thông báo thành công
                iziToast.info({
                  title: 'Thông báo',
                  message: 'Mã giảm giá không đủ điều kiện.',
                  position: 'topRight'
                });
              }
            } else {
              // Tài khoản đã sử dụng mã giảm giá
              // Hiển thị thông báo thành công
              iziToast.info({
                title: 'Thông báo',
                message: 'Tài khoản đã sử dụng mã giảm giá.',
                position: 'topRight'
              });
              console.log("Tài khoản đã sử dụng mã giảm giá.");
            }
          } else {
            // Mã giảm giá đã hết hạn hoặc không hoạt động
            // Hiển thị thông báo thành công
            iziToast.info({
              title: 'Thông báo',
              message: 'Mã giảm giá đã hết hạn hoặc không hoạt động.',
              position: 'topRight'
            });
            console.log("Mã giảm giá đã hết hạn hoặc không hoạt động.");
          }
        } else {
          // Mã giảm giá không hợp lệ
          // Hiển thị thông báo thành công
          iziToast.info({
            title: 'Thông báo',
            message: 'Mã giảm giá không hợp lệ',
            position: 'topRight'
          });
          console.log("Mã giảm giá không hợp lệ.");
        }
        if ($scope.subpayment < 0) {
          // Nếu tổng thanh toán nhỏ hơn 0 sau khi áp dụng giảm giá, đặt lại tổng thanh toán thành 0
          $scope.subpayment = 0;

          // Hiển thị thông báo lỗi
          iziToast.error({
            title: 'Lỗi',
            message: 'Số tiền giảm lớn hơn tổng thanh toán.',
            position: 'topRight'
          });
        } else {
          $('input[name="voucher"]').attr('readonly', true);

          $scope.discount = formatPrice(data.discount);
          $scope.payment = formatPrice($scope.subpayment);
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

  $scope.checkLogin = function () {
    var account = localStorage.getItem("account") || null;
    console.log(2);
    if (account === null) {
      location.href = "/shop/login";
    } else {
      location.href = "/shop/auth/index";
    }
  }

  // đăng xuất
  $scope.logout = function () {
    $scope.addToCart();
    localStorage.removeItem("account");
    location.href = "/shop/home";
  }

});
