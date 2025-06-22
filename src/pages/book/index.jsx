import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { useBookContext } from "../../context/book";
import { ADD_BOOK, REMOVE_BOOK } from "../../context/book/actions";
import styles from "./style.module.css";

export default function Book() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [{ bookSearchResults, favoriteBooks }, dispatch] = useBookContext();

  // Determine if the current bok is in favorites
  let isFavoriteBook = false;
  let book = favoriteBooks.find((b) => b.id === bookId);
  if (book) {
    isFavoriteBook = true;
  } else {
    book = bookSearchResults.find((b) => b.id === bookId);
  }

  // If no book found, redirect to favorites page
  if (!book) return <Navigate to="/favorites" />;

  // Handlers for adding/removing favorites
  const handleAdd = () => dispatch({ action: ADD_BOOK, payload: book });
  const handleRemove = () => dispatch({ action: REMOVE_BOOK, payload: bookId });

  return (
    <main>
      <BookInfo isFavorite={isFavoriteBook} {...book} />
      <div className={styles.controls}>
        {isFavoriteBook ? (
          <button onClick={handleRemove}>
            Remove from Favorites
          </button>
        ) : (
          <button onClick={handleAdd}>
            Add to Favorites
          </button>
        )}
        <Link onClick={() => navigate(-1)}>
          Return
        </Link>
      </div>
    </main>
  );
}

function BookInfo({
  title,
  authors,
  thumbnail,
  description,
  isFavorite,
  pageCount,
  categories,
  previewLink,
}) {
  return (
    <>
      <div className={styles.titleGroup}>
        <div>
          <h1>
            {title}
            {isFavorite && <sup>⭐</sup>}
          </h1>
          {authors && (
            <h2>
              By: {authors.join(", ").replace(/, ([^,]*)$/, ", and $1")}
            </h2>
          )}
          {categories && (
            <h3>
              Category: {categories.join(", ").replace(/, ([^,]*)$/, ", and $1")}
            </h3>
          )}
        </div>
        <a
          target="_blank"
          href={previewLink}
          className={styles.imgContainer}
          rel="noreferrer"
        >
          <img
            src={
              thumbnail
                ? thumbnail
                : "https://via.placeholder.com/128x190?text=NO COVER"
            }
            alt={title}
          />
          <span>Look Inside!</span>
        </a>
      </div>
      <p>
        Description:
        <br />
        {description}
      </p>
      <p>Pages: {pageCount}</p>
      <div className={styles.links}>
        <span>Order online:</span>
        <a
          target="_blank"
          href={`https://www.amazon.com/s?k=${encodeURIComponent(
            title
          )}${
            authors ? 
              "+" + encodeURIComponent(authors[0]) : ''
          }`}
          rel="noreferrer"
        >
          Amazon
        </a>
        <a
          target="_blank"
          href={`https://www.barnesandnoble.com/s/${encodeURIComponent(
            title
          )}${
            authors ? 
              "+" + encodeURIComponent(authors[0]) : ''
          }`}
          rel="noreferrer"
        >
          Barnes & Noble
        </a>
      </div>
    </>
  );
}
