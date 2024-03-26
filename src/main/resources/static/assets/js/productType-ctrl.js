// // Khởi tạo ứng dụng AngularJS
// var app = angular.module('myApp', []);

// // Định nghĩa controller và khởi tạo biến cho form data
// app.controller('myCtrl', function ($scope, $http) {
//     $scope.newItem = {}; // Khởi tạo biến lưu trữ dữ liệu form

//     // Hàm để làm trắng form
//     $scope.clearForm = function () {
//         $scope.newItem.id = '';
//         $scope.newItem.tenLoai = ''; // Gán giá trị rỗng cho trường tenLoai
//         $scope.newItem.moTa = ''; // Gán giá trị rỗng cho trường moTa
//     };
//     // Hàm thêm mới sản phẩm
//     $scope.addNew = function () {
//         // Gửi yêu cầu POST đến server Spring Boot để thêm mới dữ liệu
//         $http.post('/api/addNew', $scope.newItem)
//             .then(function (response) {
//                 // Xử lý kết quả trả về nếu cần
//                 console.log(response.data);
//                 // Sau khi thêm thành công, đóng modal
//                 $('#exampleModal').modal('hide');
//             }, function (error) {
//                 // Xử lý lỗi nếu có
//                 console.error('Error:', error);
//                 console.log($scope.addNew);
//             });
//     };






//     // Hàm cập nhật thông tin sản phẩm sau khi chỉnh sửa
//     $scope.updateItem = function () {
//         // Gửi yêu cầu PUT đến server Spring Boot để cập nhật dữ liệu sản phẩm
//         $http.put('/api/update/' + $scope.editItem.id, $scope.editItem)
//             .then(function (response) {
//                 // Xử lý kết quả trả về nếu cần
//                 console.log(response.data);
//                 // Đóng modal sau khi cập nhật thành công
//                 $('#exampleModal').modal('hide');
//             }, function (error) {
//                 // Xử lý lỗi nếu có
//                 console.error('Error:', error);
//             });
//     };

// });



// Khai báo ứng dụng AngularJS
var app = angular.module('myApp', []);

// Khai báo controller
app.controller("myCtrl", function ($scope, $http) {
    $scope.initialize = function () {


        $http.get("/rest/productsType").then(resp => {
            $scope.items = resp.data;

        });
        $scope.reset();
    }
    //hàm làm mới
    $scope.reset = function () {
        $scope.form = {}
    }
    //hàm edit
    $scope.edit = function(id) {
        $http.get(`/rest/productsType/${id}`) // Sử dụng id để xác định sản phẩm cần lấy
            .then(resp => {
                $scope.items = resp.data; // Gán dữ liệu từ resp.data vào items
                // Gán dữ liệu từ resp.data vào form
            })
            .catch(error => {
                console.log("Error", error);
                alert("Lỗi lấy dữ liệu sản phẩm!");
            });
    };
    
    

    $scope.loadData = function () {
        $http.get('/rest/productsType')
            .then(resp => {
                // Gán dữ liệu nhận được từ resp.data vào biến items trong $scope
                $scope.items = resp.data;
                console.log("Dữ liệu đã được tải:", $scope.items);
            })
            .catch(error => {
                console.log("Lỗi khi tải dữ liệu:", error);
                alert("Đã xảy ra lỗi khi tải dữ liệu!");
            });
    };






    //hàm thêm mới
    $scope.create = function () {
        var item = angular.copy($scope.form);
        $http.post('/rest/productsType', item).then(resp => {
            // resp.data.createDate = new Date(resp.data.createDate)
            if (!$scope.items) {
                $scope.items = []; // Khởi tạo mảng nếu chưa tồn tại
            }
            $scope.items.push(resp.data);
            $scope.reset();
            alert("Thêm mới sản phẩm thành công!");
            // Load lại dữ liệu sau khi thêm mới thành công
            loadData();
        }).catch(error => {
            alert("Lỗi thêm mới sản phẩm!");
            console.log("Error", error);
        });
    }

    // Định nghĩa hàm loadData()
    function loadData() {
        $http.get('/rest/productsType').then(resp => {
            $scope.items = resp.data;
        }).catch(error => {
            console.log("Error loading data", error);
        });
    }


    //hàm update
    $scope.update = function () {
        var item = angular.copy($scope.form); // Tạo một bản sao của đối tượng form để tránh ảnh hưởng đến dữ liệu gốc
        $http.put(`/rest/productsType/${item.id}`, item) // Gửi yêu cầu PUT để cập nhật dữ liệu sản phẩm
            .then(resp => {
                var index = $scope.items.findIndex(p => p.id === item.id);
                if (index !== -1) { // Kiểm tra nếu index hợp lệ
                    // Gán dữ liệu mới vào đối tượng tại vị trí index thay vì gán lại item vào items[index]
                    $scope.items[index].tenLoai = item.tenLoai;
                    $scope.items[index].moTa = item.moTa;
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
    


    $scope.delete = function (item) {
        if (confirm("Bạn muốn xóa sản phẩm này?")) {
            $http.delete(`/rest/products/${item.id}`).then(resp => {
                var index = $scope.items.findIndex(p => p.id == item.id);
                $scope.items.splice(index, 1);
                $scope.reset();
                alert("Xóa sản phẩm thành công!");
            }).catch(error => {
                alert("Lỗi xóa sản phẩm!");
                console.log("Error", error);
            })
        }
    }

    $scope.imageChanged = function (files) {
        var data = new FormData();
        data.append('file', files[0]);
        $http.post('/rest/upload/images', data, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(resp => {
            $scope.form.image = resp.data.name;
        }).catch(error => {
            alert("Lỗi upload hình ảnh");
            console.log("Error", error);
        })
    }

    $scope.initialize();

    $scope.pager = {
        page: 0,
        size: 10,
        get items() {
            if (this.page < 0) {
                this.last();
            }
            if (this.page >= this.count) {
                this.first();
            }
            var start = this.page * this.size;
            return $scope.items.slice(start, start + this.size)
        },
        get count() {
            return Math.ceil(1.0 * $scope.items.length / this.size);
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
        }
    }
});