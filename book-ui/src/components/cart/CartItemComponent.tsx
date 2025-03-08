import CartItem from "../../domain/CartItem.ts";

function cartItemComponent(props: { cartItem: CartItem }) {
    const cartItem = props.cartItem;

    function updateQuantity(id: string, quantity: number) {
        console.log(`Updating quantity for item: ${id} to ${quantity}`);
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
                        min="0"
                        value={cartItem.quantity}
                        onChange={(e) => updateQuantity(cartItem.id, parseInt(e.target.value))}
                    />
                </div>
            </td>
            <td className="py-4 px-4 text-right font-medium">${(cartItem.price * cartItem.quantity).toFixed(2)}</td>
        </tr>
    );
}

export default cartItemComponent;