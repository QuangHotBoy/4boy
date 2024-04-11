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
    $scope.ascending = {
        id: true,
        tenMa: true,
        soTienGiam: true,
        soLuong: true,
        ngayBatDau: true,
        ngayKetThuc: true,
        thongTin: true
    };
    
    $scope.sortByField = function(fieldName) {
        // Xác định biến cờ và sắp xếp mảng dựa trên trường được chọn
        if ($scope.ascending[fieldName]) {
            // Sắp xếp mảng theo trường tăng dần
            $scope.vouchers.sort((a, b) => {
                // Sử dụng a[fieldName] và b[fieldName] để truy cập giá trị của trường
                if (typeof a[fieldName] === 'string' && typeof b[fieldName] === 'string') {
                    return a[fieldName].localeCompare(b[fieldName]);
                } else {
                    return a[fieldName] - b[fieldName];
                }
            });
        } else {
            // Sắp xếp mảng theo trường giảm dần
            $scope.vouchers.sort((a, b) => {
                // Sử dụng a[fieldName] và b[fieldName] để truy cập giá trị của trường
                if (typeof a[fieldName] === 'string' && typeof b[fieldName] === 'string') {
                    return b[fieldName].localeCompare(a[fieldName]);
                } else {
                    return b[fieldName] - a[fieldName];
                }
            });
        }
        // Đảo ngược giá trị của biến cờ để chuyển đổi hướng sắp xếp
        $scope.ascending[fieldName] = !$scope.ascending[fieldName];
    };
    
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
function validateForm(){
    var id = document.getElementById("id").value;
    var tenMa = document.getElementById("tenMa").value;
    var soTienGiam = document.getElementById("soTienGiam").value;
    var soLuong = document.getElementById("soLuong").value;
    var thongTin = document.getElementById("thongTin").value;
    var dieuKien = document.getElementById("dieuKien").value;
    if (id.trim() == "") {
        iziToast.warning({
            title: 'Thông báo',
            message: 'Vui lòng nhập mã giảm giá.',
            position: 'topRight'
        });
        return false;
    }
    if (isMaGiamGiaTrung(id)) {
        iziToast.warning({
            title: 'Thông báo',
            message: 'Mã giảm giá đã tồn tại!!',
            position: 'topRight'
        });
        return false;
    }
    if (tenMa.trim() == "") {
        iziToast.warning({
            title: 'Thông báo',
            message: 'Vui lòng nhập tên chương trình.',
            position: 'topRight'
        });
        return false;
    }
    if (soTienGiam.trim() == "") {
        iziToast.warning({
            title: 'Thông báo',
            message: 'Vui lòng nhập số tiền giảm.',
            position: 'topRight'
        });
        return false;
    }else if (parseInt(soTienGiam) <= 0) { // Kiểm tra nếu số lượng là không hoặc âm
        iziToast.warning({
            title: 'Thông báo',
            message: 'Số tiền giảm phải lớn hơn 0.',
            position: 'topRight'
        });
        return false;
    }
    if (soLuong.trim() == "") {
        iziToast.warning({
            title: 'Thông báo',
            message: 'Vui lòng nhập số lượng.',
            position: 'topRight'
        });
        return false;
    }else if (parseInt(soLuong) <= 0) { // Kiểm tra nếu số lượng là không hoặc âm
        iziToast.warning({
            title: 'Thông báo',
            message: 'Số lượng phải lớn hơn 0.',
            position: 'topRight'
        });
        return false;
    }
    if (thongTin.trim() == "") {
        iziToast.warning({
            title: 'Thông báo',
            message: 'Vui lòng nhập mô tả.',
            position: 'topRight'
        });
        return false;
    }
    if (dieuKien.trim() == "") {
        iziToast.warning({
            title: 'Thông báo',
            message: 'Vui lòng nhập đơn tối thiểu.',
            position: 'topRight'
        });
        return false;
    }else if (parseInt(dieuKien) <= 0) { // Kiểm tra nếu số lượng là không hoặc âm
        iziToast.warning({
            title: 'Thông báo',
            message: 'Đơn tối thiểu phải lớn hơn 0.',
            position: 'topRight'
        });
        return false;
    }
    if (!$scope.form.ngayKetThuc) {
        alert("Vui lòng chọn ngày kết thúc!");
        return false;
    }
    if (new Date($scope.form.ngayBatDau) >= new Date($scope.form.ngayKetThuc)) {
        alert("Ngày bắt đầu phải trước ngày kết thúc!");
        return false;
    }
    // if ($scope.form.soLuong <= 0 || $scope.form.dieuKien <= 0 || $scope.form.soTienGiam <= 0) {
    //     alert("Số lượng phải là số dương!");
    //     return false;
    // }
    // var regex = /^\d+$/;
    // if (!regex.test($scope.form.soLuong) || !regex.test($scope.form.dieuKien) || !regex.test($scope.form.soTienGiam)) {
    //     alert("Vui lòng nhập số!");
    //     return false;
    // }
    return true;
}
function isMaGiamGiaTrung(id) {
    // Lặp qua danh sách các loại mã giảm giá đã tải từ server
    for (var i = 0; i < $scope.vouchers.length; i++) {
        if ($scope.vouchers[i].id === id) {
            return true; // Nếu trùng, trả về true
        }
    }
    return false; // Nếu không trùng, trả về false
}



    //them mgg moi
    $scope.create = function() {
        // Kiểm tra xem đã tồn tại mã giảm giá có cùng ID chưa
        if (!validateForm()) {
            // Nếu form không hợp lệ, không tiến hành thêm mới
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
               
                $scope.form = {}; // Clear form data
                $scope.vouchers.push(resp.data);
                $scope.reset();
                iziToast.info({
                    title: 'Thông báo',
                    message: 'Thêm mới mã giảm giá thành công!',
                    position: 'topRight'
                });
            })
            .catch(function(error) {
                // Hiển thị thông báo lỗi bằng thư viện iziToast
                iziToast.error({
                    title: 'Lỗi',
                    message: 'Cập nhật sản phẩm không thành công: ' + error.statusText,
                    position: 'topRight'
                });
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
    
        // Gọi API để cập nhật mã giảm giá
        $http.put('/rest/vouchers/' + voucher.id, voucher)
            .then(function(resp) {
                // Tìm và cập nhật thông tin mã giảm giá trong $scope.vouchers
                var index = $scope.vouchers.findIndex(function(item) {
                    // So sánh ID ban đầu với ID trong danh sách
                    return item.id === voucher.id;
                });
    
                if (index !== -1) {
                    // Cập nhật thông tin mã giảm giá trong $scope.vouchers
                    $scope.vouchers[index] = angular.copy(resp.data);
                }
    
                // Đặt lại form và hiển thị thông báo cập nhật thành công
                $scope.reset();
                iziToast.info({
                    title: 'Thông báo',
                    message: 'Cập nhật mã giảm giá thành công!',
                    position: 'topRight'
                });
                // Chờ 3 giây trước khi thực hiện reload
                setTimeout(function () {
                    location.reload();
                }, 1000);
            })
            .catch(function(error) {
                // Hiển thị thông báo lỗi bằng thư viện iziToast
                iziToast.error({
                    title: 'Lỗi',
                    message: 'Cập nhật sản phẩm không thành công: ' + error.statusText,
                    position: 'topRight'
                });
                console.log(voucher.id);
                console.log("Error", error);
            }); 
    };
    
    
    //xoa mgg
    $scope.delete = function(voucher) {
        if (confirm("Bạn muốn xóa sản phẩm này?")) {
            $http.delete(`/rest/vouchers/${voucher.id}`).then(resp => {
                var index = $scope.vouchers.findIndex(p => p.id == voucher.id);
                $scope.vouchers.splice(index, 1);
                $scope.reset();
                
                // Hiển thị thông báo thành công bằng thư viện iziToast
                iziToast.success({
                    title: 'Thành công',
                    message: 'Xóa sản phẩm thành công!',
                    position: 'topRight'
                });                
            }).catch(function(error) {
                // Hiển thị thông báo lỗi bằng thư viện iziToast
                iziToast.error({
                    title: 'Lỗi',
                    message: 'Cập nhật sản phẩm không thành công: ' + error.statusText,
                    position: 'topRight'
                });
                console.log("Error", error);
            }); 
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
$scope.searchByTenMa = function() {
    // Kiểm tra xem đã nhập từ khóa tìm kiếm hay chưa
    if (!$scope.searchTenMaTerm) {
        // Nếu không có từ khóa tìm kiếm, hiển thị lại toàn bộ danh sách mã giảm giá
        $scope.initialize(); // Giả sử initialize() là hàm để load lại danh sách mã giảm giá
        return;
    }

    // Thực hiện tìm kiếm trong danh sách mã giảm giá theo trường tenMa
    $scope.vouchers = $scope.vouchers.filter(function(voucher) {
        // Chuyển đổi tên chương trình thành chữ thường và tìm kiếm từ khóa tương ứng
        return voucher.tenMa.toLowerCase().includes($scope.searchTenMaTerm.toLowerCase());
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
$scope.pager1 = {
    page: 0,
    size: 5,
    get vouchers() {
        if (this.page1 < 0) {
            this.last();
        }
        if (this.page1 >= this.count) {
            this.first();
        }
        var start = this.page * this.size;
        return $scope.vouchers.slice(start, start + this.size)
    },
    get count() {
        return Math.ceil(1.0 * $scope.vouchers.length / this.size);
    },
    first() {
        this.page1 = 0;
    },
    last() {
        this.page1 = this.count - 1;
    },
    next() {
        this.page1++;
    },
    prev() {
        this.page1--;
    },
    setPage(pageNumber) {
        this.page1 = pageNumber;
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
    $scope.isStartDateInvalid = function(startDate, endDate) {
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        var start = new Date(startDate);
        var end = new Date(endDate);
        // Kiểm tra nếu ngày bắt đầu lớn hơn hoặc bằng ngày kết thúc
        return start >= end;
    };
    
    $scope.isEndDateInvalid = function(endDate, startDate) {
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        var end = new Date(endDate);
        var start = new Date(startDate);
        // Kiểm tra nếu ngày kết thúc nhỏ hơn hoặc bằng ngày bắt đầu
        return end <= start;
    };
    $scope.isExpired = function(endDate) {
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        var end = new Date(endDate);
        // Lấy ngày hiện tại
        var today = new Date();
        // Kiểm tra nếu ngày kết thúc đã qua
        return end < today;
    };
    
})