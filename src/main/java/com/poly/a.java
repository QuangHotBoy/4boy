package com.poly;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class a {
	@RequestMapping("shop/home")
	public String index() {
		return "index";
	}
	@RequestMapping("shop/a")
	public String a1() {
		 return "pages/forms/basic_elements";
		
	}
}
