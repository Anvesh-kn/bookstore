import { Fragment, useEffect, useState } from "react";
import Books from "../../domain/Books";
import BooksCardComponent from "./BooksCardComponent.tsx";
import classes from "./BooksComponent.module.css";
import axios from "axios";
import urlConfig from "../../properties.ts";
import { mapBookToCart, mapToBooks } from "../../utilities/Utilities.ts";
import CartItem from "../../domain/CartItem";

function BooksComponent() {
    const [books, setBooks] = useState<Array<Books>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5; // Number of items per page

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(urlConfig.endpoints.getProducts(limit, page));
                setBooks(mapToBooks(response.data.data));
                setIsLastPage(response.data.isLast);
                setTotalPages(response.data.totalPages || 1); // Add total pages if available in API
            } catch (err: any) {
                setError(err.message);
                console.error("Error fetching books:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [page, limit]);

    const onAddToCartButtonClicked = (book: Books) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const item: CartItem = mapBookToCart(book);
        const existingItem = cart.find((cartItem: CartItem) => cartItem.code === item.code);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Add feedback animation/notification here
        const notification = document.createElement('div');
        notification.textContent = `${book.name} added to cart!`;
        notification.className = 'fixed top-5 right-5 bg-green-500 text-white p-3 rounded-lg shadow-lg z-50';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    };

    const booksList = books.map((book) => (
        <BooksCardComponent
            key={book.code}
            book={book}
            onAddToCartButtonClicked={() => onAddToCartButtonClicked(book)}
        />
    ));

    if (loading) return (
        <div className={classes.loadingState}>
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-blue-200 mb-4"></div>
                <div className="h-4 w-32 bg-blue-200 rounded"></div>
            </div>
            <p className="mt-4">Loading your books...</p>
        </div>
    );

    if (error) return (
        <div className={classes.errorState}>
            <p>Oops! Something went wrong</p>
            <p className="text-sm mt-2">{error}</p>
            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => window.location.reload()}
            >
                Try Again
            </button>
        </div>
    );

    return (
        <Fragment>
            <div className={classes.pagination}>
                <button
                    className={page === 1 ? classes.disabledButton : ""}
                    disabled={page === 1}
                    onClick={() => setPage(1)}
                >
                    ⏮ First
                </button>
                <button
                    className={page === 1 ? classes.disabledButton : ""}
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    ◀ Previous
                </button>

                <span className={classes.pageIndicator}>
                    Page {page} of {totalPages || '?'}
                </span>

                <button
                    className={isLastPage ? classes.disabledButton : ""}
                    disabled={isLastPage}
                    onClick={() => setPage(page + 1)}
                >
                    Next ▶
                </button>
                <button
                    className={isLastPage ? classes.disabledButton : ""}
                    disabled={isLastPage}
                    onClick={() => setPage(totalPages)}
                >
                    Last ⏭
                </button>
            </div>

            {books.length === 0 && !loading ? (
                <div className="text-center py-16 text-gray-500">
                    <p className="text-2xl mb-4">No books found</p>
                    <p>Try adjusting your search or check back later for new additions</p>
                </div>
            ) : (
                <div className={classes.body}>
                    <div className={classes.grid}>
                        {booksList}
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default BooksComponent;