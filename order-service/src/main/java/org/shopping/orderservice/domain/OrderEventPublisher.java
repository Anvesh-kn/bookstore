package org.shopping.orderservice.domain;

import org.shopping.orderservice.domain.models.OrderCreatedEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class OrderEventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final ApplicationProperties applicationProperties;

    public OrderEventPublisher(
            KafkaTemplate<String, Object> kafkaTemplate, ApplicationProperties applicationProperties) {
        this.kafkaTemplate = kafkaTemplate;
        this.applicationProperties = applicationProperties;
    }

    public void publish(OrderCreatedEvent orderEvent) {
        this.send(applicationProperties.newOrdersTopic(), orderEvent);
    }

    private void send(String routingKey, Object payload) {
        kafkaTemplate.send(applicationProperties.newOrdersTopic(), routingKey, payload);
    }
}
