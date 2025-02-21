package org.shopping.orderservice.domain;

import java.util.List;
import org.shopping.orderservice.domain.models.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findByStatus(OrderStatus orderStatus);

    default void updateOrderStatus(String orderNumber, OrderStatus orderStatus) {
        OrderEntity orderEntity = findByOrderNumber(orderNumber);
        orderEntity.setStatus(orderStatus);
        save(orderEntity);
    }

    OrderEntity findByOrderNumber(String orderNumber);
}
