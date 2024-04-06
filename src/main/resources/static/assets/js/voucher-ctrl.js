var app = angular.module('voucherApp', []);
app.controller("voucher-ctrl", function($scope, $http){
    $scope.vouchers = [];
    $scope.form ={};

    $scope.initialize = function(){
        // Load voucher
        $http.get("/rest/vouchers").then(resp => {
            $scope.vouchers = resp.data;
            $scope.vouchers.forEach(voucher => {
                voucher.createDate = new Date(voucher.createDate);         
            });
    
            // Sắp xếp giảm dần mảng vouchers theo trường createDate
            $scope.vouchers.sort((a, b) => new Date(b.ngayBatDau) - new Date(a.ngayBatDau));
        });
    }
    $scope.form = {
        daSuDung: '0'
    };
    
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
        if ($scope.isCreating) {
            // Nếu đang ở trang thêm mới, gán ngày bắt đầu là giờ hiện tại
            $scope.form.ngayBatDau = $scope.getCurrentDateTime();
        }
        // Nếu không có mã giảm giá nào có ID trùng lặp, tiếp tục thêm mới
        var voucher = angular.copy($scope.form);
        
        // Lấy giờ của ngày kết thúc
        // var endDate = new Date(); // Điều chỉnh đối tượng ngày thành ngày kết thúc hoặc sử dụng ngày kết thúc từ biến của bạn
        // voucher.ngayKetThuc = $scope.getCurrentDateTime(endDate); // Lấy giờ của ngày kết thúc
    
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
    
    $scope.update = function() {
        // Lưu trữ id ban đầu của voucher
        var voucher = angular.copy($scope.form);
        
        // Chuyển đổi ID sang chuỗi
        voucher.id = String(voucher.id);
    
        $http.put('/rest/vouchers/' + voucher.id, voucher)
            .then(function(resp) {
                // Tìm và cập nhật thông tin mã giảm giá trong $scope.vouchers
                var index = $scope.vouchers.findIndex(function(item) {
                    // Chuyển đổi item.id sang chuỗi để so sánh nếu cần thiết
                    return String(item.id) === voucher.id;
                });
    
                if (index !== -1) {
                    // Cập nhật thông tin mã giảm giá trong $scope.vouchers
                    $scope.vouchers[index] = angular.copy(resp.data); // Giả sử resp.data chứa dữ liệu mã giảm giá đã được cập nhật
                }
    
                $scope.reset(); // Đặt lại form
                alert("Cập nhật sản phẩm thành công!");
                // Optional, load data again if needed
                // loadData();
            })
            .catch(function(error) {
                alert("Lỗi cập nhật sản phẩm: " + error.statusText);
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
   $scope.search = function() {
    // Kiểm tra xem đã nhập từ khóa tìm kiếm hay chưa
    if (!$scope.searchTerm) {
        // Nếu không có từ khóa tìm kiếm, hiển thị lại toàn bộ danh sách mã giảm giá
        $scope.initialize(); // Giả sử initialize() là hàm để load lại danh sách mã giảm giá
        return;
    }

    // Thực hiện tìm kiếm trong danh sách mã giảm giá
    $scope.vouchers = $scope.vouchers.filter(function(voucher) {
        // Chuyển đổi tất cả thông tin của mã giảm giá và từ khóa tìm kiếm về chữ thường để thực hiện tìm kiếm không phân biệt chữ hoa chữ thường
        for (var key in voucher) {
            if (typeof voucher[key] === 'string' && voucher[key].toLowerCase().includes($scope.searchTerm.toLowerCase())) {
                return true; // Nếu tìm thấy từ khóa trong chuỗi, trả về true
            }
            if (!isNaN(parseFloat(voucher[key])) && isFinite(voucher[key])) {
                if (voucher[key].toString().toLowerCase().includes($scope.searchTerm.toLowerCase())) {
                    return true; // Nếu tìm thấy từ khóa trong số, trả về true
                }
            }
        }
        return false;
    });
};



   $scope.pager = {
    page: 0,
    size: 5,
    get vouchers() {
        if (this.page < 0) {
            this.last();
        }
        if (this.page >= this.count) {
            this.first();
        }
        var start = this.page * this.size;
        return $scope.vouchers.slice(start, start + this.size)
    },
    get count() {
        return Math.ceil(1.0 * $scope.vouchers.length / this.size);
    },
    first() {
        this.page = 0;
    },
    last() {
        this.page = this.count - 1;
    },
    next() {
        this.page++;
    },
    prev() {
        this.page--;
    },
    setPage(pageNumber) {
        this.page = pageNumber;
    }
}

$scope.getPageNumbers = function() {
    var totalPages = $scope.pager.count;
    var pageNumbers = [];
    for (var i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
    }
    return pageNumbers;
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