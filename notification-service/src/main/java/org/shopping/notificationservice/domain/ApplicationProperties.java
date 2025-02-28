package org.shopping.notificationservice.domain;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "notifications")
public record ApplicationProperties(
        String orderEventsTopic,
        String newOrdersTopic,
        String deliveredOrdersTopic,
        String cancelledOrdersTopic,
        String errorOrdersTopic,
        String catalogRedisServiceUrl,
        @Value("${spring.kafka.bootstrap-servers}") String kafkaBootstrapServers,
        String supportEmail) {}
