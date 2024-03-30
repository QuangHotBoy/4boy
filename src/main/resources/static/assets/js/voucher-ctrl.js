var app = angular.module('voucherApp', []);
app.controller("voucher-ctrl", function($scope, $http){
    $scope.vouchers = [];
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
        $scope.form = {};
    }

   $scope.edit = function(id) {
    // Send a GET request to the API to fetch data for the specified ID
    $http.get('/rest/vouchers/' + id)
        .then(function(response) {
            // Copy the fetched data to $scope.form
            $scope.form = response.data;
            // Convert the ISO date string to a JavaScript Date object
            $scope.form.ngayBatDau = new Date($scope.form.ngayBatDau);
            $scope.form.ngayKetThuc = new Date($scope.form.ngayKetThuc);
            // Show the modal
            $('#exampleModal').modal('show');
            console.log(id);
        })
        .catch(function(error) {
            // Handle errors
            console.error('Error fetching data for editing:', error);
            // Optionally, you can initialize $scope.form here to avoid undefined errors
            $scope.form = {};
        });
};
    //them mgg moi
    $scope.create = function() {
        // Kiểm tra xem đã tồn tại mã giảm giá có cùng ID chưa
        var duplicateId = $scope.vouchers.some(function(voucher) {
            return voucher.id === $scope.form.id;
        });
        if (!$scope.form.id || !$scope.form.tenMa || !$scope.form.soTienGiam || !$scope.form.soLuong || !$scope.form.ngayBatDau || !$scope.form.ngayKetThuc || !$scope.form.thongTin) {
            alert("Vui lòng điền đầy đủ thông tin vào các trường bắt buộc!");
            return;
        }
        // Nếu mã giảm giá có ID trùng lặp, hiển thị thông báo lỗi và không thực hiện thêm mới
        if (duplicateId) {
            alert("Mã giảm giá đã tồn tại. Vui lòng chọn mã khác.");
            return;
        }
    
        // Nếu không có mã giảm giá nào có ID trùng lặp, tiếp tục thêm mới
        var voucher = angular.copy($scope.form);
        
        // Get the current date and time
        var currentDate = new Date();
        
        // Set start date to the current date and time
        voucher.ngayBatDau = $scope.getCurrentDateTime(currentDate); // Lấy giờ của ngày bắt đầu
        
        // Lấy giờ của ngày kết thúc
        var endDate = new Date(); // Điều chỉnh đối tượng ngày thành ngày kết thúc hoặc sử dụng ngày kết thúc từ biến của bạn
        voucher.ngayKetThuc = $scope.getCurrentDateTime(endDate); // Lấy giờ của ngày kết thúc
    
        $http.post('/rest/vouchers', voucher)
            .then(resp => {
                if (!$scope.vouchers) {
                    $scope.vouchers = []; // Initialize vouchers array if it doesn't exist
                }
                // Prepend the new data to the vouchers array
                $scope.vouchers.unshift(resp.data);
                $scope.form = {}; // Clear form data
                alert("Thêm mới sản phẩm thành công!");
                // Optionally, load data again if needed
                // loadData();
            })
            .catch(error => {
                alert("Lỗi thêm mới sản phẩm!");
                console.log("Error", error);
            });
    };
    
    
    
    $scope.getCurrentDateTime = function() {
        // Lấy ngày và giờ hiện tại
        var currentDate = new Date();
        
        // Chuyển đổi sang múi giờ của Việt Nam (GMT+7)
        var vietnamTime = new Date(currentDate.getTime() + (7 * 60 * 60 * 1000)); // Thêm 7 giờ vào ngày hiện tại
        
        // Format theo định dạng "YYYY-MM-DDTHH:mm"
        var formattedDateTime = vietnamTime.toISOString().slice(0, 16);
        
        return formattedDateTime;
    };

    
    // Khởi tạo ngày bắt đầu với ngày và giờ hiện tại
    $scope.form.ngayBatDau = $scope.getCurrentDateTime();
    
    //cap nhat mgg
    //hàm cập nhật
   $scope.update = function() {
    var voucher = angular.copy($scope.form);


    // Lấy ngày và giờ hiện tại
    var currentDate = new Date();

    // Format ngày và giờ hiện tại theo định dạng "YYYY-MM-DDTHH:mm"
    voucher.ngayBatDau = $scope.getCurrentDateTime(currentDate);

    $http.put('/rest/vouchers/' + voucher.id, voucher)
        .then(resp => {
            // Initialize $scope.vouchers if not already initialized
            if (!$scope.vouchers) {
                $scope.vouchers = [];
            }

            // Check if the voucher exists in $scope.vouchers before updating
            var index = $scope.vouchers.findIndex(i => i.id === voucher.id);
            if (index !== -1) {
                $scope.vouchers[index] = angular.copy(voucher);
            }

            $scope.reset(); // Reset form
            alert("Cập nhật sản phẩm thành công!");
            // Optionally, reload data
            // loadData();
        })
        .catch(error => {
            alert("Lỗi cập nhật sản phẩm!");
            console.log("Error", error);
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

   // Search function


    
    
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
    $scope.checkDate = function() {
        if ($scope.form.ngayBatDau && $scope.form.ngayKetThuc) {
            var startDate = new Date($scope.form.ngayBatDau);
            var endDate = new Date($scope.form.ngayKetThuc);
            if (startDate >= endDate) {
                $scope.startDateError = true;
            } else {
                $scope.startDateError = false;
            }
        } else {
            // Đảm bảo rằng thông báo lỗi không hiển thị nếu một trong hai trường chưa được nhập
            $scope.startDateError = false;
        }
    };
    
    
})