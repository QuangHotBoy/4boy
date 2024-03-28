var app = angular.module('myApp', []);

app.controller("myCtrl", function ($scope, $http) {
    $scope.types = [];
    $scope.form = {};

    $scope.initialize = function () {
        $http.get("/rest/types").then(resp => {
            if (Array.isArray(resp.data)) {
                $scope.types = resp.data;
            } else {
                $scope.types = [resp.data];
            }

            console.log($scope.types);
        });
    }

    $scope.initialize();


    //xoa form
    $scope.reset = function () {
        $scope.form = {}
    }
    //hàm edit
    $scope.edit = function (id) {
        // Gửi yêu cầu GET đến API để lấy thông tin của mục có ID tương ứng
        $http.get('/rest/types/' + id)
            .then(function (response) {
                // Sao chép dữ liệu từ phản hồi vào biến form để điền vào form chỉnh sửa
                $scope.form = angular.copy(response.data);
                console.log(id);
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có
                console.error('Error fetching item for editing:', error);
            });
    };



    //hàm thêm
    $scope.create = function () {
        var item = angular.copy($scope.form);
        $http.post('/rest/types', item).then(resp => {
            if (!$scope.items) {
                $scope.items = [];
            }
            $scope.items.push(resp.data);
            $scope.reset();
            alert("Thêm mới sản phẩm thành công!");
            loadData();
        }).catch(error => {
            alert("Lỗi thêm mới sản phẩm!");
            console.log("Error", error);
        });
    }
    //hàm cập nhật
    $scope.form = {}; // Initialize $scope.form as an empty object
    $scope.update = function () {
        if (!$scope.form || !$scope.form.id) {
            alert("Invalid form data. Cannot update product.");
            return;
        }

        var item = angular.copy($scope.form);
        $http.put('/rest/productsType/${item.id}', item)
            .then(resp => {
                var index = $scope.items.findIndex(p => p.id === item.id);
                if (index !== -1) {
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





    function loadData() {
        $http.get('/rest/types').then(resp => {
            $scope.items = resp.data;
            console.log("Dữ liệu đã được tải:", $scope.items);
        }).catch(error => {
            console.log("Error loading data", error);
        });
    }

    $scope.pager = {
        page: 0,
        size: 5,
        get types() {
            if (this.page < 0) {
                this.last();
            }
            if (this.page >= this.count) {
                this.first();
            }
            var start = this.page * this.size;
            return $scope.types.slice(start, start + this.size)
        },
        get count() {
            return Math.ceil(1.0 * $scope.types.length / this.size);
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












// // Khai báo ứng dụng AngularJS
// var app = angular.module('myApp', []);

// // Khai báo controller
// app.controller("myCtrl", function ($scope, $http) {
//     // Hàm để lấy dữ liệu từ cơ sở dữ liệu
//     $scope.initialize = function () {
//         $http.get("/rest/productsType").then(resp => {
//             $scope.items = resp.data;
//         })

//         $scope.reset();
//     }





//     $scope.reset = function () {
//         $scope.form = {};
//     }

//     $scope.edit = function (id) {
//         $http.get("/rest/productsType/" + id)
//             .then(resp => {
//                 $scope.form = resp.data;
//                 $('#exampleModal1').modal('show');
//             })
//             .catch(error => {
//                 console.log("Error loading item data for editing", error);
//                 // Xử lý lỗi nếu cần thiết
//             });
//     }


//     $scope.create = function () {
//         var item = angular.copy($scope.form);
//         $http.post('/rest/productsType', item).then(resp => {
//             if (!$scope.items) {
//                 $scope.items = [];
//             }
//             $scope.items.push(resp.data);
//             $scope.reset();
//             alert("Thêm mới sản phẩm thành công!");
//             loadData();
//         }).catch(error => {
//             alert("Lỗi thêm mới sản phẩm!");
//             console.log("Error", error);
//         });
//     }

//     // function loadData() {
//     //     $http.get('/rest/productsType').then(resp => {
//     //         $scope.items = resp.data;
//     //         console.log("Dữ liệu đã được tải:", $scope.items);
//     //     }).catch(error => {
//     //         console.log("Error loading data", error);
//     //     });
//     // }

//     $scope.update = function () {
//         var item = angular.copy($scope.form);
//         $http.put(`/rest/productsType/${item.id}`, item)
//             .then(resp => {
//                 var index = $scope.items.findIndex(p => p.id === item.id);
//                 if (index !== -1) {
//                     $scope.items[index].tenLoai = item.tenLoai;
//                     $scope.items[index].moTa = item.moTa;
//                     alert("Cập nhật sản phẩm thành công!");
//                 } else {
//                     alert("Không tìm thấy sản phẩm cần cập nhật trong danh sách!");
//                 }
//             })
//             .catch(error => {
//                 console.log("Error", error);
//                 alert("Lỗi cập nhật sản phẩm!");
//             });
//     };

//     $scope.delete = function (item) {
//         if (confirm("Bạn muốn xóa sản phẩm này?")) {
//             $http.delete(`/rest/products/${item.id}`).then(resp => {
//                 var index = $scope.items.findIndex(p => p.id == item.id);
//                 $scope.items.splice(index, 1);
//                 $scope.reset();
//                 alert("Xóa sản phẩm thành công!");
//             }).catch(error => {
//                 alert("Lỗi xóa sản phẩm!");
//                 console.log("Error", error);
//             })
//         }
//     }

//     $scope.imageChanged = function (files) {
//         var data = new FormData();
//         data.append('file', files[0]);
//         $http.post('/rest/upload/images', data, {
//             transformRequest: angular.identity,
//             headers: {
//                 'Content-Type': undefined
//             }
//         }).then(resp => {
//             $scope.form.image = resp.data.name;
//         }).catch(error => {
//             alert("Lỗi upload hình ảnh");
//             console.log("Error", error);
//         })
//     }

//     $scope.initialize();


// });