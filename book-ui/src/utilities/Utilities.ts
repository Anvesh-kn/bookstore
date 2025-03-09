import Book from "../domain/Books.ts";
import CartItem from "../domain/CartItem.ts";

const mapToBooks = (data: any[]): Book[] => {

    return data.map(
        (item) =>
            new Book(
                item.code,
                item.description,
                item.imageUrl,
                item.name,
                item.price
            )
    );
};

const mapBookToCart = (book: Book): CartItem => {
    return new CartItem(book.name, book.code, book.price, 1);
}

export {mapToBooks, mapBookToCart};