import Books from "../../domain/Books.ts";
import classes from "./BooksCardComponent.module.css";

interface BooksCardComponentProps {
    book: Books;
    onAddToCartButtonClicked: (book: Books) => void;
}

function BooksCardComponent(props: BooksCardComponentProps) {

    const book: Books = props.book;

    const onAddToCartButtonClicked = () => {
        props.onAddToCartButtonClicked(book);
    }

    return (
        <div className={classes.card}>
            <img src={book.imageUrl} alt={book.description} className={classes.image}/>
            <div className={classes.bookCardBody}>
                <h2 className={classes.title}>{book.name}</h2>
                <p className={classes.price}>${book.price}</p>
            </div>
            <button className={classes.addToCartButton} onClick={onAddToCartButtonClicked}>Add to cart</button>
        </div>
    );
}

export default BooksCardComponent;