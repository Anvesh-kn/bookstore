class CartItem {
    description: string;
    code: string
    price: number;
    quantity: number ;

    constructor(title: string, id: string,  price: number, quantity: number) {
        this.description = title;
        this.code = id;
        this.price = price;
        this.quantity = quantity;

    }
}

export default CartItem;