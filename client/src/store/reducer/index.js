import {
  ALFA_ASCENDENTE,
  ALFA_DESCENDENTE,
  FILTER_BY_GAME_CREATED,
  FILTER_BY_GENRE,
  GET_ALL_GAMES,
  GET_GENRES,
  POST_GAME,
  RATING_ASCENDENTE,
  RATING_DESCENDENTE,
  SEARCH_GAMES,
  SORT,
} from "../actions";

const initialState = {
  games: [],
  filteredGames: [],
  genres: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        games: payload,
        filteredGames: payload,
      };

    case SEARCH_GAMES:
      return {
        ...state,
        filteredGames: payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };

    case POST_GAME:
      return {
        ...state,
      };

    case SORT:
      let orderedGames;

      if (state.filteredGames.length) orderedGames = [...state.filteredGames];
      else orderedGames = [...state.games];

      orderedGames = orderedGames.sort((a, b) => {
        if (payload === ALFA_ASCENDENTE || payload === ALFA_DESCENDENTE) {
          if (a.name < b.name) return payload === ALFA_ASCENDENTE ? -1 : 1;
          if (a.name > b.name) return payload === ALFA_ASCENDENTE ? 1 : -1;
        }
        if (payload === RATING_ASCENDENTE || payload === RATING_DESCENDENTE) {
          if (a.rating < b.rating)
            return payload === RATING_ASCENDENTE ? 1 : -1;
          if (a.rating > b.rating)
            return payload === RATING_ASCENDENTE ? -1 : 1;
        }
        return 0;
      });

      return {
        ...state,
        filteredGames: orderedGames,
      };

    case FILTER_BY_GENRE:
      let orderedGamesByGenre = [...state.games];
      // orderedGamesByGenre = orderedGamesByGenre.filter(game => game.genres.includes(payload) === true);

      orderedGamesByGenre =
                payload === "Genre"
                ? orderedGamesByGenre
                : orderedGamesByGenre.filter(game => game.genres.includes(payload));

      return {
        ...state,
        filteredGames: orderedGamesByGenre,
      };

    case FILTER_BY_GAME_CREATED:
      let createdGames = [...state.games];
      createdGames = createdGames.filter(game => game.id?.toString().length > 6);

      return {
        ...state,
        filteredGames: payload === "TODOS" ? state.games : createdGames,
      };

    default:
      return state;
  }
};

export default reducer;
