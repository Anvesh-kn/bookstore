package org.shopping.orderservice.jobs;

import java.time.Instant;
import java.util.concurrent.TimeUnit;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.shopping.orderservice.domain.OrderEventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OrderEventsPublishingJob {
    private static final Logger LOGGER = LoggerFactory.getLogger(OrderEventsPublishingJob.class);
    private static final String LOCK_NAME = "orderEvents-processing-lock";
    private final RedissonClient redissonClient;

    private final OrderEventService orderEventService;

    public OrderEventsPublishingJob(RedissonClient redissonClient, OrderEventService orderEventService) {
        this.redissonClient = redissonClient;
        this.orderEventService = orderEventService;
    }

    @Scheduled(cron = "${orders.publish-order-events-job-cron}")
    public void publishOrderEvents() {

        RLock lock = redissonClient.getLock(LOCK_NAME);
        boolean acquired = false;
        try {
            // Try acquiring the lock for 5 seconds, with a lease time of 30 seconds
            acquired = lock.tryLock(5, 30, TimeUnit.SECONDS);
            if (acquired) {
                LOGGER.info("Publishing order events {}", Instant.now());
                orderEventService.publishOrderEvents();
            } else {
                LOGGER.info("Could not acquire lock, another instance is already processing.");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            LOGGER.error("Error while trying to acquire lock", e);
        } finally {
            if (acquired && lock.isHeldByCurrentThread()) {
                try {
                    Thread.sleep(20000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                lock.unlock();
                LOGGER.info("Lock released.");
            }
        }
    }
}
