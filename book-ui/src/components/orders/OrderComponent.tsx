import Order from "../../domain/Order.ts";
import OrderItemsTableComponent from "./OrderItemsTableComponent.tsx";


function OrderComponent() {
    const orders: Array<Order> = [
        {id: "550e8400-e29b-41d4-a716-446655440000", price: 100},
        {id: "550e8400-e29b-41d4-a716-4466554400002", price: 200},
        {id: "550e8400-e29b-41d4-a716-4466554400002", price: 300},
    ];

    const orderItems = [
        {product: "Widget A", quantity: 2, price: 25.00},
        {product: "Widget B", quantity: 1, price: 70.00}
    ];

    function handleOrderClick(id: string) {
        console.log(`Order clicked: ${id}`);
    }
    const selectedOrderId:string="550e8400-e29b-41d4-a716-446655440000"

    const orderList = orders.map((order) => (
        <li
            key={order.id}
            className={`p-3 bg-blue-100 rounded cursor-pointer hover:bg-blue-300 ${
                selectedOrderId === order.id ? 'bg-blue-300 border-l-4 border-blue-600' : ''
            }`}
            onClick={() => handleOrderClick(order.id)} // Add this function to handle clicks
        >
            Order # {order.id || 'N/A'} - ${order.price?.toFixed(2) || '0.00'}
        </li>
    ))


    return (
        <div className="bg-gray-50 flex h-screen">
            {/* Order List Section - Takes 1/3 of the width */}
            <div className="bg-blue-200 w-1/3 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4 text-blue-800">Orders</h2>
                <ul className="space-y-2">
                    {orderList}
                </ul>
            </div>

            {/* Order Details Section - Takes 2/3 of the width */}
            <div className="bg-blue-600 w-2/3 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4 text-white">Order Details</h2>
                <div className="bg-white p-4 rounded shadow-lg">
                    <h3 className="text-lg font-semibold text-blue-700">Order #1234</h3>
                    <p className="mt-2"><strong>Date:</strong> March 7, 2025</p>
                    <p className="mt-1"><strong>Customer:</strong> John Doe</p>
                    <p className="mt-1"><strong>Status:</strong> Shipped</p>

                    <OrderItemsTableComponent items={orderItems}></OrderItemsTableComponent>
                </div>
            </div>
        </div>
    );
}

export default OrderComponent;