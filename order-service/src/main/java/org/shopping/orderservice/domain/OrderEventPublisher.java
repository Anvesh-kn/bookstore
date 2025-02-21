package org.shopping.orderservice.domain;

import org.shopping.orderservice.domain.models.OrderCancelledEvent;
import org.shopping.orderservice.domain.models.OrderCreatedEvent;
import org.shopping.orderservice.domain.models.OrderDeliveredEvent;
import org.shopping.orderservice.domain.models.OrderErrorEvent;
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

    public void publish(OrderDeliveredEvent orderEvent) {
        this.send(applicationProperties.deliveredOrdersTopic(), orderEvent);
    }

    public void publish(OrderCancelledEvent orderEvent) {
        this.send(applicationProperties.cancelledOrdersTopic(), orderEvent);
    }

    public void publish(OrderErrorEvent orderEvent) {
        this.send(applicationProperties.errorOrdersTopic(), orderEvent);
    }

    private void send(String topic, Object payload) {
        kafkaTemplate.send(topic, payload);
    }
}
