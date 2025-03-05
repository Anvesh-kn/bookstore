import {Fragment} from "react";
import Books from "../../domain/Books";
import BooksCardComponent from "./BooksCardComponent.tsx";
import classes from "./BooksComponent.module.css";


function BooksComponent() {
    const book: Array<Books> = [new Books("title", "7", "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg", 2),
        new Books("title", "1", "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg", 2),
        new Books("title", "2", "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg", 2),
        new Books("title", "3", "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg", 2),
        new Books("title", "4", "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg", 2),
        new Books("title", "5", "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg", 2)
    ];

    const booksList = book.map((book) => {
        return (<BooksCardComponent key={book.id} book={book}></BooksCardComponent>)
    });

    return (
        <Fragment>
            <div className={classes.pagination}>
                <button>First</button>
                <button>Previous</button>
                <button>Next</button>
                <button>Last</button>
            </div>
            <div className={classes.body}>
                <div className={classes.grid}>
                    {booksList}
                </div>
            </div>
        </Fragment>
    );
}

export default BooksComponent;
