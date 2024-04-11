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
			return total + parseInt(product.quantity);
		}, 0);

		// Hiển thị số lượng sản phẩm lên website
		$("#cart-count").text(cartCount);
	}
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

	$(".add-to-favorite").click(function (){
		var account = JSON.parse(localStorage.getItem("account")) || null;

		if (account === null) {
			iziToast.warning({
				title: 'Thông báo',
				message: 'Vui lòng đăng nhập vào tài khoản.',
				position: 'topRight'
			});
		} else {
			var isbn = $(this).data("isbn");

			console.log(isbn);
		}
	})

	function addToCart(productId) {
		var carts = JSON.parse(localStorage.getItem("cart")) || [];
		var found = false;

		// Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
		$.each(carts, function (index, item) {
			if (item.user === productId.user && parseInt(item.id) === parseInt(productId.id)) {
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
			return total + parseInt(product.quantity);
		}, 0);

		// Hiển thị số lượng sản phẩm lên website
		$("#cart-count").text(cartCount);
	}

});

var app = angular.module("myApp", []);

app.controller("HomeCtrl", function ($scope, $http, $window) {

	var user = JSON.parse(localStorage.getItem("account")) || null;

	var user_id = user[0].tenDangNhap;

	// $scope.cart = function () {
	// 	$http.get("/rest/cart/" + user_id).then(function (resp) {

	// 		var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []; // Lấy giỏ hàng từ localStorage, nếu không có thì tạo một mảng mới

	// 		var data = resp.data;

	// 		// Lặp qua các phần tử trong resp.data và chuyển đổi thành đối tượng
	// 		for (var key in data) {
	// 			if (data.hasOwnProperty(key)) {
	// 				var convertedData = arrayToObject(data[key]);
	// 				cart.push(convertedData); // Thêm đối tượng vào mảng giỏ hàng
	// 			}
	// 		}

	// 		localStorage.setItem("cart", JSON.stringify(cart)); // Lưu giỏ hàng vào localStorage
	// 	})
	// }

	// $scope.cart();

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
	$scope.isUserLoggedIn = function() {
        var account = localStorage.getItem("account");
        return !!account; // Trả về true nếu có giá trị trong localStorage.getItem("account")
    };
 
	// đăng xuất
	$scope.logout = function () {
		$scope.addToCart();
		localStorage.removeItem("account");
		location.href = "/shop/home";
	}

	//lay ra thong tin sau khi dang nhap
	$scope.info_user = JSON.parse(localStorage.getItem("account")) || null;

	if ($scope.info_user !== null) {
		//  dịnh dạng ngày
		$scope.birthday = new Date($scope.info_user[0].ngaySinh);

		//infomation.form
		$scope.form = JSON.parse(localStorage.getItem("account")) || null;

		$scope.get_invoice = function () {
			var tenDangNhap = $scope.info_user[0].tenDangNhap;
			$http.get("/rest/auth/invoice/" + tenDangNhap).then(resp => {
				$scope.invoices = [];
				$scope.invoices = resp.data;
			}).catch(error => {
				console.log("Error", error)
			})
		};

		$scope.get_invoice();

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

 

})
	