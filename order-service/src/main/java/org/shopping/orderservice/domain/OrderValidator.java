package org.shopping.orderservice.domain;

import java.util.Set;
import org.shopping.orderservice.catalog.Product;
import org.shopping.orderservice.catalog.ProductServiceClient;
import org.shopping.orderservice.domain.models.CreateOrderRequest;
import org.shopping.orderservice.domain.models.OrderItem;
import org.shopping.orderservice.exception.InvalidOrderException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class OrderValidator {
    private static final Logger log = LoggerFactory.getLogger(OrderValidator.class);

    private final ProductServiceClient productServiceClient;

    public OrderValidator(ProductServiceClient productServiceClient) {
        this.productServiceClient = productServiceClient;
    }

    void isValidOrder(CreateOrderRequest request) {
        Set<OrderItem> orderItems = request.items();
        for (OrderItem orderItem : orderItems) {
            Product product = productServiceClient
                    .getProductByCode(orderItem.code())
                    .orElseThrow(() -> new InvalidOrderException("Product not found with code: " + orderItem.code()));
            if (product.price().compareTo(orderItem.price()) != 0) {
                log.error("Price mismatch for product with code: {}", product.price());
                throw new InvalidOrderException("Price mismatch for product with code: " + orderItem.code());
            }
        }
    }
}
