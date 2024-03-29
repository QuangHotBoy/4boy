document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                  let lazyImage = entry.target;
                  lazyImage.src = lazyImage.dataset.src;
                  lazyImage.classList.remove("lazy");
                  lazyImageObserver.unobserve(lazyImage);
              }
          });
      });

      lazyImages.forEach(function(lazyImage) {
          lazyImageObserver.observe(lazyImage);
      });
  } else {
      // Fallback for browsers that don't support IntersectionObserver
      // Load all images immediately
      lazyImages.forEach(function(lazyImage) {
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
      });
  }
});

$(document).ready(function() {
    // Lấy danh sách sản phẩm từ localStorage
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Đếm số lượng sản phẩm trong giỏ hàng
    var cartCount = cart.reduce(function(total, product) {
        return total + product.quantity;
    }, 0);

    // Hiển thị số lượng sản phẩm lên website
    $('#cart-count').text(cartCount);
});

$(document).ready(function() {
    // Xử lý sự kiện khi người dùng nhấn vào nút "Thêm vào giỏ hàng"
    $(".btn-outline-warning").click(function() {
        // Lấy thông tin sản phẩm từ phần tử cha của nút được nhấn
        var productContainer = $(this).closest(".card");
        var isbn = $(this).data("isbn");
        var productName = productContainer.find("h5").text();
        var productPrice = productContainer.find(".fw-bold").first().text().replace(' vnđ', '').replace('.', '');
        var productImage = productContainer.find("img").attr("src");
        var quantity = 1;

        // Tạo đối tượng sản phẩm
        var product = {
            id: isbn,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity
        };

        // Lấy danh sách sản phẩm từ LocalStorage (nếu có)
        var cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Thêm sản phẩm vào giỏ hàng
        cart.push(product);

        // Lưu lại danh sách sản phẩm vào LocalStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Hiển thị thông báo cho người dùng
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
    });

    $(".text-bg-warning").click(function() {
        // Lấy thông tin sản phẩm từ phần tử cha của nút được nhấn
        var productContainer = $(this).closest(".card");
        var isbn = $(this).data("isbn");
        var productName = productContainer.find("h5").text();
        var productPrice = productContainer.find(".fw-bold").first().text().replace(' vnđ', '').replace('.', '');
        var productImage = productContainer.find("img").attr("src");
        var quantity = 1;

        // Tạo đối tượng sản phẩm
        var product = {
            id: isbn,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity
        };

        // Lấy danh sách sản phẩm từ LocalStorage (nếu có)
        var cart = JSON.parse(localStorage.getItem("buynow")) || [];

        // Thêm sản phẩm vào giỏ hàng
        cart.push(product);

        // Lưu lại danh sách sản phẩm vào LocalStorage
        localStorage.setItem("buynow", JSON.stringify(cart));
    });
});