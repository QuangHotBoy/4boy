// Tạo một module Angular
var app = angular.module('product-App', []);
app.filter('vnCurrency', function () {
    return function (input) {
        if (isNaN(input)) return input;
        return input.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
});

app.controller("product-Ctrl", function ($scope, $http, $timeout) {
    $scope.products = [];
    $scope.types = [];
    $scope.suppliers = [];
    $scope.tinhtrangs = [];

    $scope.checkrole = function () {
        var account = JSON.parse(localStorage.getItem("account")) || [];
        var tenDangNhap = account[0].tenDangNhap;
        $http.get("/rest/findrole/" + tenDangNhap).then(resp => {
            $scope.role = [];
            $scope.role = resp.data;
            var quyen = $scope.role.quyen.id
            console.log(quyen);
            if (quyen === "CUST") {
                location.href = "/shop/home";
            }
        })
    }
    $scope.initialize = function () {


        // check role  
        $scope.checkrole();
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



    // Gọi hàm khởi tạo
    $scope.initialize();
    // Xử lý khi người dùng thay đổi hình ảnh
    $scope.imageChanged = function (files) {
        if (files && files.length > 0) { // Kiểm tra xem 'files' có chứa dữ liệu không
            var data = new FormData();
            data.append('file', files[0]);
            $http.post('/rest/upload/products', data, {
                // ngăn chuyển về Json
                transformRequest: angular.identity,
                // tự động chuyển kiểu dữ liệu mặc định 'multipart/form-data
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
        // Kiểm tra hợp lệ của form trước khi thêm mới
        if (!validateForm()) {
            // Nếu form không hợp lệ, không tiến hành thêm mới
            return;
        }
        // Kiểm tra xem giá trị tenLoai , nxb đã được chọn hay chưa
        if (!$scope.form.phanLoai || !$scope.form.phanLoai.tenLoai) {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng chọn loại sách.',
                position: 'topRight'
            });
            return;
        }
        if (!$scope.form.nhaXuatBan || !$scope.form.nhaXuatBan.tenNhaXuatBan) {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng chọn nhà xuất bản.',
                position: 'topRight'
            });
            return;
        }
        //
        var item = angular.copy($scope.form);

        // Sử dụng giá trị đã chọn từ select box cho nhà xuất bản
        var tenNhaXuatBan = $scope.form.nhaXuatBan.tenNhaXuatBan;
        var tenLoai = $scope.form.phanLoai.tenLoai;

        // Lấy thông tin nhà xuất bản từ danh sách suppliers
        var selectedSupplier = $scope.suppliers.find(function (supplier) {
            return supplier.tenNhaXuatBan === tenNhaXuatBan;
        });
        var selectedType = $scope.types.find(function (type) {
            return type.tenLoai === tenLoai;
        });
    

        // Gán giá trị nhà xuất bản từ đối tượng được chọn
        item.nhaXuatBan = selectedSupplier;
        item.phanLoai = selectedType;
        item.tinhTrangSanPham = { id: '1' };
        // Gửi yêu cầu POST đến máy chủ
        $http.post('/rest/products', item)
            .then(function (response) {
                // kiểm tra biến nó có tồn tại hay không 
                if (!$scope.products) {
                    // khai báo ra 1 mảng để lưu trữ dữ liệu
                    $scope.products = [];
                }
                $scope.products.push(response.data);
                $scope.reset();
                iziToast.success({
                    title: 'Thông báo',
                    message: 'Thêm mới sách thành công!',
                    position: 'topRight'
                });



                // Chờ 3 giây trước khi thực hiện reload
                setTimeout(function () {
                    location.reload();
                }, 1000);
            })
            .catch(function (error) {
                iziToast.warning({
                    title: 'Thông báo',
                    message: 'Lỗi thêm mới !!',
                    position: 'topRight'
                });// Hiển thị thông điệp lỗi từ máy chủ
                console.log("Error", error);
            });
    };


    //hàm cập nhật
    $scope.update = function () {



        // copy dữ liệu ra 1 bản khác
        var item = angular.copy($scope.form);
        // Kiểm tra hợp lệ của form trước khi thực hiện cập nhật
        // bắt lỗi lấy item từ copy gọi kt
        var tenSach = item.tenSach
        var namXuatBan = item.namXuatBan
        var tacGia = item.tacGia
        var kieuBia = item.kieuBia
        var giaBan = item.giaBan
        var soLuong = item.soLuong
        var moTa = item.moTa

        // Kiểm tra từng trường và hiển thị thông báo lỗi nếu trống
        if (tenSach.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập tên sách.',
                position: 'topRight'
            });
            return false;
        }
        if (namXuatBan.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập năm xuất bản.',
                position: 'topRight'
            });
            return false;
        }
        if (tacGia.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập tên tác giả.',
                position: 'topRight'
            });
            return false;
        }
        if (kieuBia.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập loại bìa.',
                position: 'topRight'
            });
            return false;
        }
        // Kiểm tra xem giaBan có giá trị null không trước khi chuyển đổi sang chuỗi
        if (giaBan === null || giaBan === undefined) {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập giá bán.',
                position: 'topRight'
            });
            return false;
        } else if (parseInt(giaBan) <= 0) { // Kiểm tra nếu số lượng là không hoặc âm
            iziToast.warning({
                title: 'Thông báo',
                message: 'Giá bán phải lớn hơn 0.',
                position: 'topRight'
            });
            return false;
        }
        if (soLuong === null || soLuong === undefined) {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập số lượng.',
                position: 'topRight'
            });
            return false;

        } else if (parseInt(soLuong) <= 0) { // Kiểm tra nếu số lượng là không hoặc âm
            iziToast.warning({
                title: 'Thông báo',
                message: 'Số lượng phải lớn hơn 0.',
                position: 'topRight'
            });
            return false;
        }
        if (moTa.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập mô tả.',
                position: 'topRight'
            });
            return false;
        }
        // Sử dụng giá trị đã chọn từ select box cho nhà xuất bản
        var tenNhaXuatBan = $scope.form.nhaXuatBan.tenNhaXuatBan;
        var tenLoai = $scope.form.phanLoai.tenLoai;
        var tenTinhTrang = $scope.form.tinhTrangSanPham.tenTinhTrang;
        // Lấy thông tin  từ danh sách 
        var selectedSupplier = $scope.suppliers.find(function (supplier) {
            return supplier.tenNhaXuatBan === tenNhaXuatBan;
        });
        var selectedType = $scope.types.find(function (type) {
            return type.tenLoai === tenLoai;
        });
        var selectedTinhTrang = $scope.tinhtrangs.find(function (tinhtrang) {
            return tinhtrang.tenTinhTrang === tenTinhTrang;
        });

        // Gán giá trị nhà xuất bản từ đối tượng được chọn
        item.nhaXuatBan = selectedSupplier;
        item.phanLoai = selectedType;
        item.tinhTrangSanPham = selectedTinhTrang;

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
            iziToast.success({
                title: 'Thông báo',
                message: 'Cập nhật sách bản thành công!',
                position: 'topRight'
            });
            // Chờ 3 giây trước khi thực hiện reload
            setTimeout(function () {
                location.reload();
            }, 1000);
        }).catch(error => {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Lỗi cập nhật !!',
                position: 'topRight'
            });
            console.log("Error", error);
        });
    }
    // load data
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

    //bắt lỗi 
    function validateForm() {
        var tenSach = document.getElementById("tensach").value;
        var namXuatBan = document.getElementById("namXuatBan").value;
        var tacGia = document.getElementById("tacGia").value;
        var kieuBia = document.getElementById("loaibia").value;
        var giaBan = document.getElementById("giaBan").value;
        var soLuong = document.getElementById("soluong").value;
        var moTa = document.getElementById("mota").value;
        var hinhAnhInput = document.getElementById("image");
        // var selectElement = document.getElementById("loaiSach");


        // Kiểm tra từng trường và hiển thị thông báo lỗi nếu trống
        if (tenSach.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập tên sách.',
                position: 'topRight'
            });
            return false;
        }

        if (namXuatBan.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập năm xuất bản.',
                position: 'topRight'
            });
            return false;
        }

        if (tacGia.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập tác giả.',
                position: 'topRight'
            });
            return false;
        }

        if (kieuBia.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập loại bìa.',
                position: 'topRight'
            });
            return false;
        }

        if (giaBan.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập giá bán.',
                position: 'topRight'
            });
            return false;
        } else if (parseInt(giaBan) <= 0) { // Kiểm tra nếu số lượng là không hoặc âm
            iziToast.warning({
                title: 'Thông báo',
                message: 'Giá bán phải lớn hơn 0.',
                position: 'topRight'
            });
            return false;
        }
        if (soLuong.trim() === "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập số lượng.',
                position: 'topRight'
            });
            return false;
        } else if (parseInt(soLuong) <= 0) { // Kiểm tra nếu số lượng là không hoặc âm
            iziToast.warning({
                title: 'Thông báo',
                message: 'Số lượng phải lớn hơn 0.',
                position: 'topRight'
            });
            return false;
        }


        if (moTa.trim() == "") {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Vui lòng nhập mô tả.',
                position: 'topRight'
            });
            return false;
        }
        // Kiểm tra xem người dùng đã chọn hình ảnh hay chưa
        if (hinhAnhInput.files.length === 0) {
            document.getElementById("imageError").style.display = "block";
            return false;
        }
        // Kiểm tra xem tenLoai có trùng không
        if (isTennxbTrung(tenSach)) {
            iziToast.warning({
                title: 'Thông báo',
                message: 'Tên sách đã tồn tại!!',
                position: 'topRight'
            });
            return false;
        }
        // Trả về true nếu không có lỗi
        return true;
    }
    //kiểm tra trùng tên
    function isTennxbTrung(tenSach) {
        // Lặp qua danh sách các loại sách đã tải từ server
        for (var i = 0; i < $scope.products.length; i++) {
            if ($scope.products[i].tenSach === tenSach) {
                return true; // Nếu trùng, trả về true
            }
        }
        return false; // Nếu không trùng, trả về false
    }
    // bắt lỗi cập nhật
    // function validateForm1() {
    //     var tenSach = document.getElementById("tensach").value;
    //     var namXuatBan = document.getElementById("namXuatBan").value;
    //     var tacGia = document.getElementById("tacGia").value;
    //     var kieuBia = document.getElementById("loaibia").value;
    //     var giaBan = document.getElementById("giaGocc").value;
    //     var soLuong = document.getElementById("soluong").value;
    //     var moTa = document.getElementById("mota").value;
    //     var hinhAnhInput = document.getElementById("image");
    //     // var selectElement = document.getElementById("loaiSach");


    //     // Kiểm tra từng trường và hiển thị thông báo lỗi nếu trống
    //     if (tenSach.trim() == "") {
    //         iziToast.warning({
    //             title: 'Thông báo',
    //             message: 'Vui lòng nhập tên sách.',
    //             position: 'topRight'
    //         });
    //         return false;
    //     }




    //     if (tacGia.trim() == "") {
    //         iziToast.warning({
    //             title: 'Thông báo',
    //             message: 'Vui lòng nhập tác giả.',
    //             position: 'topRight'
    //         });
    //         return false;
    //     }

    //     if (kieuBia.trim() == "") {
    //         iziToast.warning({
    //             title: 'Thông báo',
    //             message: 'Vui lòng nhập loại bìa.',
    //             position: 'topRight'
    //         });
    //         return false;
    //     }

    //     if (giaBan.trim() == "") {
    //         iziToast.warning({
    //             title: 'Thông báo',
    //             message: 'Vui lòng nhập giá bán.',
    //             position: 'topRight'
    //         });
    //         return false;
    //     }

    //     if (soLuong.trim() == "") {
    //         iziToast.warning({
    //             title: 'Thông báo',
    //             message: 'Vui lòng nhập số lượng.',
    //             position: 'topRight'
    //         });
    //         return false;
    //     }

    //     if (moTa.trim() == "") {
    //         iziToast.warning({
    //             title: 'Thông báo',
    //             message: 'Vui lòng nhập mô tả.',
    //             position: 'topRight'
    //         });
    //         return false;
    //     }
    //     // Kiểm tra xem người dùng đã chọn hình ảnh hay chưa
    //     if (hinhAnhInput.files.length === 0) {
    //         document.getElementById("imageError").style.display = "block";
    //         return false;
    //     }

    //     // Trả về true nếu không có lỗi
    //     return true;
    // }



});