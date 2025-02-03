package org.shopping.orderservice.web;

import org.shopping.orderservice.domain.ApplicationProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.UUID;


@RestController
public class kafkaController {
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final ApplicationProperties applicationProperties;

    public kafkaController(KafkaTemplate<String, Object> kafkaTemplate, ApplicationProperties applicationProperties) {
        this.kafkaTemplate = kafkaTemplate;
        this.applicationProperties = applicationProperties;
    }

    @PostMapping("/send")
    public ResponseEntity<String> createOrder(@RequestBody MyMessage message) {
        String uniqueKey = UUID.randomUUID().toString();
        System.out.println(uniqueKey);
        MyPayload payloadWithTimestamp = new MyPayload(message.payload().content(), message.payload().timestamp());
        MyMessage messageWithTimestamp = new MyMessage(message.routingKey(), payloadWithTimestamp);
        kafkaTemplate.send(applicationProperties.newOrdersTopic(), uniqueKey, messageWithTimestamp.payload());
        return ResponseEntity.ok("Order sent to kafka");
    }
}

record MyMessage(String routingKey, MyPayload payload) {
}

record MyPayload(String content, String timestamp) {
}
