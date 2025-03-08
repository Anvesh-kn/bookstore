class CartItem {
    title: string;
    id: string
    price: number;
    quantity: number ;

    constructor(title: string, id: string,  price: number, quantity: number) {
        this.title = title;
        this.id = id;
        this.price = price;
        this.quantity = quantity;

    }
}

export default CartItem;