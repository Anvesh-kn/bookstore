import CartItem from "../../domain/CartItem.ts";
import CartItemComponent from "./CartItemComponent.tsx";
import CartFormComponent from "./CartFormComponent.tsx";

function CartComponent() {
    const cartItems: Array<CartItem> = [
        {id: "1", title: "Book1", price: 10, quantity: 1},
        {id: "2", title: "Book2", price: 20, quantity: 1},
        {id: "3", title: "Book3", price: 30, quantity: 1},
    ];
    const cartComponentItems = cartItems.map((cartItem) => {
        return (<CartItemComponent key={cartItem.id} cartItem={cartItem}></CartItemComponent>);
    });
    return (
        <div className="relative   sm:rounded-lg size-400 mx-[150px]">
            <h3 className="font-bold underline">Shopping Cart</h3>
            <div>
                <table className="table-auto size-full text-gray-500 dark:text-gray-400">
                    <thead className="text-gray-700 uppercase ">
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartComponentItems}
                    </tbody>
                    <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Total Amount: ${3}</th>
                    </tr>
                    </tfoot>
                </table>

            </div>
            <CartFormComponent/>
        </div>
    );
}

export default CartComponent