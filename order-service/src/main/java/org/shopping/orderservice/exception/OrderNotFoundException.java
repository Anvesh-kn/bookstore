package org.shopping.orderservice.exception;

public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(String message) {
        super(STR."Order not found: \{message}");
    }
}
