// Tạo một module Angular
var app = angular.module('product-App', []);
app.controller("product-Ctrl", function ($scope, $http, $timeout) {
    $scope.products = [];
    $scope.types = [];
    $scope.suppliers = [];
    $scope.tinhtrangs = [];

    $scope.initialize = function () {
        // Load tinhtrangs data first
        $http.get("/rest/tinhtrangs").then(resp => {
            $scope.tinhtrangs = resp.data;

            // After loading tinhtrangs, load suppliers data
            $http.get("/rest/suppliers").then(resp => {
                $scope.suppliers = resp.data;

                // After loading suppliers, load types data
                $http.get("/rest/types").then(resp => {
                    $scope.types = resp.data;

                    // After loading types, load products data
                    $http.get("/rest/products").then(resp => {
                        $scope.products = resp.data;



                        // Initialize DataTable after data is loaded
                        $timeout(function () {
                            $('#table1').DataTable({
                                "language": {
                                    "url": "/assets/json/vietnam.json"
                                }
                            });
                        });
                    });
                });
            });
        });
    };



    // Call the initialize function when the controller is instantiated
    $scope.initialize();
    // Xử lý khi người dùng thay đổi hình ảnh
    $scope.imageChanged = function (files) {
        if (files && files.length > 0) { // Kiểm tra xem 'files' có chứa dữ liệu không
            var data = new FormData();
            data.append('file', files[0]);
            $http.post('/rest/upload/products', data, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(resp => {
                // Kiểm tra xem 'form' đã được khởi tạo chưa
                if (!$scope.form) {
                    $scope.form = {}; // Nếu chưa được khởi tạo, hãy khởi tạo nó
                }
                $scope.form.hinhAnh = resp.data.name;
            }).catch(error => {
                alert("Lỗi upload hình ảnh");
                console.log("Error", error);
                console.log($scope.form.hinhAnh);
            });
        } else {
            console.error("No files provided.");
        }
    };

    //hàm edit
    $scope.edit = function (isbn) {
        // Gửi yêu cầu GET đến API để lấy thông tin của mục có ISBN tương ứng
        $http.get('/rest/products/' + isbn)
            .then(function (response) {
                // Gán dữ liệu trả về cho biến form để điền vào form chỉnh sửa
                $scope.form = response.data;
                // Hiển thị modal chỉnh sửa
                $('#exampleModal1').modal('show');
                console.log(isbn);
                console.log($scope.form);
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có
                console.error('Error fetching item for editing:', error);
            });
    };

    // Hàm thêm nhà xuất bản
    $scope.create = function () {

        var item = angular.copy($scope.form);
        // Gửi yêu cầu POST đến máy chủ
        $http.post('/rest/products', item)
            .then(function (response) {
                if (!$scope.products) {
                    $scope.products = [];
                }
                $scope.products.push(response.data);
                $scope.reset();
                alert("Thêm mới sách thành công!");
                $scope.initialize(); // Load lại danh sách sau khi thêm thành công
            })
            .catch(function (error) {
                alert("Lỗi thêm mới sách: " + error.data.message); // Hiển thị thông điệp lỗi từ máy chủ
                console.log("Error", error);
            });
    };

    //hàm cập nhật
    $scope.update = function () {
        var item = angular.copy($scope.form);
        $http.put('/rest/products/' + item.isbn, item).then(resp => {
            // Kiểm tra nếu $scope.items chưa được khởi tạo, thì khởi tạo nó là một mảng trống
            if (!$scope.items) {
                $scope.items = [];
            }

            // Tìm và cập nhật mục đã được chỉnh sửa trong mảng $scope.items
            var index = $scope.items.findIndex(i => i.isbn === item.isbn);
            if (index !== -1) {
                $scope.items[index] = angular.copy(item);
            }

            $scope.reset();
            alert("Cập nhật sách thành công!");
            loadData();
        }).catch(error => {
            alert("Lỗi cập nhật sách!");
            console.log("Error", error);
        });
    }
    function loadData() {
        $http.get('/rest/products/').then(resp => {
            $scope.items = resp.data;
            console.log("Dữ liệu đã được tải:", $scope.items);
        }).catch(error => {
            console.log("Error loading data", error);
        });
    }
    // Hàm reset form
    $scope.reset = function () {
        // Xóa tất cả dữ liệu trong form
        $scope.form = {};

        // Reset image preview
        document.getElementById('imgPreview').src = '';

        // Reset selected file input
        var input = document.getElementById('image');
        input.value = ''; // Reset input value
        input.type = ''; // Reset input type
        input.type = 'file'; // Restore input type

        // Reset ng-src
        $scope.form.hinhAnh = ''; // hoặc $scope.form.hinhAnh = 'đường_dẫn_mặc_định'; tùy vào bạn muốn
    };

});