import {useState} from "react";

function CartFormComponent() {
    const [formData] = useState({
        customer: {name: "", email: "", phone: ""},
        deliveryAddress: {addressLine1: "", addressLine2: "", city: "", state: "", zipCode: "", country: ""},
    });


    const inputClass = " p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ";
    const labelClass = "block text-gray-700 font-medium";
    const gridClass = "grid grid-cols-2 justify-center gap-2";
    const gridDivClass = "grid ";
    return (
        <div className="max-w-4xl mx-auto p-2">
            <form className="grid grid-row gap-4">
                <div className={gridClass}>
                    <div className={gridDivClass}>
                        <label className={labelClass}>Customer Name</label>
                        <input type="text" className={inputClass} value={formData.customer.name}/>
                    </div>
                    <div className={gridDivClass}>
                        <label className={labelClass}>Customer Email</label>
                        <input type="email" className={inputClass} value={formData.customer.email}/>
                    </div>
                    <div className={gridDivClass}>
                        <label className={labelClass}>Customer Phone</label>
                        <input type="text" className={inputClass} value={formData.customer.phone}/>
                    </div>
                    <div className={gridDivClass}>
                        <label className={labelClass}>Delivery Address Line 1</label>
                        <input type="text" className={inputClass} value={formData.deliveryAddress.addressLine1}/>
                    </div>
                    <div className={gridDivClass}>
                        <label className={labelClass}>Delivery Address Line 2</label>
                        <input type="text" className={inputClass} value={formData.deliveryAddress.addressLine2}/>
                    </div>
                    <div className={gridDivClass}>
                        <label className={labelClass}>Delivery Address City</label>
                        <input type="text" className={inputClass} value={formData.deliveryAddress.city}/>
                    </div>
                    <div className={gridDivClass}>
                        <label className={labelClass}>Delivery Address State</label>
                        <input type="text" className={inputClass} value={formData.deliveryAddress.state}/>
                    </div>
                    <div className={gridDivClass}>
                        <label className={labelClass}>Delivery Address ZipCode</label>
                        <input type="text" className={inputClass} value={formData.deliveryAddress.zipCode}/>
                    </div>
                    <div className={gridDivClass}>
                        <label className={labelClass}>Delivery Address Country</label>
                        <input type="text" className={inputClass} value={formData.deliveryAddress.country}/>
                    </div>
                </div>
                <div className="flex justify-center  p-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Place Order</button>
                </div>
            </form>
        </div>
    );
}

export default CartFormComponent;