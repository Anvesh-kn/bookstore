class Book {
    code: string;
    description: string;
    imageUrl: string;
    name: string;
    price: number;

    constructor(code: string, description: string, imageUrl: string, name: string, price: number) {
        this.code = code;
        this.description = description;
        this.imageUrl = imageUrl;
        this.name = name;
        this.price = price;
    }
}

/*
interface Book {
    code: string;
    description: string;
    imageUrl: string;
    name: string;
    price: number;
}
*/

export default Book