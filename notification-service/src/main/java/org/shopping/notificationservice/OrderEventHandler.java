package org.shopping.notificationservice;


import jakarta.mail.internet.MimeMessage;
import org.shopping.notificationservice.domain.ApplicationProperties;

import org.shopping.notificationservice.domain.NotificationService;
import org.shopping.orderservice.domain.models.OrderCancelledEvent;
import org.shopping.orderservice.domain.models.OrderCreatedEvent;
import org.shopping.orderservice.domain.models.OrderDeliveredEvent;
import org.shopping.orderservice.domain.models.OrderErrorEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class OrderEventHandler {

    private final ApplicationProperties applicationProperties;
    private final NotificationService notificationService;

    public OrderEventHandler(ApplicationProperties applicationProperties, NotificationService notificationService) {
        this.applicationProperties = applicationProperties;
        this.notificationService = notificationService;
    }

    @KafkaListener(topics = "${notifications.new-orders-topic}", groupId = "order-service")
    void handleCreatedEvents(OrderCreatedEvent message) {
        LocalDateTime receivedTimestamp = LocalDateTime.parse(message.createdAt().toString()); // Directly parse
        LocalDateTime currentTimestamp = LocalDateTime.now();

        System.out.println("Received message: " + message);

        Duration duration = Duration.between(receivedTimestamp, currentTimestamp);
        long seconds = duration.toSeconds();

        System.out.println("Difference in milliseconds: " + seconds);
    }

    @KafkaListener(topics = "${notifications.delivered-orders-topic}", groupId = "order-service")
    void handleDeliveredEvents(OrderDeliveredEvent message) {
        LocalDateTime receivedTimestamp = LocalDateTime.parse(message.createdAt().toString()); // Directly parse
        LocalDateTime currentTimestamp = LocalDateTime.now();

        System.out.println("Received message: " + message);

        Duration duration = Duration.between(receivedTimestamp, currentTimestamp);
        long seconds = duration.toSeconds();

        System.out.println("Difference in milliseconds: " + seconds);
        notificationService.sendOrderDeliveredNotification(message);
    }

    @KafkaListener(topics = "${notifications.cancelled-orders-topic}", groupId = "order-service")
    void handleCancelledEvents(OrderCancelledEvent message) {
        LocalDateTime receivedTimestamp = LocalDateTime.parse(message.createdAt().toString()); // Directly parse
        LocalDateTime currentTimestamp = LocalDateTime.now();

        System.out.println("Received message: " + message);

        Duration duration = Duration.between(receivedTimestamp, currentTimestamp);
        long seconds = duration.toSeconds();

        System.out.println("Difference in milliseconds: " + seconds);
        notificationService.sendOrderCancelledNotification(message);
    }

    @KafkaListener(topics = "${notifications.error-orders-topic}", groupId = "order-service")
    void handleErrorEvents(OrderErrorEvent message) {
        LocalDateTime receivedTimestamp = LocalDateTime.parse(message.createdAt().toString()); // Directly parse
        LocalDateTime currentTimestamp = LocalDateTime.now();

        System.out.println("Received message: " + message);

        Duration duration = Duration.between(receivedTimestamp, currentTimestamp);
        long seconds = duration.toSeconds();

        System.out.println("Difference in milliseconds: " + seconds);
        notificationService.sendOrderErrorEventNotification(message);
    }





}
