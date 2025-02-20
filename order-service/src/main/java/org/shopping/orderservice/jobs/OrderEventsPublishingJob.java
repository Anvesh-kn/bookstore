package org.shopping.orderservice.jobs;

import java.time.Instant;
import org.shopping.orderservice.domain.OrderEventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OrderEventsPublishingJob {
    private static final Logger LOGGER = LoggerFactory.getLogger(OrderEventsPublishingJob.class);

    private final OrderEventService orderEventService;

    public OrderEventsPublishingJob(OrderEventService orderEventService) {
        this.orderEventService = orderEventService;
    }

    @Scheduled(cron = "${orders.publish-order-events-job-cron}")
    public void publishOrderEvents() {
        LOGGER.info("Publishing order events {}", Instant.now());
        orderEventService.publishOrderEvents();
    }
}
