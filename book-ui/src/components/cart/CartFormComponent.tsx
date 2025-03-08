import {useState} from "react";

function CartFormComponent() {
    const [formData] = useState({
        customer: {name: "", email: "", phone: ""},
        deliveryAddress: {addressLine1: "", addressLine2: "", city: "", state: "", zipCode: "", country: ""},
    });

    const inputClass = "w-full p-2 border border-indigo-300 rounded-lg text-gray-700"+
    "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"+
    "bg-white shadow-sm";
    const labelClass = "block text-indigo-700 font-medium mb-1 text-sm";
    return (
        <div className="bg-white p-6 rounded-lg shadow border border-indigo-100">
            <h4 className="text-xl font-bold text-indigo-800 mb-6">Delivery Information</h4>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <h5 className="font-semibold text-indigo-600 pb-2 border-b border-indigo-100">Customer Details</h5>
                        <div>
                            <label className={labelClass}>Name</label>
                            <input type="text" className={inputClass} value={formData.customer.name} placeholder="Full Name"/>
                        </div>
                        <div>
                            <label className={labelClass}>Email</label>
                            <input type="email" className={inputClass} value={formData.customer.email} placeholder="email@example.com"/>
                        </div>
                        <div>
                            <label className={labelClass}>Phone</label>
                            <input type="text" className={inputClass} value={formData.customer.phone} placeholder="(123) 456-7890"/>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h5 className="font-semibold text-indigo-600 pb-2 border-b border-indigo-100">Delivery Address</h5>
                        <div>
                            <label className={labelClass}>Address Line 1</label>
                            <input type="text" className={inputClass} value={formData.deliveryAddress.addressLine1} placeholder="Street address"/>
                        </div>
                        <div>
                            <label className={labelClass}>Address Line 2 (Optional)</label>
                            <input type="text" className={inputClass} value={formData.deliveryAddress.addressLine2} placeholder="Apartment, suite, etc."/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>City</label>
                                <input type="text" className={inputClass} value={formData.deliveryAddress.city}/>
                            </div>
                            <div>
                                <label className={labelClass}>State/Province</label>
                                <input type="text" className={inputClass} value={formData.deliveryAddress.state}/>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Zip/Postal Code</label>
                                <input type="text" className={inputClass} value={formData.deliveryAddress.zipCode}/>
                            </div>
                            <div>
                                <label className={labelClass}>Country</label>
                                <input type="text" className={inputClass} value={formData.deliveryAddress.country}/>
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CartFormComponent;