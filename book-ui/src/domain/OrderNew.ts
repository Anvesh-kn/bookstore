
import DeliveryAddress from "./DeliveryAddress.ts";
import BaseCutomer from "./BaseCutomer.ts";
import CartItem from "./CartItem.ts";


class OrderNew {
    customer: BaseCutomer;
    deliveryAddress: DeliveryAddress;
    items: CartItem[];
    constructor(
        items: CartItem[],
        customer: BaseCutomer,
        deliveryAddress: DeliveryAddress,
    ) {
        this.items = items;
        this.customer = customer;
        this.deliveryAddress = deliveryAddress;
    }
}

export default OrderNew;