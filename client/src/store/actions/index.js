import axios from 'axios';

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const SEARCH_GAMES = 'SEARCH_GAMES';
export const GET_GENRES = 'GET_GENRES';
export const POST_GAME = 'POST_GAME';
export const SORT = 'SORT';

export const SORT_CLEANER = 'SORT_CLEANER';
export const ALFA_ASCENDENTE = 'ALFA_ASCENDENTE';
export const ALFA_DESCENDENTE = 'ALFA_DESCENDENTE';
export const RATING_ASCENDENTE = 'RATING_ASCENDENTE';
export const RATING_DESCENDENTE = 'RATING_DESCENDENTE';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_GAME_CREATED = 'FILTER_BY_GAME_CREATED';


export function fetchGames() {
    return function(dispatch) {
        axios.get("http://localhost:3001/api/videogames")
        .then(games => {
            dispatch ({
                type: GET_ALL_GAMES,
                payload:games.data
            })
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export function searchGames(search) {
    return function(dispatch) {
        axios.get(`http://localhost:3001/api/videogames?search=${search}`)
        .then(games => {
            dispatch ({
                type: SEARCH_GAMES,
                payload:games.data
            })
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export function getGenres() {
    return function(dispatch) {
        axios.get(`http://localhost:3001/api/genres`)
        .then(genres => {
            dispatch ({
                type: GET_GENRES,
                payload:genres.data
            })
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export function postGame(game) {
    return function() {
        axios.post(`http://localhost:3001/api/videogames`, game);
    }
}

export function sort(sortType) {
    return {
            type: SORT,
            payload:sortType
        }
}

export function filterGameGenre(genre) {
    return {
      type: FILTER_BY_GENRE,
      payload:genre,
    };
  }

  export function filterGameCreated(creadoOTodos) {
    return {
      type: FILTER_BY_GAME_CREATED,
      payload:creadoOTodos,
    };
  }
