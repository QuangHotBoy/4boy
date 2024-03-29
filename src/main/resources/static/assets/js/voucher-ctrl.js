var app = angular.module('voucherApp', []);
app.controller("voucher-ctrl", function($scope, $http){
    $scope.vouchers = {};
    $scope.form ={};

    $scope.initialize = function(){
        //load voucher
        $http.get("/rest/vouchers").then(resp =>{
            $scope.vouchers = resp.data;
            $scope.vouchers.forEach(voucher =>{
                voucher.createDate = new Date(voucher.createDate)
            })
        });
    }

    //khoi dau
    $scope.initialize();

    //xoa form
    $scope.reset = function () {
        $scope.form = {}
    }

    //hienthi len form
    $scope.edit = function(id) {
        $http.get(`/rest/vouchers/${id}`) // Sử dụng id để xác định sản phẩm cần lấy
            .then(resp => {
                $scope.vouchers = resp.data; // Gán dữ liệu từ resp.data vào vouchers
                // Gán dữ liệu từ resp.data vào form
            })
            .catch(error => {
                console.log("Error", error);
                alert("Lỗi lấy dữ liệu mã giảm giá");
            });
    };

    //them mgg moi
    $scope.create = function() {
        var voucher = angular.copy($scope.form);
        
        // Get the current date
        var currentDate = new Date();
        
        // Set start date to the current date
        voucher.ngayBatDau = currentDate.toISOString(); // Convert date to ISO string format
        
        $http.post('/rest/vouchers', voucher).then(resp => {
            if (!$scope.vouchers) {
                $scope.vouchers = []; // Initialize vouchers array if it doesn't exist
            }
            // Prepend the new data to the vouchers array
            $scope.vouchers.unshift(resp.data);
            $scope.form = {}; // Clear form data
            alert("Thêm mới sản phẩm thành công!");
            // Load data again if needed
            loadData();
        }).catch(error => {
            alert("Lỗi thêm mới sản phẩm!");
            console.log("Error", error);
        });
    };
    
    

    //cap nhat mgg
    $scope.update = function () {
        var voucher = angular.copy($scope.form); // Tạo một bản sao của đối tượng form để tránh ảnh hưởng đến dữ liệu gốc
        $http.put(`/rest/productsType/${voucher.id}`, voucher) // Gửi yêu cầu PUT để cập nhật dữ liệu sản phẩm
            .then(resp => {
                var index = $scope.vouchers.findIndex(p => p.id === voucher.id);
                if (index !== -1) { // Kiểm tra nếu index hợp lệ
                    // Gán dữ liệu mới vào đối tượng tại vị trí index thay vì gán lại voucher vào vouchers[index]
                    $scope.vouchers[index].tenLoai = voucher.tenLoai;
                    $scope.vouchers[index].moTa = voucher.moTa;
                    alert("Cập nhật sản phẩm thành công!");
                } else {
                    alert("Không tìm thấy sản phẩm cần cập nhật trong danh sách!");
                }
            })
            .catch(error => {
                console.log("Error", error);
                alert("Lỗi cập nhật sản phẩm!");
            });
    };

    //xoa mgg
    $scope.delete = function(voucher) {
        if (confirm("Bạn muốn xóa sản phẩm này?")) {
            $http.delete(`/rest/vouchers/${voucher.id}`).then(resp => {
                var index = $scope.vouchers.findIndex(p => p.id == voucher.id);
                $scope.vouchers.splice(index, 1); // Sửa từ $scope.voucher thành $scope.vouchers
                $scope.reset();
                alert("Xóa sản phẩm thành công!");
            }).catch(error => {
                alert("Lỗi xóa sản phẩm!");
                console.log("Error", error);
            })
        }
    }

      // Search vouchers
      $scope.search = function() {
        // Filter vouchers based on search term
        if ($scope.searchTerm) {
            $scope.filteredVouchers = $scope.vouchers.filter(function(voucher) {
                return voucher.name.toLowerCase().includes($scope.searchTerm.toLowerCase());
            });
        } else {
            $scope.filteredVouchers = angular.copy($scope.vouchers);
        }
    };
    
    $scope.pager = {
		page: 0,
		size: 5,
		get vouchers(){
			if(this.page < 0){
				this.last();
			}
			if(this.page >= this.count){
				this.first();
			}
			var start = this.page*this.size;
			return $scope.vouchers.slice(start, start + this.size)
		},
		get count(){
			return Math.ceil(1.0 * $scope.vouchers.length / this.size);
		},
		first(){
			this.page = 0;
		},
		last(){
			this.page = this.count - 1;
		},
		next(){
			this.page++;
		},
		prev(){
			this.page--;
		}
	}

}

)