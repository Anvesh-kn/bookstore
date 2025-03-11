import {useRef, useState} from "react";
import Customer from "../../domain/Customer.ts";
import * as React from "react";
import DeliveryAddress from "../../domain/DeliveryAddress.ts";
import BaseCutomer from "../../domain/BaseCutomer.ts";

const initialFormData = {
    customer: {name: "Anvesh", email: "knanvesh.01@gmail.com", phone: "4752341212"},
    deliveryAddress: {
        addressLine1: "8100 bluffstone cov",
        addressLine2: "1203",
        city: "austin",
        state: "TX",
        zipCode: "78672",
        country: "USA"
    },
}
const sampleCustomer: Customer = new Customer(initialFormData.customer.name,
    initialFormData.customer.email,
    initialFormData.customer.phone,
    initialFormData.deliveryAddress.addressLine1,
    initialFormData.deliveryAddress.addressLine2,
    initialFormData.deliveryAddress.city,
    initialFormData.deliveryAddress.state,
    initialFormData.deliveryAddress.zipCode,
    initialFormData.deliveryAddress.country);

interface cartFormProps {
    handleFormSubmit: (customer:BaseCutomer,address:DeliveryAddress) => void;
}

function CartFormComponent(props: cartFormProps) {
    const [formData, setFormData] = useState({
        customer: {
            name: sampleCustomer.name, email: sampleCustomer.email,
            phone: sampleCustomer.phone
        },
        deliveryAddress: {
            addressLine1: sampleCustomer.addressLine1,
            addressLine2: sampleCustomer.addressLine2,
            city: sampleCustomer.city,
            state: sampleCustomer.state,
            zipCode: sampleCustomer.zipCode,
            country: sampleCustomer.country
        },
    });

    const inputClass = "w-full p-2 border border-indigo-300 rounded-lg text-gray-700" +
        "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" +
        "bg-white shadow-sm";
    const labelClass = "block text-indigo-700 font-medium mb-1 text-sm";

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const [section, field] = name.split("."); // e.g., "customer.name" → ["customer", "name"]

        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section as keyof typeof prev],
                [field]: value,
            },
        }));

    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { customer, deliveryAddress } = formData;
        props.handleFormSubmit(customer,deliveryAddress);
        console.log("Form submitted:", formData.deliveryAddress);
    };

    console.log("Cart component loaded")


    const customer: React.RefObject<Customer> = useRef(sampleCustomer)

    return (
        <div className="bg-white p-6 rounded-lg shadow border border-indigo-100">
            <h4 className="text-xl font-bold text-indigo-800 mb-6">Delivery Information</h4>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <h5 className="font-semibold text-indigo-600 pb-2 border-b border-indigo-100">Customer
                            Details</h5>
                        <div>
                            <label className={labelClass}>Name</label>
                            <input type="text" className={inputClass}
                                   defaultValue={customer.current.name}
                                   name="customer.name"
                                   placeholder="Full Name" onChange={handleFormChange}/>
                        </div>
                        <div>
                            <label className={labelClass}>Email</label>
                            <input type="email" className={inputClass}
                                   name="customer.email"
                                   defaultValue={formData.customer.email}
                                   placeholder="email@example.com" onChange={handleFormChange}/>
                        </div>
                        <div>
                            <label className={labelClass}>Phone</label>
                            <input type="text" className={inputClass}
                                   name="customer.phone"
                                   defaultValue={formData.customer.phone}
                                   placeholder="(123) 456-7890" onChange={handleFormChange}/>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h5 className="font-semibold text-indigo-600 pb-2 border-b border-indigo-100">Delivery
                            Address</h5>
                        <div>
                            <label className={labelClass}>Address Line 1</label>
                            <input type="text" className={inputClass}
                                   name="deliveryAddress.addressLine1"
                                   value={formData.deliveryAddress.addressLine1}
                                   placeholder="Street address" onChange={handleFormChange}/>
                        </div>
                        <div>
                            <label className={labelClass}>Address Line 2 (Optional)</label>
                            <input type="text" className={inputClass}
                                   name="deliveryAddress.addressLine2"
                                   value={formData.deliveryAddress.addressLine2}
                                   placeholder="Apartment, suite, etc." onChange={handleFormChange}/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>City</label>
                                <input type="text" className={inputClass}
                                       name="deliveryAddress.city"
                                       value={formData.deliveryAddress.city}
                                       onChange={handleFormChange}/>
                            </div>
                            <div>
                                <label className={labelClass}>State/Province</label>
                                <input type="text" className={inputClass} value={formData.deliveryAddress.state}
                                       name="deliveryAddress.state"
                                       onChange={handleFormChange}/>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Zip/Postal Code</label>
                                <input type="text" className={inputClass}
                                       value={formData.deliveryAddress.zipCode}
                                       name="deliveryAddress.zipCode"
                                       onChange={handleFormChange}/>

                            </div>
                            <div>
                                <label className={labelClass}>Country</label>
                                <input type="text" className={inputClass}
                                       value={formData.deliveryAddress.country}
                                       name="deliveryAddress.country"
                                       onChange={handleFormChange}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-center">
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg
                                 shadow-md hover:shadow-lg transition-all duration-200 flex items-center">
                        <span>Place Order</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CartFormComponent;