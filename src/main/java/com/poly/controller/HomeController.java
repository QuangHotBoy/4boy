package com.poly.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.dao.ChiTietDonDatHangDAO;
import com.poly.dao.DanhGiaDAO;
import com.poly.dao.NhaXuatBanDAO;
import com.poly.dao.PhanLoaiDAO;
import com.poly.dao.SanPhamDAO;
import com.poly.model.DanhGia;
import com.poly.model.SanPham;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class HomeController {

	@Autowired
	SanPhamDAO productDAO;

	@Autowired
	PhanLoaiDAO typeDao;

	@Autowired
	NhaXuatBanDAO publisingDAO;

	@Autowired
	DanhGiaDAO reviewDAO;

	@Autowired
	ChiTietDonDatHangDAO detailOrderDAO;

	@RequestMapping("")
	public String home() {
		return "redirect:/shop/home";
	}

	@RequestMapping("shop/home")
	public String shopHome(Model model) {

		List<SanPham> products = productDAO.findAllSapXep();
		List<SanPham> top8Product = products.subList(0, Math.min(products.size(), 8));
		List<Object[]> top8Popular = detailOrderDAO.getTop8SachByTinhTrang();

		List<Object[]>popular = new ArrayList<>();

		if(top8Popular.size() < 8){
			popular = top8Popular.subList(0, Math.min(top8Popular.size(), 4));
		}else{
			popular = top8Popular.subList(0, Math.min(top8Popular.size(), 8));
		}

		model.addAttribute("popular", popular);
		model.addAttribute("top8Product", top8Product);
		model.addAttribute("title", "Knotrea - Trang chủ");

		return "shop/index";
	}

	@RequestMapping("shop/list")
	public String listProduct(Model model) {

		List<SanPham> list = productDAO.findAllSapXep();

		model.addAttribute("list", list);
		model.addAttribute("band", "DANH SÁCH SẢN PHẨM");
		model.addAttribute("title", "Knotrea - Danh sách sản phẩm");

		return "shop/list";
	}

	@RequestMapping("shop/list-sale")
	public String listSale(Model model) {
		List<SanPham> products = productDAO.findByTinhTrangSanPham(3);

		model.addAttribute("list", products);
		model.addAttribute("band", "GIẢM GIÁ ĐẶC BIỆT");
		model.addAttribute("title", "Knotrea - Giám giá đặc biệt");

		return "shop/list";
	}

	@RequestMapping("shop/product/{isbn}")
	public String detailProduct(Model model, @PathVariable("isbn") Long isbn) {

		SanPham product = productDAO.findById(isbn).get();
		List<SanPham> relatedNXB = productDAO.findByNhaCungCap(product.getNhaXuatBan().getId());
		List<SanPham> relatedType = productDAO.findByPhanLoai(product.getPhanLoai().getId());

		List<DanhGia> reviews = reviewDAO.findBySanPham_danhGia(isbn);

		int numberOfReview = reviews.size();

		// Tính điểm đánh giá trung bình
        double averageRating = calculateAverageRating(reviews);

		// Khởi tạo mảng chứa số lượng đánh giá cho mỗi điểm đánh giá (từ 1 đến 5)
        int[] numberOfRatings = new int[5];

        // Tính số lượng đánh giá cho mỗi điểm đánh giá
        for (DanhGia review : reviews) {
            int rating = review.getRating();
            numberOfRatings[rating - 1]++;
        }

		ArrayList<SanPham> relatedProducts = new ArrayList<>();
		relatedProducts.addAll(relatedType);
		relatedProducts.addAll(relatedNXB);

		// Loại bỏ các phần tử trùng lặp từ relatedProducts
		HashSet<SanPham> uniqueRelatedProducts = new HashSet<>(relatedProducts);
		relatedProducts.clear();
		relatedProducts.addAll(uniqueRelatedProducts);
		relatedProducts.remove(product);

		Collections.shuffle(relatedProducts);

		if (relatedProducts.size() >= 4) {
			List<SanPham> products = relatedProducts.subList(0, 4);
			model.addAttribute("relatedProducts", products);
		} else {
			List<SanPham> products = productDAO.findAll();

			Random random = new Random();

			int randomIndex = random.nextInt(products.size());

			relatedProducts.add(products.get(randomIndex));

			model.addAttribute("relatedProducts", relatedProducts);
		}

		model.addAttribute("product", product);
		model.addAttribute("reviews", reviews);
		model.addAttribute("numberOfReview", numberOfReview);
		model.addAttribute("averageRating", averageRating);
		model.addAttribute("numberOfRatings", numberOfRatings);
		model.addAttribute("title", "Knotrea - " + product.getTenSach());

		return "shop/detail-item";
	}

	@RequestMapping("shop/search/keyword")
	public String search(Model model, @RequestParam("searchData") String keyword) {

		List<SanPham> list = productDAO.findByTenSachContaining(keyword);

		System.out.println(keyword);

		model.addAttribute("list", list);
		model.addAttribute("band", "DANH SÁCH SẢN PHẨM");

		return "shop/list";
	}
	

	@RequestMapping("shop/auth/cart")
	public String cart(Model model) {

		model.addAttribute("title", "Knotrea - Giỏ hàng của bạn");

		return "shop/cart";
	}

	@RequestMapping("shop/auth/order/check-out")
	public String checkOut(Model model) {

		model.addAttribute("title", "Knotrea - Thanh toán đơn hàng");

		return "shop/checkout";
	}

	@RequestMapping("shop/buy-now")
	public String buyNow(Model model) {
		
		model.addAttribute("title", "Knotrea - Thanh toán sản phẩm");

		return "shop/buy-now";
	}

	@RequestMapping("shop/order/thank-for-order")
	public String orderSuccess(Model model) {

		return "shop/complete-order";
	}

	// Phương thức tính điểm đánh giá trung bình
    private double calculateAverageRating(List<DanhGia> reviews) {
        double totalRating = 0.0;
        for (DanhGia review : reviews) {
            totalRating += review.getRating();
        }
        return reviews.isEmpty() ? 0.0 : totalRating / reviews.size();
    }
}


