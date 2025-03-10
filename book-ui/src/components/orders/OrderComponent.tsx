import { useEffect, useState } from "react";
import axios from "axios";
import Order from "../../domain/Order.ts";
import OrderEntity from "../../domain/OrderEntity.ts";
import Book from "../../domain/Books.ts";
import OrderItemsTableComponent from "./OrderItemsTableComponent.tsx";
import urlConfig from "../../properties.ts";

function OrderComponent() {
    // Sample data for fallback and initial state
    const ordersSample: Array<Order> = [
        { orderNumber: "550e8400-e29b-41d4-a716-446655440000", status: "Delivered" },
        { orderNumber: "550e8400-e29b-41d4-a716-4466554400002", status: "Delivered" },
        { orderNumber: "550e8400-e29b-41d4-a716-4466554400003", status: "Shipped" },
    ];

    const orderDetailsSample = new OrderEntity(
        "550e8400-e29b-41d4-a716-446655440000",
        "user",
        [new Book("1234", "Book 1", "Author 1", "Description 1", 10.99)],
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
        {
            addressLine1: "123 Main St",
            addressLine2: "",
            city: "Springfield",
            state: "IL",
            zipCode: "62701",
            country: "USA"
        },
        "Shipped",
        "Comments",
        "2025-03-07",
        10.99
    );

    // State declarations with more descriptive names
    const [ordersList, setOrdersList] = useState<Array<Order>>(ordersSample);
    const [selectedOrderId, setSelectedOrderId] = useState<string>("");
    const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderEntity | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all orders on component mount
    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(urlConfig.endpoints.getOrdersList());
                setOrdersList(response.data);
            } catch (err: any) {
                console.error("Error fetching orders:", err);
                setError("Failed to load orders. Please try again later.");
                // Keep the sample data as fallback
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Fetch order details only when an order is selected
    useEffect(() => {
        if (!selectedOrderId) return;

        const fetchOrderDetails = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(urlConfig.endpoints.getOrderById(selectedOrderId));
                setSelectedOrderDetails(response.data);
            } catch (err: any) {
                console.error("Error fetching order details:", err);
                setError("Failed to load order details. Please try again later.");
                setSelectedOrderDetails(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, [selectedOrderId]);

    // Handler for order selection
    const handleOrderSelection = (id: string) => {
        console.log(`Order selected: ${id}`);
        setSelectedOrderId(id);
    };

    // Render order list items
    const renderOrderList = () => {
        return ordersList.map((order) => (
            <li
                key={order.orderNumber}
                className={`p-3 rounded cursor-pointer hover:bg-blue-300 ${
                    selectedOrderId === order.orderNumber ? 'bg-blue-300 border-l-4 border-blue-600' : 'bg-blue-100'
                }`}
                onClick={() => handleOrderSelection(order.orderNumber)}
            >
                Order # {order.orderNumber || 'N/A'} - {order.status || 'Unknown'}
            </li>
        ));
    };

    // Display loading state or error messages
    const renderOrderDetails = () => {
        if (isLoading) {
            return <div className="text-center p-4">Loading...</div>;
        }

        if (error) {
            return <div className="text-red-500 p-4">{error}</div>;
        }

        // Use selected order details or fall back to sample
        const orderToDisplay = selectedOrderDetails ||
            (selectedOrderId ? orderDetailsSample : null);

        if (!orderToDisplay) {
            return <div className="text-gray-500 p-4">Select an order to view details</div>;
        }

        return (
            <div className="bg-white p-4 rounded shadow-lg">
                <h3 className="text-lg font-semibold text-blue-700">
                    Order #{orderToDisplay.orderNumber.substring(0, 8)}
                </h3>
                <p className="mt-2"><strong>Date:</strong> {orderToDisplay.createdAt}</p>
                <p className="mt-1"><strong>Customer:</strong> {orderToDisplay.customer.name || 'N/A'}</p>
                <p className="mt-1"><strong>Status:</strong> {orderToDisplay.status}</p>

                <OrderItemsTableComponent order={orderToDisplay} />
            </div>
        );
    };

    return (
        <div className="bg-gray-50 flex h-screen">
            {/* Order List Section - Takes 1/3 of the width */}
            <div className="bg-blue-200 w-1/3 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4 text-blue-800">Orders</h2>
                {isLoading && !ordersList.length ? (
                    <div className="text-center p-4">Loading orders...</div>
                ) : (
                    <ul className="space-y-2">
                        {renderOrderList()}
                    </ul>
                )}
            </div>

            {/* Order Details Section - Takes 2/3 of the width */}
            <div className="bg-blue-600 w-2/3 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4 text-white">Order Details</h2>
                {renderOrderDetails()}
            </div>
        </div>
    );
}

export default OrderComponent;