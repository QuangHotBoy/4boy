var app = angular.module('myApp', []);
app.controller("thongkeCtrl", function ($scope, $http, $timeout) {
    $scope.thongkes = [];
    $scope.toptonkho = [];
    function getRandomColor(colorsUsed) {
        var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        if (colorsUsed.includes(color)) {
            return getRandomColor(colorsUsed);
        } else {
            return color;
        }
    }

    $scope.initialize = function () {
        $http.get("/rest/topByTinhTrang/topByTinhTrang").then(resp => {
            $scope.thongkes = resp.data.map(function (item, index) {
                return {
                    TenSach: item[0],
                    TongSoLuongDaBan: item[1],
                    TongDoanhThu: item[2]
                };
            });
            console.log($scope.thongkes);

            var labels = [];
            var data = [];
            var backgroundColor = [];
            var borderColor = [];

            var colorsUsed = [];

            $scope.thongkes.forEach(function (thongke) {
                labels.push(thongke.TenSach);
                data.push(thongke.TongSoLuongDaBan);
                var randomColor = getRandomColor(colorsUsed);
                backgroundColor.push(randomColor);
                borderColor.push(randomColor);
                colorsUsed.push(randomColor);
            });

            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sản phẩm bán chạy',
                        data: data,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: 1
                    }]
                },
                options: {
                    // Cấu hình thêm nếu bạn muốn
                }
            });

            // Cấu hình kích thước biểu đồ
            ctx.canvas.width = 400;
            ctx.canvas.height = 400;
        });
        $http.get("/rest/topByTinhTrang/toptonkho")
            .then(function (response) {
                $scope.toptonkho = response.data.map(function (item) {
                    return {
                        Ma: item[0],
                        TenSach: item[1],
                        SoLuongTonKho: item[2],
                        LoaiSach: item[3]
                    };
                });
                console.log($scope.toptonkho);

                // Initialize DataTable
                angular.element(document).ready(function () {
                    $('#dataTable').DataTable({
                        data: $scope.toptonkho,
                        columns: [
                            { data: 'Ma' },
                            { data: 'TenSach' },
                            { data: 'SoLuongTonKho' },
                            { data: 'LoaiSach' }
                        ]
                    });
                });
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
    }


    $scope.initialize();

});