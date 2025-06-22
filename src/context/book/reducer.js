import { ADD_BOOK, REMOVE_BOOK, SEARCH_BOOKS } from './actions';

export default function reducer(state, action) {
  // Support both dispatch({ type, payload }) and dispatch({ action, payload })
  const actionType = action.type ?? action.action;

  switch (actionType) {
    case SEARCH_BOOKS:
      return {
        ...state,
        bookSearchResults: action.payload
      };

    case ADD_BOOK: {
      const newFavorites = [...state.favoriteBooks, action.payload];
      saveToLocalStorage(newFavorites);
      return { ...state, favoriteBooks: newFavorites };
    }

    case REMOVE_BOOK: {
      const newFavorites = state.favoriteBooks.filter(b => b.id !== action.payload);
      saveToLocalStorage(newFavorites);
      return { ...state, favoriteBooks: newFavorites };
    }

    default:
      return state;
  }
}

// persist favorites to localStorage
function saveToLocalStorage(favBooks) {
  localStorage.setItem('favoriteBooks', JSON.stringify(favBooks));
}
