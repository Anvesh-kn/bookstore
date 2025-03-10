class Order {
    orderNumber: string;
    status: string;

    constructor(id: string, status: string) {
        this.orderNumber = id;
        this.status = status;
    }
}

export default Order;