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
			iziToast.warning({
				title: 'Thông báo',
				message: 'Không để trống thông tin !',
				position: 'topRight'
			});
		} else {
			$http.put("/rest/account/updatemember/" + item.tenDangNhap, item).then(resp => {
				var index = $scope.member.findIndex(i => i.tenDangNhap = item.tenDangNhap);
				if (index != -1) {
					$scope.member[index] = angular.copy(item);
					// thông báo
					iziToast.info({
						title: 'Thông báo',
						message: 'Cập nhập thông tin tài khoản thành công !',
						position: 'topRight'
					});
					// Chờ 3 giây trước khi thực hiện reload
					setTimeout(function () {
						location.reload();
					}, 3000)
				}
			}).catch(error => {
				console.log("Error", error);
			})
		}
	}

	$scope.update_staff = function () {
		var item = angular.copy($scope.form)
		console.log(item.tenDangNhap)
		var hoten = item.hoTen;

		var sdt = item.sdt;

		if (hoten.trim() == "" || sdt.trim() == "") {
			//    thông báo
			iziToast.warning({
				title: 'Thông báo',
				message: 'Không để trống thông tin !',
				position: 'topRight'
			});
		} else {
			$http.put("/rest/account/updatestaff/" + item.tenDangNhap, item).then(resp => {
				var index = $scope.member.findIndex(i => i.tenDangNhap = item.tenDangNhap);
				if (index != -1) {
					$scope.member[index] = angular.copy(item);
					// thông báo
					iziToast.info({
						title: 'Thông báo',
						message: 'Cập nhập thông tin tài khoản thành công !',
						position: 'topRight'
					});
					// Chờ 3 giây trước khi thực hiện reload
					setTimeout(function () {
						location.reload();
					}, 3000)
				}
			}).catch(error => {
				console.log("Error", error);
			})

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
		if (taiKhoan.tenDangNhap == null || taiKhoan.hoTen == null || taiKhoan.sdt == null || taiKhoan.email == null || taiKhoan.ngaySinh == null) {
			//    thông báo
			iziToast.warning({
				title: 'Thông báo',
				message: 'Không để trống !',
				position: 'topRight'
			});
		} else {
			if (!check) {
				iziToast.warning({
					title: 'Thông báo',
					message: 'Tên đăng nhập đã tồn tại !',
					position: 'topRight'
				});
			} else {
				$http.post("/rest/account/addmember", taiKhoan).then(function (resp) {
					$scope.member.push(taiKhoan);
					// thông báo
					iziToast.info({
						title: 'Thông báo',
						message: 'Thêm tài khoản thành công !',
						position: 'topRight'
					});
					// Chờ 3 giây trước khi thực hiện reload
					setTimeout(function () {
						location.reload();
					}, 3000)
				}).catch(error => {
					console.log("Error", error);
				})
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
			iziToast.warning({
				title: 'Thông báo',
				message: 'Không để trống thông tin !',
				position: 'topRight'
			});
		} else {
			if (!check) {
				iziToast.warning({
					title: 'Thông báo',
					message: 'Tên đăng nhập đã tồn tại !',
					position: 'topRight'
				});
			} else {
				$http.post("/rest/account/addstaff", taiKhoan).then(function (resp) {
					$scope.member.push(taiKhoan);
					// thông báo
					iziToast.info({
						title: 'Thông báo',
						message: 'Thêm tài khoản thành công !',
						position: 'topRight'
					});
					// Chờ 3 giây trước khi thực hiện reload
					setTimeout(function () {
						location.reload();
					}, 3000)
				}).catch(error => {
					console.log("Error", error);
				})
			}
		}
	}

	$scope.getStaff();
	$scope.getMana();
	$scope.getMember();
})