package org.shopping.orderservice.domain;

import java.util.List;
import java.util.Optional;
import org.shopping.orderservice.domain.models.OrderStatus;
import org.shopping.orderservice.domain.models.OrderSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findByStatus(OrderStatus orderStatus);

    default void updateOrderStatus(String orderNumber, OrderStatus orderStatus) {
        OrderEntity orderEntity = findByOrderNumber(orderNumber);
        orderEntity.setStatus(orderStatus);
        save(orderEntity);
    }

    OrderEntity findByOrderNumber(String orderNumber);

    @Query("SELECT new org.shopping.orderservice.domain.models.OrderSummary(o.orderNumber, o.status)"
            + " FROM OrderEntity o WHERE o.userName = :userName")
    List<OrderSummary> findByUserName(String userName);

    @Query("select distinct o\n" + "        from OrderEntity o left join fetch o.items\n"
            + "        where o.userName = :userName and o.orderNumber = :orderNumber ")
    Optional<OrderEntity> findByUserNameAndOrderNumber(String userName, String orderNumber);
}
