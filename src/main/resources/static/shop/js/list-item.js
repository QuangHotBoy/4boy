// Lấy danh sách sản phẩm
var productList = document.querySelector(
  "#products"
);

// Lấy tùy chọn sắp xếp từ dropdown
var sortSelector = document.getElementById("sort-selector");
sortSelector.addEventListener("change", function () {
  if (sortSelector.value === "default") {
  } else {
    sortProducts(sortSelector.value);
  }
});

// Hàm sắp xếp sản phẩm
function sortProducts(option) {
  var products = Array.from(productList.children);
  switch (option) {
    case "price-low-to-high":
      products.sort(function (a, b) {
        var priceA = parseFloat(
          a
            .querySelector(".text-warning.fw-bold")
            .textContent.replace(" đ", "")
            .replace(/\./g, "")
        );
        var priceB = parseFloat(
          b
            .querySelector(".text-warning.fw-bold")
            .textContent.replace(" đ", "")
            .replace(/\./g, "")
        );
        return priceA - priceB;
      });
      break;
    case "price-high-to-low":
      products.sort(function (a, b) {
        var priceA = parseFloat(
          a
            .querySelector(".text-warning.fw-bold")
            .textContent.replace(" đ", "")
            .replace(/\./g, "")
        );
        var priceB = parseFloat(
          b
            .querySelector(".text-warning.fw-bold")
            .textContent.replace(" đ", "")
            .replace(/\./g, "")
        );
        return priceB - priceA;
      });
      break;
    default:
      return products;
      break;
  }
  // Xóa các sản phẩm khỏi danh sách hiện tại
  while (productList.firstChild) {
    productList.removeChild(productList.firstChild);
  }
  // Đổ lại các sản phẩm đã được sắp xếp
  products.forEach(function (product) {
    productList.appendChild(product);
  });
}

$(document).ready(function () {
  // Hàm search
  $('#searchTerm').on('input', function () {
    var searchTerm = $(this).val().trim().toLowerCase(); // Lấy từ khóa tìm kiếm và chuyển thành chữ thường
    var productsContainKeyword = []; // Mảng chứa các sản phẩm chứa từ khóa tìm kiếm
    var productsNotContainKeyword = []; // Mảng chứa các sản phẩm không chứa từ khóa tìm kiếm

    $('.product-card').each(function () {
      var productName = $(this).find('h5').text().trim().toLowerCase(); // Lấy tên sản phẩm và chuyển thành chữ thường
      if (productName.includes(searchTerm)) {
        productsContainKeyword.push($(this)); // Thêm sản phẩm vào mảng nếu chứa từ khóa tìm kiếm
      } else {
        productsNotContainKeyword.push($(this)); // Thêm sản phẩm vào mảng nếu không chứa từ khóa tìm kiếm
      }
    });

    // Ghép mảng sản phẩm chứa từ khóa và không chứa từ khóa lại với nhau
    var mergedProducts = $.merge(productsContainKeyword, productsNotContainKeyword);

    // Hiển thị các sản phẩm từ mảng mới đã sắp xếp
    $('#products').empty(); // Xóa danh sách sản phẩm hiện tại
    mergedProducts.forEach(function (product) {
      $('#products').append(product); // Thêm sản phẩm vào danh sách
    });
  });
});