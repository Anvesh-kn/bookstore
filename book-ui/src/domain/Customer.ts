class Customer{

    name: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;

    constructor(name: string, email: string, phone: string, addressLine1: string, addressLine2: string, city: string, state: string, zipCode: string, country: string) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.country = country;
    }

    toString() {
        return `Customer: ${this.name} (${this.email})`;
    }
}

export default Customer;