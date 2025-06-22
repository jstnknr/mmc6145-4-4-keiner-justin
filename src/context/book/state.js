// load favorites from localStorage (or default to [])
const stored = localStorage.getItem('favoriteBooks');
const initialFavorites = stored ? JSON.parse(stored) : [];

const initialState = {
  bookSearchResults: [],
  favoriteBooks: initialFavorites
};

export default initialState;
