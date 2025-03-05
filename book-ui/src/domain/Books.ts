class Books {
    title: string;
    id: string
    imageUrl: string;
    price: number;

    constructor(title: string, id: string, imageUrl: string, price: number) {
        this.title = title;
        this.id = id;
        this.imageUrl = imageUrl;
        this.price = price;

    }
}

export default Books;