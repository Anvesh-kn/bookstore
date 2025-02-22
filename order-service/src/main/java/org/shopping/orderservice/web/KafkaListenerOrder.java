/*package org.shopping.orderservice.web;


@Service
public class KafkaListenerOrder {

    @KafkaListener(topics = "${orders.new-orders-topic}", groupId = "order-service")
    public void listenNewOrder(MyPayload message) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy, HH:mm:ss.SSS");
        LocalDateTime receivedTimestamp = LocalDateTime.parse(message.timestamp(), formatter);
        LocalDateTime currentTimestamp = LocalDateTime.now();

        Duration duration = Duration.between(receivedTimestamp, currentTimestamp);
        long differenceInMillis = duration.toMillis();
        System.out.println("Difference in milliseconds: " + differenceInMillis);
    }
}*/
