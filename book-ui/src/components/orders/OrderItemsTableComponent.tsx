import OrderEntity from "../../domain/OrderEntity.ts";


type OrderDetailsProps = {
    order: OrderEntity;
};

function OrderItemsTableComponent(props: OrderDetailsProps) {
    const { order } = props;
    const { items, customer, deliveryAddress } = order;


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Order Header */}
            <div className="flex justify-between items-center border-b border-blue-100 pb-4 mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-blue-800">Order Details</h2>
                    <p className="text-gray-600">Order #{order.orderNumber}</p>
                </div>
                <div className="text-right">
                    <p className="text-gray-600">Date: {formatDate(order.createdAt)}</p>
                    <span className="px-3 py-1 inline-block rounded-full bg-green-100 text-green-800 font-medium">
                        {order.status}
                    </span>
                </div>
            </div>

            {/* Customer & Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h3 className="font-semibold text-blue-700 mb-2">Customer Information</h3>
                    <div className="bg-blue-50 p-4 rounded">
                        <p className="font-medium">{customer.name}</p>
                        <p>{customer.email}</p>
                        <p>{customer.phone}</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-blue-700 mb-2">Delivery Address</h3>
                    <div className="bg-blue-50 p-4 rounded">
                        <p>{deliveryAddress.addressLine1}</p>
                        {deliveryAddress.addressLine2 && <p>{deliveryAddress.addressLine2}</p>}
                        <p>{deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode}</p>
                        <p>{deliveryAddress.country}</p>
                    </div>
                </div>
            </div>

            {/* Order Items Table */}
            <div className="mt-4">
                <h3 className="font-semibold text-blue-700 mb-2">Order Items</h3>
                <table className="w-full mt-2">
                    <thead className="bg-blue-100">
                    <tr>
                        <th className="p-2 text-left text-blue-800">Product Code</th>
                        <th className="p-2 text-left text-blue-800">Product</th>
                        <th className="p-2 text-left text-blue-800">Quantity</th>
                        <th className="p-2 text-left text-blue-800">Price</th>
                        <th className="p-2 text-left text-blue-800">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index} className="border-b border-blue-100">
                            <td className="p-2">{item.code}</td>
                            <td className="p-2">{item.name}</td>
                            <td className="p-2">{item.quantity}</td>
                            <td className="p-2">${item.price.toFixed(2)}</td>
                            <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot className="bg-blue-50">
                    <tr>
                        <td className="p-2 font-bold text-blue-800" colSpan={4}>Total</td>
                        <td className="p-2 font-bold text-blue-800">${order.totalAmount.toFixed(2)}</td>
                    </tr>
                    </tfoot>
                </table>
            </div>

            {/* Comments Section (if any) */}
            {order.comments && (
                <div className="mt-6 p-4 bg-gray-50 rounded">
                    <h3 className="font-semibold text-blue-700 mb-2">Order Comments</h3>
                    <p className="text-gray-700">{order.comments}</p>
                </div>
            )}
        </div>
    );
}

export default OrderItemsTableComponent;