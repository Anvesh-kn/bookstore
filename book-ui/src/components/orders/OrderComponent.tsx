import Order from "../../domain/Order.ts";
import OrderItemsTableComponent from "./OrderItemsTableComponent.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import urlConfig from "../../properties.ts";
import OrderEntity from "../../domain/OrderEntity.ts";
import Book from "../../domain/Books.ts";


function OrderComponent() {
    const ordersSample: Array<Order> = [
        {orderNumber: "550e8400-e29b-41d4-a716-446655440000", status: "Delivered"},
        {orderNumber: "550e8400-e29b-41d4-a716-4466554400002", status: "Delivered"},
        {orderNumber: "550e8400-e29b-41d4-a716-4466554400002", status: "Delivered"},
    ];

    const orderSample = new OrderEntity(
        "550e8400-e29b-41d4-a716-446655440000",
        "user",
        [new Book("1234", "Book 1", "Author 1","Description 1", 10.99)],
        {
            name: "John Doe",
            email: "",
            phone: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zipCode: "",
            country: ""
        },
        {addressLine1: "123 Main St", addressLine2:"", city: "Springfield", state: "IL", zipCode: "62701", country: "USA"},
        "Shipped",
        "Comments",
        "2025-03-07",
        10.99
    );

    const [orders, setOrderItems] = useState<Array<Order>>(ordersSample);
    const [selectedOrderId, setSelectedOrder] = useState<string>("");
    const [orderen, setOrder] = useState<OrderEntity | null>(orderSample);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(urlConfig.endpoints.getOrdersList());
                console.log("Orders fetched:", response.data);
                console.log(response)
                setOrderItems(response.data)
                setOrder(response.data)
                console.log()
                return
            } catch (err: any) {
                console.error("Error fetching orders:", err);
            }
        }

        fetchOrders();
    }, []);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(urlConfig.endpoints.getOrderById(selectedOrderId));
                console.log("Order fetched:", response.data);
                setOrder(response.data)
                return
            } catch (err: any) {
                console.error("Error fetching orders:", err);
            }
        }
        fetchOrderDetails();
    }, [selectedOrderId]);

    function handleOrderClick(id: string) {
        console.log(`Order clicked: ${id}`);
        setSelectedOrder(id)

    }

    const orderList = orders.map((order) => (
        <li
            key={order.orderNumber}
            className={`p-3 bg-blue-100 rounded cursor-pointer hover:bg-blue-300 ${
                selectedOrderId === order.orderNumber ? 'bg-blue-300 border-l-4 border-blue-600' : ''
            }`}
            onClick={() => handleOrderClick(order.orderNumber)} // Add this function to handle clicks
        >
            Order # {order.orderNumber || 'N/A'} - {order.status || 'Unknown'}
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

                    <OrderItemsTableComponent order={orderen ?? orderSample}></OrderItemsTableComponent>
                </div>
            </div>
        </div>
    );
}

export default OrderComponent;