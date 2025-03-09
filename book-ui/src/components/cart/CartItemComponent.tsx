import CartItem from "../../domain/CartItem.ts";
import {useState} from "react";

interface CartItemProps {
    cartItem: CartItem;
    updateQuantityParent: (id: string, newQuantity: number) => void;
}

function CartItemComponent(props: CartItemProps) {
    const [quantity, setQuantity] = useState(props.cartItem.quantity);
    const cartItem = props.cartItem;


    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(e.target.value));
        props.updateQuantityParent(cartItem.id, parseInt(e.target.value));
    }

    return (
        <tr className="hover:bg-blue-50 transition-colors duration-150" key={cartItem.id}>
            <td className="py-4 px-4 text-left font-medium text-indigo-700">{cartItem.title}</td>
            <td className="py-4 px-4 text-center">${cartItem.price.toFixed(2)}</td>
            <td className="py-4 px-4">
                <div className="flex justify-center">
                    <input
                        className="w-16 text-center border border-indigo-300 rounded-lg
                                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                bg-white p-1.5 shadow-sm"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </div>
            </td>
            <td className="py-4 px-4 text-right font-medium">${(cartItem.price * quantity).toFixed(2)}</td>
        </tr>
    );
}

export default CartItemComponent;