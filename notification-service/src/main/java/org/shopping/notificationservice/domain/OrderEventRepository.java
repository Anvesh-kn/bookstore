package org.shopping.notificationservice.domain;

import org.shopping.notificationservice.domain.models.OrderEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderEventRepository extends JpaRepository<OrderEventEntity, Long> {
    boolean existsByEventId(String eventId);
}
