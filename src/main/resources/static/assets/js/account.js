var app = angular.module('AccountApp', []);
app.controller("AccountCtrl", function ($scope, $http, $timeout) {
	$scope.manager = [];
	$scope.staff = [];
	$scope.member = [];
	$scope.form = {};

	$scope.getMana = function () {
		$http.get("/qtk/getmana").then(resp => {
			$scope.manager = resp.data;
			// Khởi tạo DataTable khi dữ liệu đã được render
			$timeout(function () {
				$('#table1').DataTable({
					"language": {
						"url": "/assets/json/vietnam.json"
					}
				});
			});
		});
	}
	$scope.getStaff = function () {
		$http.get("/qtk/getstaff").then(resp => {
			$scope.staff = resp.data;
			// Khởi tạo DataTable khi dữ liệu đã được render
			$timeout(function () {
				$('#table2').DataTable({
					"language": {
						"url": "/assets/json/vietnam.json"
					}
				});
			});
		});
	}



	$scope.getMember = function () {
		$http.get("/qtk/getmember").then(resp => {
			$scope.member = resp.data;
			// Khởi tạo DataTable khi dữ liệu đã được render
			$timeout(function () {
				$('#table3').DataTable({
					"language": {
						"url": "/assets/json/vietnam.json"
					}
				});
			});
		});
	}

	$scope.editmember = function (tenDangNhap) {
		$http.get("/rest/account/editmember/" + tenDangNhap).then(resp => {
			$scope.form = resp.data;
			console.log($scope.form)
			$scope.form.ngaySinh = new Date($scope.form.ngaySinh);
			// Hiển thị modal chỉnh sửa
			$('#editmember').modal('show');
		}).catch(error => {
			console.log("Error", error)
		})
	}

	$scope.editstaff = function (tenDangNhap) {
		$http.get("/rest/account/editstaff/" + tenDangNhap).then(resp => {
			$scope.form = resp.data;
			// Sao chép dữ liệu từ phản hồi vào biến form để điền vào form chỉnh sửa
			$scope.form = angular.copy(resp.data);
			$scope.form.ngaySinh = new Date($scope.form.ngaySinh);
			// Hiển thị modal chỉnh sửa
			$('#editstaff').modal('show');
		}).catch(error => {
			console.log("Error", error)
		})
	}

	$scope.update_member = function () {
		var item = angular.copy($scope.form)
		console.log(item.tenDangNhap)

		var hoten = item.hoTen;

		var sdt = item.sdt;

		if (hoten.trim() == "" || sdt.trim() == "") {
			//    thông báo
			iziToast.error({
				title: 'Thông báo',
				message: 'Không để trống thông tin !',
				position: 'topRight'
			});
		} else {
			if (!kiemTraNgayHopLe(item.ngaySinh)) {
				iziToast.error({
					title: 'Thông báo',
					message: 'Ngày sinh không thể là ngày hiện tại và người dùng cần phải đủ 18 tuổi !',
					position: 'topRight'
				});
			} else {
				$http.put("/rest/account/updatemember/" + item.tenDangNhap, item).then(resp => {
					var index = $scope.member.findIndex(i => i.tenDangNhap = item.tenDangNhap);
					if (index != -1) {
						$scope.member[index] = angular.copy(item);
						// thông báo
						iziToast.success({
							title: 'Thông báo',
							message: 'Cập nhập thông tin tài khoản thành công !',
							position: 'topRight'
						});
						// Chờ 3 giây trước khi thực hiện reload
						setTimeout(function () {
							location.reload();
						}, 1500)
					}
				}).catch(error => {
					console.log("Error", error);
				})
			}
		}
	}

	$scope.update_staff = function () {
		var item = angular.copy($scope.form)
		console.log(item.tenDangNhap)
		var hoten = item.hoTen;

		var sdt = item.sdt;

		if (hoten.trim() == "" || sdt.trim() == "") {
			//    thông báo
			iziToast.error({
				title: 'Thông báo',
				message: 'Không để trống thông tin !',
				position: 'topRight'
			});
		} else {
			if (!kiemTraNgayHopLe($scope.form.ngaySinh)) {
				iziToast.error({
					title: 'Thông báo',
					message: 'Ngày sinh không thể là ngày hiện tại và người dùng cần phải đủ 18 tuổi !',
					position: 'topRight'
				});
			} else {
				$http.put("/rest/account/updatestaff/" + item.tenDangNhap, item).then(resp => {
					var index = $scope.member.findIndex(i => i.tenDangNhap = item.tenDangNhap);
					if (index != -1) {
						$scope.member[index] = angular.copy(item);
						// thông báo
						iziToast.success({
							title: 'Thông báo',
							message: 'Cập nhập thông tin tài khoản thành công !',
							position: 'topRight'
						});
						// Chờ 3 giây trước khi thực hiện reload
						setTimeout(function () {
							location.reload();
						}, 1500)
					}
				}).catch(error => {
					console.log("Error", error);
				})

			}
		}
	}

	$scope.add_member = function () {
		var taiKhoan = angular.copy($scope.form);
		var check = true;

		for (var i = 0; i < $scope.member.length; i++) {
			var a = $scope.member[i];
			if (a.taiKhoan_quyen.tenDangNhap == taiKhoan.tenDangNhap) {
				check = false;
				break;
			}
		}
		if (taiKhoan.tenDangNhap == null || taiKhoan.matKhau == null || taiKhoan.hoTen == null || taiKhoan.sdt == null || taiKhoan.email == null || taiKhoan.ngaySinh == null) {
			//    thông báo
			iziToast.error({
				title: 'Thông báo',
				message: 'Không để trống !',
				position: 'topRight'
			});
		} else {
			if (!check) {
				iziToast.error({
					title: 'Thông báo',
					message: 'Tên đăng nhập đã tồn tại !',
					position: 'topRight'
				});
			} else {
				if (!kiemTraMatKhau(taiKhoan.matKhau)) {
					iziToast.error({
						title: 'Thông báo',
						message: 'Mật khẩu phải 8 ký tự ít nhất một chữa Hoa, số, kí tự đặt biệt !',
						position: 'topRight'
					});
				} else {
					if (!kiemTraNgayHopLe(taiKhoan.ngaySinh)) {
						iziToast.error({
							title: 'Thông báo',
							message: 'Ngày sinh không thể là ngày hiện tại và người dùng cần phải đủ 18 tuổi !',
							position: 'topRight'
						});
					} else {
						$http.post("/rest/account/addmember", taiKhoan).then(function (resp) {
							$scope.member.push(taiKhoan);
							// thông báo
							iziToast.success({
								title: 'Thông báo',
								message: 'Thêm tài khoản thành công !',
								position: 'topRight'
							});
							// Chờ 1.5 giây trước khi thực hiện reload
							setTimeout(function () {
								location.reload();
							}, 1500)
						}).catch(error => {
							console.log("Error", error);
						})
					}
				}
			}
		}
	}

	$scope.add_staff = function () {
		var taiKhoan = angular.copy($scope.form);
		var check = true

		for (var i = 0; i < $scope.staff.length; i++) {
			var a = $scope.staff[i];
			if (a.taiKhoan_quyen.tenDangNhap == taiKhoan.tenDangNhap) {
				check = false;
				break;
			}
		}
		if (taiKhoan.tenDangNhap == null || taiKhoan.hoTen == null || taiKhoan.sdt == null || taiKhoan.email == null || taiKhoan.ngaySinh == null) {
			//    thông báo
			iziToast.error({
				title: 'Thông báo',
				message: 'Không để trống thông tin !',
				position: 'topRight'
			});
		} else {
			if (!check) {
				iziToast.error({
					title: 'Thông báo',
					message: 'Tên đăng nhập đã tồn tại !',
					position: 'topRight'
				});
			} else {
				if (!kiemTraMatKhau(taiKhoan.matKhau)) {
					iziToast.error({
						title: 'Thông báo',
						message: 'Mật khẩu phải 8 ký tự ít nhất một chữa Hoa, số, kí tự đặt biệt !',
						position: 'topRight'
					});
				} else {
					if (!kiemTraNgayHopLe(taiKhoan.ngaySinh)) {
						iziToast.error({
							title: 'Thông báo',
							message: 'Ngày sinh không thể là ngày hiện tại và người dùng cần phải đủ 18 tuổi !',
							position: 'topRight'
						});
					} else {
						$http.post("/rest/account/addstaff", taiKhoan).then(function (resp) {
							$scope.member.push(taiKhoan);
							// thông báo
							iziToast.success({
								title: 'Thông báo',
								message: 'Thêm tài khoản thành công !',
								position: 'topRight'
							});
							// Chờ 3 giây trước khi thực hiện reload
							setTimeout(function () {
								location.reload();
							}, 1500)
						}).catch(error => {
							console.log("Error", error);
						})
					}
				}
			}
		}
	}


	// kiểm tra ngày sinh
	function kiemTraNgayHopLe(ngaySinh) {
		// Lấy ngày hiện tại
		var ngayHienTai = new Date();
		var namHienTai = ngayHienTai.getFullYear();
		var thangHienTai = ngayHienTai.getMonth() + 1;
		var ngayHienTai = ngayHienTai.getDate();

		// Chuyển đổi ngày sinh từ chuỗi ISO 8601 thành đối tượng Date
		var ngaySinhDate = new Date(ngaySinh);

		// Lấy thông tin ngày, tháng, năm từ ngày sinh
		var ngay = ngaySinhDate.getDate();
		var thang = ngaySinhDate.getMonth() + 1;
		var nam = ngaySinhDate.getFullYear();

		// Kiểm tra xem ngày sinh có phải là ngày hiện tại không
		if (nam == namHienTai && thang == thangHienTai && ngay == ngayHienTai) {
			return false; // Ngày sinh là ngày hiện tại
		}

		// Kiểm tra xem ngày sinh có lớn hơn ngày hiện tại không
		if (nam > namHienTai || (nam == namHienTai && thang > thangHienTai) || (nam == namHienTai && thang == thangHienTai && ngay >= ngayHienTai)) {
			return false; // Ngày sinh là tương lai
		}

		// Kiểm tra xem ngày sinh có đủ 18 tuổi không
		var tuoi18 = new Date(namHienTai - 18, thangHienTai - 1, ngayHienTai);
		if (ngaySinhDate > tuoi18) {
			return false; // Người dùng không đủ 18 tuổi
		}

		return true; // Ngày hợp lệ
	}

	// Hàm kiểm tra mật khẩu
	function kiemTraMatKhau(matKhau) {
		// Kiểm tra độ dài của mật khẩu
		if (matKhau.length < 8) {
			return false;
		}

		// Kiểm tra xem mật khẩu có chứa ít nhất một ký tự số không
		if (!/\d/.test(matKhau)) {
			return false;
		}

		// Kiểm tra xem mật khẩu có chứa ít nhất một ký tự chữ cái viết thường không
		if (!/[a-z]/.test(matKhau)) {
			return false;
		}

		// Kiểm tra xem mật khẩu có chứa ít nhất một ký tự chữ cái viết hoa không
		if (!/[A-Z]/.test(matKhau)) {
			return false;
		}

		// Kiểm tra xem mật khẩu có chứa ít nhất một ký tự đặc biệt không
		if (!/[^a-zA-Z0-9]/.test(matKhau)) {
			return false;
		}

		// Nếu mật khẩu thoả mãn tất cả các điều kiện, trả về true
		return true;
	}


	$scope.checkrole = function () {
		var account = JSON.parse(localStorage.getItem("account")) || [];
		var tenDangNhap = account[0].tenDangNhap;
		$http.get("/rest/findrole/" + tenDangNhap).then(resp => {
			$scope.role = [];
			$scope.role = resp.data;
			var quyen = $scope.role.quyen.id
			console.log(quyen);
			if (quyen === "CUST") {
				location.href = "/shop/home";
			}
		})
	}

	var aaa = JSON.parse(localStorage.getItem("account")) || null;
	if (aaa != null) {
		$scope.checkrole();
		$scope.getStaff();
		$scope.getMana();
		$scope.getMember();
	}
})