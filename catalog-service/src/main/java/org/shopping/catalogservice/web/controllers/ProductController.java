package org.shopping.catalogservice.web.controllers;

import org.shopping.catalogservice.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
class ProductController {

    @Autowired
    private ProductService productService;


    private final ApplicationProperties applicationProperties;

    private final int LIMIT ;

    public ProductController(ProductService productService, ApplicationProperties applicationProperties) {
        this.productService = productService;
        this.applicationProperties = applicationProperties;
        this.LIMIT = applicationProperties.pageSize();
    }

    @GetMapping
    public PageResult<Product> getProduct(@RequestParam(name = "page", defaultValue = "1") int page, @RequestParam(name = "limit", defaultValue = "5") int limit) {
        return productService.getProduct(page,limit);
    }

    @GetMapping("/{code}")
    ResponseEntity<Product> getProduct(@PathVariable(name = "code") String code) {
        System.out.println("get product by code by controller");
        //        sleep();
        return productService
                .getProduct(code)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> ProductNotFoundException.forCode(code));
    }

    private static void sleep() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
