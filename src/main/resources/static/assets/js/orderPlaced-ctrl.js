var app = angular.module('orderPlacedApp', []);

app.controller("orderPlacedCtrl", function($scope, $http) {
    $scope.orderPlaces = [];
    $scope.form = {};

    // Function to initialize the controller
    $scope.initialize = function () {
        $http.get("/rest/orderPlaces").then(resp => {
            $scope.orderPlaces = resp.data;

            console.log($scope.orderPlaces);
            // Initialize DataTable after data is loaded

        });
    }

    $scope.initialize();

    // Function to reset the form
    $scope.reset = function() {
        $scope.form = {};
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
                alert("Cập nhật sản phẩm thành công!");
                // Optionally, reload data
                // loadData();
            })
            .catch(error => {
                alert("Lỗi cập nhật sản phẩm!");
                console.log("Error", error);
            });
    };    
    $scope.updatett = function() {
        var orderPlace = angular.copy($scope.form);
        
        // Kiểm tra nếu id trạng thái đang là 1, thực hiện chuyển qua id = 2
        if (orderPlace.trangThai_donDatHang.id === 1) {
            orderPlace.trangThai_donDatHang.id = 2;
        }else if(orderPlace.trangThai_donDatHang.id === 2){
            orderPlace.trangThai_donDatHang.id = 3;
        }else if(orderPlace.trangThai_donDatHang.id === 3){
            orderPlace.trangThai_donDatHang.id = 4;
        }else if(orderPlace.trangThai_donDatHang.id === 4){
            orderPlace.trangThai_donDatHang.id = 5;
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
                alert("Cập nhật sản phẩm thành công!");
            })
            .catch(function(error) {
                // Xử lý lỗi nếu có
                alert("Lỗi cập nhật sản phẩm!");
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
});
