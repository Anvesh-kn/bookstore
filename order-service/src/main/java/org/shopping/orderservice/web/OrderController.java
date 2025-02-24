package org.shopping.orderservice.web;

import jakarta.validation.Valid;
import org.shopping.orderservice.domain.OrderService;
import org.shopping.orderservice.domain.SecurityService;
import org.shopping.orderservice.domain.models.CreateOrderRequest;
import org.shopping.orderservice.domain.models.CreateOrderResponse;
import org.shopping.orderservice.domain.models.OrderDto;
import org.shopping.orderservice.domain.models.OrderSummary;
import org.shopping.orderservice.exception.OrderNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
class OrderController {

    private static final Logger log = LoggerFactory.getLogger(OrderController.class);

    private final OrderService orderService;
    private final SecurityService securityService;

    OrderController(OrderService orderService, SecurityService securityService) {
        this.orderService = orderService;
        this.securityService = securityService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    CreateOrderResponse createOrder(@Valid @RequestBody CreateOrderRequest request) {
        String userName = securityService.getLoginUserName();
        log.info("Creating order for user: {}", userName);
        return orderService.createOrder(userName, request);
    }

    @GetMapping()
    public List<OrderSummary> getOrders() {
        String userName = securityService.getLoginUserName();
        log.info("Getting orders for user={}", userName);
        return orderService.findOrders(userName);
    }

    @GetMapping(value = "/{orderNumber}")
    public OrderDto getOrder(@PathVariable(value = "orderNumber") String orderNumber) {
        String userName = securityService.getLoginUserName();
        log.info("Getting order by id={}", orderNumber);
        return orderService
                .findUserOrder(userName, orderNumber)
                .orElseThrow(() -> new OrderNotFoundException(orderNumber));
    }
}
