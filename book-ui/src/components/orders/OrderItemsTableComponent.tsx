type OrderItem = {
    product: string;
    quantity: number;
    price: number;
};

type OrderItemsTableProps = {
    items: OrderItem[];
};

function OrderItemsTable(props: OrderItemsTableProps) {
    // Calculate total price of all items
    const items: OrderItem[] = props.items;
    const totalPrice = items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    return (
        <div className="mt-4">
            <h4 className="font-semibold text-blue-700">Items</h4>
            <table className="w-full mt-2">
                <thead className="bg-blue-100">
                <tr>
                    <th className="p-2 text-left text-blue-800">Product</th>
                    <th className="p-2 text-left text-blue-800">Quantity</th>
                    <th className="p-2 text-left text-blue-800">Price</th>
                    <th className="p-2 text-left text-blue-800">Total</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index} className="border-b  border-blue-100">
                        <td className="p-2">{item.product}</td>
                        <td className="p-2">{item.quantity}</td>
                        <td className="p-2">${item.price.toFixed(2)}</td>
                        <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot className="bg-blue-50">
                <tr>
                    <td className="p-2 font-bold text-blue-800" colSpan={3}>Total</td>
                    <td className="p-2 font-bold text-blue-800">${totalPrice.toFixed(2)}</td>
                </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default OrderItemsTable;