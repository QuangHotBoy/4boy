document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    // Load all images immediately
    lazyImages.forEach(function (lazyImage) {
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.classList.remove("lazy");
    });
  }
});

$(document).ready(function () {
  var user = JSON.parse(localStorage.getItem("account") || null);

  if (user === null) {
    $("#cart-count").text(0);
  } else {
    // Lấy danh sách sản phẩm từ localStorage
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Đếm số lượng sản phẩm trong giỏ hàng
    var cartCount = cart.reduce(function (total, product) {
      return total + product.quantity;
    }, 0);

    // Hiển thị số lượng sản phẩm lên website
    $("#cart-count").text(cartCount);
  }
});

var isBuyNowPage = false;

// Kiểm tra khi trang sắp được thoát
$(window).on("beforeunload", function () {
  if (isBuyNowPage) {
    localStorage.removeItem("buynow");
  }
});

// Kiểm tra đường dẫn mỗi khi đường dẫn thay đổi
$(document).ready(function () {
  var currentPath = window.location.pathname;
  console.log(currentPath);
  isBuyNowPage = currentPath === "/shop/buy-now";
});

$(document).ready(function () {
  // Xử lý sự kiện khi người dùng nhấn vào nút "Thêm vào giỏ hàng"
  $(".btn-outline-warning.add-to-cart").click(function () {
    var account = JSON.parse(localStorage.getItem("account")) || null;

    if (account === null) {
      alert("Vui lòng đăng nhập vào tài khoản!");
    } else {
      // Lấy thông tin sản phẩm từ phần tử cha của nút được nhấn
      var productContainer = $(this).closest(".card");
      var isbn = $(this).data("isbn");
      var productName = productContainer.find("h5").text();
      var productPrice = productContainer
        .find(".fw-bold")
        .first()
        .text()
        .replace(" đ", "")
        .replace(".", "");
      var productImage = productContainer.find("img").attr("src");
      var quantity = 1;

      // Tạo đối tượng sản phẩm
      var product = {
        user: account[0].tenDangNhap,
        id: isbn,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity,
      };

      var productId = product; // ID của sản phẩm cần thêm
      addToCart(productId);

      // Hiển thị thông báo cho người dùng
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    }
  });

  $(".text-bg-warning.buynow").click(function () {
    var account = JSON.parse(localStorage.getItem("account")) || null;

    if(account === null){
      alert("Vui lòng đăng nhập vào tài khoản!");
    }else{
      // Lấy thông tin sản phẩm từ phần tử cha của nút được nhấn
    var productContainer = $(this).closest(".card");
    var isbn = $(this).data("isbn");
    var productName = productContainer.find("h5").text();
    var productPrice = productContainer
      .find(".fw-bold")
      .first()
      .text()
      .replace(" đ", "")
      .replace(".", "");
    var productImage = productContainer.find("img").attr("src");
    var quantity = 1;

    // Tạo đối tượng sản phẩm
    var product = {
      id: isbn,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity,
    };

    // Lấy danh sách sản phẩm từ LocalStorage (nếu có)
    var cart = JSON.parse(localStorage.getItem("buynow")) || [];

    // Thêm sản phẩm vào giỏ hàng
    cart.push(product);

    // Lưu lại danh sách sản phẩm vào LocalStorage
    localStorage.setItem("buynow", JSON.stringify(cart));

    location.href = "/shop/buy-now";
    }
  });

  function addToCart(productId) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var found = false;

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    $.each(cart, function (index, item) {
      if (item.user === productId.user && item.id === parseInt(productId.id)) {
        item.quantity++; // Tăng số lượng nếu sản phẩm đã tồn tại
        found = true;
        return false; // Dừng vòng lặp khi tìm thấy sản phẩm
      }
    });

    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào
    if (!found) {
      var newItem = {
        user: productId.user,
        id: productId.id,
        name: productId.name,
        image: productId.image,
        price: productId.price,
        quantity: 1,
      };
      cart.push(newItem);
    }

    // Lưu lại giỏ hàng vào Local Storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Đếm số lượng sản phẩm trong giỏ hàng
    var cartCount = cart.reduce(function (total, product) {
      return total + product.quantity;
    }, 0);

    // Hiển thị số lượng sản phẩm lên website
    $("#cart-count").text(cartCount);
  }
});
