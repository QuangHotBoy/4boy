var app = angular.module('voucherApp', []);
app.controller("voucher-ctrl", function($scope, $http){
    $scope.vouchers = [];
    $scope.form ={};
    var currentDate = new Date();
    var dateString = currentDate.toLocaleDateString();
    console.log(dateString); // In ra ngày hiện tại dưới dạng chuỗi
    
    $scope.initialize = function(){
        //load voucher
        $http.get("/rest/vouchers").then(resp =>{
            $scope.vouchers = resp.data;
            $scope.vouchers.forEach(voucher =>{
                voucher.createDate = new Date(voucher.createDate)
                $scope.currentDate = new Date();

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
    //hàm cập nhật
    $scope.update = function () {
        var voucher = angular.copy($scope.form);
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