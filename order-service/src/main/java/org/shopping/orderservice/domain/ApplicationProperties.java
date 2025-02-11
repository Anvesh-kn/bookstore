package org.shopping.orderservice.domain;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "orders")
public record ApplicationProperties(
        String orderEventsTopic,
        String newOrdersTopic,
        String deliveredOrdersTopic,
        String cancelledOrdersTopic,
        String errorOrdersTopic) {}
