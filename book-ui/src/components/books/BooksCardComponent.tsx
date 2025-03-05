import Books from "../../domain/Books.ts";
import classes from "./BooksCardComponent.module.css";

function BooksCardComponent(props: { book:Books}) {

    const book: Books = props.book;

    return (
        <div className={classes.card}>
            <img src={book.imageUrl} alt={book.title} className={classes.image}/>
            <div className={classes.body}>
                <h2 className={classes.title}>{book.title}</h2>
                <p className={classes.price}>${book.price}</p>
            </div>
        </div>
    );
}

export default BooksCardComponent;