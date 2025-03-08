import CartItem from "../../domain/CartItem.ts";
import styles from "./CartItemComponent.module.css";

function cartItemComponent(props: { cartItem: CartItem }) {
    const cartItem = props.cartItem;

    function updateQuantity(id: string, quantity: number) {
        console.log(`Updating quantity for item: ${id} to ${quantity}`);
    }

    return (
        <tr className={styles.cartTable} key={cartItem.id}>
            <td className="text-center">{cartItem.title}</td>
            <td className="text-center" >${cartItem.price}</td>
            <td className="flex justify-center items-center h-12">
                <input
                    className="  text-center border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 bg-sky-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    min="0"
                    value={cartItem.quantity}
                    onChange={(e) => updateQuantity(cartItem.id, parseInt(e.target.value))}
                />
            </td>
            <td className="text-center">${(cartItem.price * cartItem.quantity).toFixed(2)}</td>
        </tr>
    );
}

export default cartItemComponent;