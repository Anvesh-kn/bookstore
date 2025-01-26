package org.shopping.catalogservice.web.controllers;

import org.shopping.catalogservice.domain.PageResult;
import org.shopping.catalogservice.domain.Product;
import org.shopping.catalogservice.domain.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
class ProductController {

    @Autowired
    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public PageResult<Product> getProduct(@RequestParam(name = "page", defaultValue = "1") int page) {
        return productService.getProduct(page);
    }
}
