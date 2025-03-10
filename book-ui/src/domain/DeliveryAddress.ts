class DeliveryAddress {
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string;
    zipCode: string;
    country: string;

    constructor(
        addressLine1: string,
        addressLine2: string | null,
        city: string,
        state: string,
        zipCode: string,
        country: string
    ) {
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.country = country;
    }
}

export default DeliveryAddress;