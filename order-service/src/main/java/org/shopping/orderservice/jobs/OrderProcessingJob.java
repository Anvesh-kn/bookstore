package org.shopping.orderservice.jobs;

import java.time.Instant;
import org.shopping.orderservice.domain.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OrderProcessingJob {
    private static final Logger LOGGER = LoggerFactory.getLogger(OrderProcessingJob.class);

    private final OrderService orderService;

    public OrderProcessingJob(OrderService orderService) {
        this.orderService = orderService;
    }

    @Scheduled(cron = "${orders.publish-order-events-job-cron}")
    public void publishOrderEvents() {
        LOGGER.info("Publishing order events {}", Instant.now());
        orderService.processNewOrders();
    }
}
