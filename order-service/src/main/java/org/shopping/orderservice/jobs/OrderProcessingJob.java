package org.shopping.orderservice.jobs;

import java.time.Instant;
import java.util.concurrent.TimeUnit;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.shopping.orderservice.domain.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OrderProcessingJob {
    private static final Logger LOGGER = LoggerFactory.getLogger(OrderProcessingJob.class);
    private static final String LOCK_NAME = "order-processing-lock";
    private final RedissonClient redissonClient;
    private final OrderService orderService;

    public OrderProcessingJob(RedissonClient redissonClient, OrderService orderService) {
        this.redissonClient = redissonClient;
        this.orderService = orderService;
    }

    @Scheduled(cron = "${orders.publish-order-events-job-cron}")
    public void publishOrderEvents() {
        RLock lock = redissonClient.getLock(LOCK_NAME);
        boolean acquired = false;
        try {
            // Try acquiring the lock for 5 seconds, with a lease time of 30 seconds
            acquired = lock.tryLock(5, 30, TimeUnit.SECONDS);
            if (acquired) {
                LOGGER.info("acquired lock {}", Instant.now());
                LOGGER.info("Publishing order events {}", Instant.now());
                orderService.processNewOrders();
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
                    lock.unlock();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                LOGGER.info("Lock released.");
            }
        }
    }
}
