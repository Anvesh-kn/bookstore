package org.shopping.orderservice.domain;



import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@ConfigurationProperties(prefix = "orders")
public record ApplicationProperties(
        String orderEventsTopic,
        String newOrdersTopic,
        String deliveredOrdersTopic,
        String cancelledOrdersTopic,
        String errorOrdersTopic
) {

}
