package org.shopping.notificationservice;


import jakarta.mail.internet.MimeMessage;
import org.shopping.notificationservice.domain.ApplicationProperties;

import org.shopping.notificationservice.domain.NotificationService;
import org.shopping.notificationservice.domain.OrderEventRepository;
import org.shopping.notificationservice.domain.models.OrderEventEntity;
import org.shopping.orderservice.domain.models.OrderCancelledEvent;
import org.shopping.orderservice.domain.models.OrderCreatedEvent;
import org.shopping.orderservice.domain.models.OrderDeliveredEvent;
import org.shopping.orderservice.domain.models.OrderErrorEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class OrderEventHandler {

    private static final Logger log = LoggerFactory.getLogger(OrderEventHandler.class);

    private final ApplicationProperties applicationProperties;
    private final NotificationService notificationService;
    private final OrderEventRepository orderEventRepository;

    public OrderEventHandler(ApplicationProperties applicationProperties, NotificationService notificationService, OrderEventRepository orderEventRepository) {
        this.applicationProperties = applicationProperties;
        this.notificationService = notificationService;
        this.orderEventRepository = orderEventRepository;
    }

    @KafkaListener(topics = "${notifications.new-orders-topic}", groupId = "order-service")
    void handleCreatedEvents(OrderCreatedEvent message) {
        if (orderEventRepository.existsByEventId(message.eventId())) {
            log.warn("Created Event already exists {}", message.eventId());
            return;
        }
        logEventProcessingTime(message.createdAt().toString(), "Created");
        notificationService.sendOrderCreatedNotification(message);
        OrderEventEntity orderEvent = new OrderEventEntity(message.eventId());
        orderEventRepository.save(orderEvent);
    }

    @KafkaListener(topics = "${notifications.delivered-orders-topic}", groupId = "order-service")
    void handleDeliveredEvents(OrderDeliveredEvent message) {
        if (orderEventRepository.existsByEventId(message.eventId())) {
            log.warn("Delivered Event already exists {}", message.eventId());
            return;
        }
        logEventProcessingTime(message.createdAt().toString(), "Delivered");
        notificationService.sendOrderDeliveredNotification(message);
        OrderEventEntity orderEvent = new OrderEventEntity(message.eventId());
        orderEventRepository.save(orderEvent);
    }

    @KafkaListener(topics = "${notifications.cancelled-orders-topic}", groupId = "order-service")
    void handleCancelledEvents(OrderCancelledEvent message) {
        if (orderEventRepository.existsByEventId(message.eventId())) {
            log.warn("Cancelled Event already exists {}", message.eventId());
            return;
        }
        logEventProcessingTime(message.createdAt().toString(), "Cancelled");
        notificationService.sendOrderCancelledNotification(message);
        OrderEventEntity orderEvent = new OrderEventEntity(message.eventId());
        orderEventRepository.save(orderEvent);
    }

    @KafkaListener(topics = "${notifications.error-orders-topic}", groupId = "order-service")
    void handleErrorEvents(OrderErrorEvent message) {
        if (orderEventRepository.existsByEventId(message.eventId())) {
            log.warn("Error Event already exists {}", message.eventId());
            return;
        }
        logEventProcessingTime(message.createdAt().toString(), "Error");
        notificationService.sendOrderErrorEventNotification(message);
        OrderEventEntity orderEvent = new OrderEventEntity(message.eventId());
        orderEventRepository.save(orderEvent);
    }

    private void logEventProcessingTime(String eventTimestamp, String eventType) {
        try {
            LocalDateTime receivedTimestamp = LocalDateTime.parse(eventTimestamp);
            LocalDateTime currentTimestamp = LocalDateTime.now();
            Duration duration = Duration.between(receivedTimestamp, currentTimestamp);
            log.info("{} event processing delay: {} seconds", eventType, duration.toSeconds());
        } catch (Exception e) {
            log.warn("Failed to calculate event processing time: {}", e.getMessage());
        }
    }


}
