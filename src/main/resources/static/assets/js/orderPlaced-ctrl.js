var app = angular.module('orderPlacedApp', []);

app.controller("orderPlacedCtrl", function($scope, $http , $timeout, $location, $window) {
    $scope.orderPlaces = [];
    $scope.orderPlacesDetails = [];
    $scope.form = {};
    $scope.selectedStatus = '';

    // Function to initialize the controller
$scope.initialize = function() {
    $http.get("/rest/orderPlaces").then(function(resp1) {
        $scope.orderPlaces = resp1.data;
        // Sắp xếp mảng orderPlaces theo trường ngayDatHang (ngày đặt hàng)
        $scope.orderPlaces.sort((a, b) => new Date(b.ngayDatHang) - new Date(a.ngayDatHang));
        // Gọi hàm lấy dữ liệu cho orderPlacesDetail
        $http.get("/rest/orderPlacesDetail").then(function(resp2) {
            $scope.orderPlacesDetails = resp2.data;
        }).catch(function(error2) {
            console.error("Lỗi khi lấy dữ liệu từ /rest/orderPlacesDetail:", error2);
        });
    }).catch(function(error1) {
        console.error("Lỗi khi lấy dữ liệu từ /rest/orderPlaces:", error1);
    });
};
// Gọi hàm initialize khi controller được khởi tạo
$scope.initialize();

function initializeDataTable() {
    $timeout(function() {
        $('#table1').DataTable({
            "language": {
                "url": "/assets/json/vietnam.json"
            }
        });
    });
}
    $scope.initialize();

    // Function to reset the form
    $scope.reset = function() {
        $scope.form = {};
    };
    $scope.sortByField = function(fieldName) {
        // Xác định biến cờ và sắp xếp mảng dựa trên trường được chọn
        if ($scope.ascending[fieldName]) {
            // Sắp xếp mảng theo trường tăng dần
            $scope.orderPlaces.sort((a, b) => {
                // Sử dụng a[fieldName] và b[fieldName] để truy cập giá trị của trường
                if (typeof a[fieldName] === 'string' && typeof b[fieldName] === 'string') {
                    return a[fieldName].localeCompare(b[fieldName]);
                } else {
                    return a[fieldName] - b[fieldName];
                }
            });
        } else {
            // Sắp xếp mảng theo trường giảm dần
            $scope.orderPlaces.sort((a, b) => {
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
    $scope.edit = function(maDonHang) {
        // Send a GET request to the API to fetch data for the specified ID
        $http.get('/rest/orderPlaces/' + maDonHang)
            .then(function(response) {
                // Copy the fetched data to $scope.form
                $scope.form = response.data;
                // Convert the ISO date string to a JavaScript Date object
                // Show the modal
                $('#exampleModal').modal('show');
                console.log(maDonHang);
            })
            .catch(function(error) {
                // Handle errors
                console.error('Error fetching data for editing:', error);
                // Optionally, you can initialize $scope.form here to avoid undefined errors
                $scope.form = {};
            });
    }; 
    $scope.edittt = function(maDonHang) {
        // Send a GET request to the API to fetch data for the specified ID
        $http.get('/rest/orderPlaces/' + maDonHang)
            .then(function(response) {
                // Copy the fetched data to $scope.form
                $scope.form = response.data;
                // Convert the ISO date string to a JavaScript Date object
                // Show the modal
                $('#exampleModal1').modal('show');
                console.log(maDonHang);
            })
            .catch(function(error) {
                // Handle errors
                console.error('Error fetching data for editing:', error);
                // Optionally, you can initialize $scope.form here to avoid undefined errors
                $scope.form = {};
            });
    };
    $scope.update = function() {
        var orderPlace = angular.copy($scope.form);
        if (orderPlace.trangThai_donDatHang.id === 1) {
            orderPlace.trangThai_donDatHang.id = 7;
        }
        $http.put('/rest/orderPlaces/' + orderPlace.maDonHang, orderPlace)
            .then(resp => {
                // Initialize $scope.vouchers if not already initialized
                if (!$scope.orderPlaces) {
                    $scope.orderPlaces = [];
                }
    
                // Check if the voucher exists in $scope.vouchers before updating
                var index = $scope.orderPlaces.findIndex(i => i.maDonHang === orderPlace.maDonHang);
                if (index !== -1) {
                    $scope.orderPlaces[index] = angular.copy(orderPlace);
                }
    
                $scope.reset(); // Reset form
                alert("Cập nhật lý do hủy đơn thành công!");
                // Optionally, reload data
                // loadData();
                $window.location.reload();
            })
            .catch(error => {
                alert("Lỗi cập nhật lý do hủy đơn!");
                console.log("Error", error);
            });
    };    
    $scope.updatett = function() {
        var orderPlace = angular.copy($scope.form);
        
        // Kiểm tra nếu id trạng thái đang là 1, thực hiện chuyển qua id = 2
        if (orderPlace.trangThai_donDatHang.id === 1) {
            orderPlace.trangThai_donDatHang.id = 2;
        } else if (orderPlace.trangThai_donDatHang.id === 2) {
            orderPlace.trangThai_donDatHang.id = 3;
        } else if (orderPlace.trangThai_donDatHang.id === 3) {
            orderPlace.trangThai_donDatHang.id = 4;
        } else if (orderPlace.trangThai_donDatHang.id === 4) {
            orderPlace.trangThai_donDatHang.id = 5;
        } else if (orderPlace.trangThai_donDatHang.id === 5) {
            orderPlace.trangThai_donDatHang.id = 6;
        }
    
        // Gửi yêu cầu PUT để cập nhật thông tin đơn hàng
        $http.put('/rest/orderPlaces/' + orderPlace.maDonHang, orderPlace)
            .then(function(response) {
                // Kiểm tra và cập nhật lại thông tin đơn hàng trong $scope.orderPlaces nếu cần
                if (!$scope.orderPlaces) {
                    $scope.orderPlaces = [];
                }
    
                var index = $scope.orderPlaces.findIndex(function(item) {
                    return item.maDonHang === orderPlace.maDonHang;
                });
                
                if (index !== -1) {
                    $scope.orderPlaces[index] = angular.copy(orderPlace);
                }
    
                // Đặt lại form
                $scope.reset();
    
                // Thông báo cập nhật thành công
                alert("Cập nhật trạng thái thành công!");
    
                // Load lại trang
                $window.location.reload();
            })
            .catch(function(error) {
                // Xử lý lỗi nếu có
                alert("Lỗi cập nhật trạng thái!");
                console.error("Error", error);
            });
    };
    
    
    $scope.tinhTrangDonDatHangs = [];

    $scope.updateStatus = function() {
        var orderPlace = angular.copy($scope.form);
    
        // Gửi yêu cầu GET để lấy trạng thái đơn hàng tương ứng từ server
        $http.get('/rest/tinhtrangdhds/' + orderPlace.trangThai_donDatHang.id)
            .then(function(response) {
                // Lấy ID của trạng thái đơn hàng từ dữ liệu phản hồi
                var trangThaiDonHangID = response.data.id; // Thay vì response.data.id, hãy kiểm tra cấu trúc dữ liệu phản hồi thực tế và sử dụng thuộc tính phù hợp
    
                // Cập nhật trạng thái trong giao diện người dùng
                orderPlace.trangThai_donDatHang.tenTrangThai = trangThaiDonHangID;
    
                // Gửi request PUT để cập nhật trạng thái lên server
                $http.put('/rest/orderPlaces/' + orderPlace.maDonHang, orderPlace)
                    .then(function(response) {
                        // Xử lý phản hồi từ server nếu cần
                        console.log("Cập nhật trạng thái thành công");
                    })
                    .catch(function(error) {
                        // Xử lý lỗi nếu có
                        console.error("Lỗi khi cập nhật trạng thái:", error);
                        // Rollback trạng thái trong giao diện người dùng nếu cần
                        // Nếu muốn rollback, bạn cần gửi một request GET để lấy lại dữ liệu cập nhật từ server
                    });
            })
            .catch(function(error) {
                // Xử lý lỗi nếu có khi lấy dữ liệu trạng thái đơn hàng từ server
                console.error("Lỗi khi lấy dữ liệu trạng thái đơn hàng:", error);
            });
    };  

   // Search function
   $scope.search = function() {
    // Kiểm tra xem đã nhập từ khóa tìm kiếm hay chưa
    if (!$scope.searchTerm) {
        // Nếu không có từ khóa tìm kiếm, hiển thị lại toàn bộ danh sách mã giảm giá
        $scope.initialize(); // Giả sử initialize() là hàm để load lại danh sách mã giảm giá
        return;
    }

    // Chuyển đổi từ khóa tìm kiếm về chữ thường để thực hiện tìm kiếm không phân biệt chữ hoa chữ thường
    var searchTermLowerCase = $scope.searchTerm.toLowerCase();

    // Thực hiện tìm kiếm trong danh sách mã giảm giá
    $scope.orderPlaces = $scope.orderPlaces.filter(function(orderPlace) {
        // Duyệt qua các thuộc tính của đối tượng mã giảm giá để kiểm tra xem có chứa từ khóa tìm kiếm không
        for (var key in orderPlace) {
            if (orderPlace.hasOwnProperty(key)) {
                // Chỉ tìm kiếm trong các thuộc tính có kiểu dữ liệu là chuỗi hoặc số
                if (typeof orderPlace[key] === 'string' || typeof orderPlace[key] === 'number') {
                    // Chuyển đổi giá trị thuộc tính về chuỗi và chuyển sang chữ thường để tìm kiếm
                    var propertyValueLowerCase = orderPlace[key].toString().toLowerCase();
                    // Nếu thuộc tính chứa từ khóa tìm kiếm, trả về true để giữ lại đối tượng này trong danh sách kết quả
                    if (propertyValueLowerCase.includes(searchTermLowerCase)) {
                        return true;
                    }
                }
            }
        }
        // Nếu không tìm thấy từ khóa trong bất kỳ thuộc tính nào của đối tượng, loại bỏ đối tượng này khỏi danh sách kết quả
        return false;
    });
};
 $scope.filterByStatus = function() {
        // Kiểm tra nếu không có trạng thái được chọn, hiển thị tất cả đơn hàng
        if (!$scope.selectedStatus) {
            $scope.initialize(); // Giả sử initialize() là hàm để load lại danh sách đơn hàng
            return;
        }

        // Lọc danh sách đơn hàng dựa trên trạng thái đã chọn
        $scope.orderPlaces = $scope.orderPlaces.filter(function(orderPlace) {
            return orderPlace.trangThai_donDatHang.id == $scope.selectedStatus;
        });
    };



    $scope.pager = {
        page: 0,
        size: 5,
        get orderPlaces() {
            if (this.page < 0) {
                this.last();
            }
            if (this.page >= this.count) {
                this.first();
            }
            var start = this.page * this.size;
            return $scope.orderPlaces.slice(start, start + this.size)
        },
        get count() {
            return Math.ceil(1.0 * $scope.orderPlaces.length / this.size);
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
    $scope.edit2 = function(maDonHang) {
        // Gửi yêu cầu GET để lấy dữ liệu của đơn hàng dựa trên mã đơn hàng
        $http.get('/rest/orderPlacesDetail/' + maDonHang)
            .then(function(response) {
                // Sao chép dữ liệu của đơn hàng vào $scope.form
                $scope.form = response.data;
                
                // Tiếp tục gửi yêu cầu GET để lấy dữ liệu của các mục chi tiết đơn hàng dựa trên mã đơn hàng
                $http.get('/rest/orderPlaces/' + maDonHang + '/rest/orderPlacesDetail')
                    .then(function(detailResponse) {
                        // Sao chép dữ liệu của chi tiết đơn hàng vào $scope.orderPlacesDetails
                        $scope.orderPlacesDetails = detailResponse.data;
                        console.log(orderPlacesDetails);
                        // Hiển thị modal
                        $('#exampleModal2').modal('show');
                    })
                    .catch(function(error) {
                        // Xử lý lỗi khi không lấy được dữ liệu chi tiết đơn hàng
                        console.error('Lỗi khi lấy dữ liệu chi tiết đơn hàng:', error);
                        // Khởi tạo $scope.orderPlacesDetails để tránh lỗi không xác định
                        $scope.orderPlacesDetails = [];
                    });
            })
            .catch(function(error) {
                // Xử lý lỗi khi không lấy được dữ liệu đơn hàng chính
                console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
                // Hiển thị thông báo lỗi cụ thể
                console.error('Mã lỗi:', error.status);
                console.error('Thông báo lỗi:', error.statusText);
                // Khởi tạo $scope.form để tránh lỗi không xác định
                $scope.form = {};
            });
    };
    
    
});
