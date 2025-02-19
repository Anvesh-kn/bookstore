package org.shopping.catalogservice.web.controllers;

import org.shopping.catalogservice.domain.PageResult;
import org.shopping.catalogservice.domain.Product;
import org.shopping.catalogservice.domain.ProductNotFoundException;
import org.shopping.catalogservice.domain.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{code}")
    ResponseEntity<Product> getProduct(@PathVariable(name = "code") String code) {
        System.out.println("get product by code by controller");
        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        return productService
                .getProduct(code)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> ProductNotFoundException.forCode(code));
    }
}
