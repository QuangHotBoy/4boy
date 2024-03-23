// Lấy danh sách sản phẩm
var productList = document.querySelector(
  ".row.row-cols-2.row-cols-md-3.row-cols-xl-4.justify-content-center"
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
            .textContent.replace(" vnđ", "")
            .replace(/\./g, "")
        );
        var priceB = parseFloat(
          b
            .querySelector(".text-warning.fw-bold")
            .textContent.replace(" vnđ", "")
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
            .textContent.replace(" vnđ", "")
            .replace(/\./g, "")
        );
        var priceB = parseFloat(
          b
            .querySelector(".text-warning.fw-bold")
            .textContent.replace(" vnđ", "")
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
