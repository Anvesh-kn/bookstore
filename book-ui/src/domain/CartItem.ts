class CartItem {
    name: string;
    code: string
    price: number;
    quantity: number ;

    constructor(title: string, id: string,  price: number, quantity: number) {
        this.name = title;
        this.code = id;
        this.price = price;
        this.quantity = quantity;

    }
}

export default CartItem;