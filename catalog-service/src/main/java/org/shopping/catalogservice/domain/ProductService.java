package org.shopping.catalogservice.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public PageResult<Product> getProduct(int pageNo) {
        Sort sort = Sort.by("name").ascending();
        pageNo = pageNo < 1 ? 0 : pageNo - 1;
        Pageable pageable = PageRequest.of(pageNo, 5, sort);
        Page<Product> products = productRepository.findAll(pageable).map(ProductMapper::toProduct);
        return new PageResult<>(
                products.getNumber() + 1,
                products.getTotalElements(),
                products.isFirst(),
                products.isLast(),
                products.getTotalPages(),
                products.hasNext(),
                products.hasPrevious(),
                products.getContent());
    }
}
