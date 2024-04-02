var app = angular.module('AccountApp', []);
app.controller("AccountCtrl", function ($scope, $http) { 
	$scope.manager = []; 
	$scope.staff = []; 
	$scope.member = []; 
	$scope.form = {};

	$scope.getMana = function () {  
				$http.get("/qtk/getmana").then(resp => {
					$scope.manager = resp.data;
					console.log($scope.quyenTK); 
				}); 
	} 
	$scope.getStaff =function(){
		$http.get("/qtk/getstaff").then(resp => {
			$scope.staff = resp.data;
			console.log($scope.quyenTK); 
		}); 
	}

	$scope.getMember =function(){
		$http.get("/qtk/getmember").then(resp => {
			$scope.member = resp.data;
			console.log($scope.quyenTK); 
		}); 
	}

	$scope.editmember = function(tenDangNhap){
		$http.get("/rest/account/editmember/"+tenDangNhap).then(resp=>{
			$scope.form = resp.data;
			// Sao chép dữ liệu từ phản hồi vào biến form để điền vào form chỉnh sửa
			$scope.form = angular.copy(resp.data);
			$scope.form.ngaySinh = new Date($scope.form.ngaySinh);
			  // Hiển thị modal chỉnh sửa
			  $('#editmember').modal('show');
		}).catch(error=>{
			console.log("Error",error)
		})
	}

	$scope.editstaff = function(tenDangNhap){
		$http.get("/rest/account/editstaff/"+tenDangNhap).then(resp=>{
			$scope.form = resp.data;
			// Sao chép dữ liệu từ phản hồi vào biến form để điền vào form chỉnh sửa
			$scope.form = angular.copy(resp.data);
			$scope.form.ngaySinh = new Date($scope.form.ngaySinh);
			  // Hiển thị modal chỉnh sửa
			  $('#editstaff').modal('show');
		}).catch(error=>{
			console.log("Error",error)
		})
	}

	$scope.update_member= function(){
		var item = angular.copy($scope.form)
		console.log(item.tenDangNhap)
		$http.put("/rest/account/updatemember/"+ item.tenDangNhap, item).then(resp =>{
			var index =	$scope.member.findIndex(i => i.tenDangNhap = item.tenDangNhap);
			if(index != -1){
				$scope.member[index] = angular.copy(item);
				alert("Cập nhập thành công"); 
				location.reload();
			}
		}).catch(error=>{
			alert("Lỗi cập nhật sách!");
			console.log("Error",error);
		})
	}

	$scope.update_staff= function(){
		var item = angular.copy($scope.form)
		console.log(item.tenDangNhap)
		$http.put("/rest/account/updatestaff/"+ item.tenDangNhap, item).then(resp =>{
			var index =	$scope.member.findIndex(i => i.tenDangNhap = item.tenDangNhap);
			if(index != -1){
				$scope.member[index] = angular.copy(item);
				alert("Cập nhập thành công"); 
				location.reload();
			}
		}).catch(error=>{
			alert("Lỗi cập nhật sách!");
			console.log("Error",error);
		})
	}

	$scope.getStaff();
	$scope.getMana();
	$scope.getMember();
})