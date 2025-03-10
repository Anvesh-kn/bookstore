import CartItemComponent from "./CartItemComponent.tsx";
import CartFormComponent from "./CartFormComponent.tsx";
import {useCallback, useEffect, useMemo, useState} from "react";

function CartComponent() {
    const [cartItems, setCartItems] = useState([
        {code: "1", description: "Book1", price: 10, quantity: 1},
        {code: "2", description: "Book2", price: 20, quantity: 1},
        {code: "3", description: "Book3", price: 30, quantity: 1},
    ]);

    useEffect(() => {
        getCartItemFromLocalStorage()
    }, []);

    const getCartItemFromLocalStorage = () => {
        const cartItems = localStorage.getItem("cart");
        if (cartItems) {
            setCartItems(JSON.parse(cartItems));
        }
    }

    const updateQuantity = useCallback((id: string, quantity: number) => {

        setCartItems((prev) => {
            const updatedCartItems = prev.map((item) =>
                item.code === id ? {...item, quantity} : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });
    }, []);

    const totalAmount = useMemo(() =>
            cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [cartItems]);

    const cartComponentItems = cartItems.map((cartItem) => {
        return (<CartItemComponent key={cartItem.code} cartItem={cartItem}
                                   updateQuantityParent={updateQuantity}></CartItemComponent>);
    });
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-lg max-w-5xl mx-auto my-8">
            <h3 className="text-2xl font-bold text-indigo-800 mb-6 pb-2 border-b-2 border-indigo-200">Shopping Cart</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-gray-700 mb-8">
                    <thead className="bg-indigo-100 text-indigo-800 uppercase text-sm">
                    <tr>
                        <th className="py-3 px-4 rounded-tl-lg text-left">Product</th>
                        <th className="py-3 px-4 text-center">Price</th>
                        <th className="py-3 px-4 text-center">Qty</th>
                        <th className="py-3 px-4 rounded-tr-lg text-right">Subtotal</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-indigo-100">
                    {cartComponentItems}
                    </tbody>
                    <tfoot>
                    <tr className="bg-indigo-50">
                        <th colSpan={2} className="py-3 px-4"></th>
                        <th className="py-3 px-4 text-right font-bold text-indigo-800">Total:</th>
                        <th className="py-3 px-4 text-right font-bold text-indigo-800">${totalAmount.toFixed(2)}</th>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <CartFormComponent/>
        </div>
    );
}

export default CartComponent