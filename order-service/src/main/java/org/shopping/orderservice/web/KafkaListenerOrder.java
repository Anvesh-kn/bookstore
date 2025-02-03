package org.shopping.orderservice.web;

import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class KafkaListenerOrder {


    @KafkaListener(topics = "${orders.new-orders-topic}", groupId = "order-service")
    public void listenNewOrder(MyPayload message) {
/*
        System.out.println("Received message: " + message);
        System.out.println("Received timestamp: " + message.timestamp());
*/

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy, HH:mm:ss.SSS");
        LocalDateTime receivedTimestamp = LocalDateTime.parse(message.timestamp(), formatter);
        LocalDateTime currentTimestamp = LocalDateTime.now();

        Duration duration = Duration.between(receivedTimestamp, currentTimestamp);
        long differenceInMillis = duration.toMillis();
        System.out.println("Difference in milliseconds: " + differenceInMillis);

    }


}
