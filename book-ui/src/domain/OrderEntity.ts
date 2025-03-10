import Customer from "./Customer.ts";
import Book from "./Books.ts";
import DeliveryAddress from "./DeliveryAddress.ts";


class OrderEntity {
    orderNumber: string;
    user: string;
    items: Book[];
    customer: Customer;
    deliveryAddress: DeliveryAddress;
    status: string;
    comments: string | null;
    createdAt: string;
    totalAmount: number;

    constructor(
        orderNumber: string,
        user: string,
        items: Book[],
        customer: Customer,
        deliveryAddress: DeliveryAddress,
        status: string,
        comments: string | null,
        createdAt: string,
        totalAmount: number
    ) {
        this.orderNumber = orderNumber;
        this.user = user;
        this.items = items;
        this.customer = customer;
        this.deliveryAddress = deliveryAddress;
        this.status = status;
        this.comments = comments;
        this.createdAt = createdAt;
        this.totalAmount = totalAmount;
    }
}

export default OrderEntity;