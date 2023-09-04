import axios from "axios";

//actions
export const  GET_GAMES = "GET_GAMES";
export const GET_GAME = "GET_GAME";
export const GET_GENRE ="GET_GENRE";
export const GAMES_FILTERED_BY_GENRES ="GAMES_FILTERED_BY_GENRES";
export const GAMES_FILTERED_BY_CREATION = "GAMES_FILTERED_BY_CREATION";
export const GET_GAME_NAME = "GET_GAME_NAME";
export const ORDER_GAME = "ORDER_GAME";
export const NAME_BY_ORDER = "NAME_BY_ORDER";
export const RATING_BY_ORDER = "RATING_BY_ORDER";
export const GAME_POST = 'GAME_POST';
export const GAME_POST_FAILURE = "GAME_POST_FAILURE";



export const getGames = () => {
 return async function (dispatch) {
    try{
    const games = await axios.get("http://localhost:3001/videogames");
     return dispatch ({
         type: GET_GAMES,
         payload :games.data
     })
    }catch (error){
      console.log(error) 
    }
 }
}

export const getGameDetails =(id) => {
    return async function (dispatch) {
        try{
        const {data} =  await axios.get(`http://localhost:3001/videogames/${id}`);
        return dispatch ({
            type: GET_GAME,
            payload: data
        });
        } catch(erorr){
          return dispatch({
            type: GET_GAME,
            payload: []
          })
        }
    }
}



    export const getGameGenre = () =>{
    return async function(dispatch){
        try{
         const genres = await axios.get("http://localhost:3001/genres");
         return dispatch ({
            type: GET_GENRE,
            payload: genres.data
         })
        }catch(error){
         console.log(error) 
        }
    }
}


    export const gamesFilteredByGenres = (payload) => {
     return {
        type: GAMES_FILTERED_BY_GENRES,
        payload
     }
    }
 
        export const gamesFilteredByCreation = (payload) => {
            return {
                type: GAMES_FILTERED_BY_CREATION,
                payload
            }
        }
      
        export const  orderGame = (payload) => {
            return {
                type:ORDER_GAME,
                payload
            }
        }
  
        export const nameByOrder = (payload) => {
            return {
                type: NAME_BY_ORDER,
                payload
            };
        };
        
        export const nameByRating = (payload) => {
            return {
                type: RATING_BY_ORDER,
                payload
            };
        };
        export const postGame = (payload) => {
            return async function(dispatch) {
                try {
                    const response = await axios.post("http://localhost:3001/videogames", payload);
                    
                    dispatch({
                        type: GAME_POST,
                        payload: response.data
                    });
                } catch (error) {
                    dispatch({
                        type: GAME_POST_FAILURE,
                        payload: error.message // Envía el mensaje de error al reducer
                    });
                }
            };
        };

        
        export const getGameName = (name) => {
            return async function (dispatch) {
                try {
                    console.log(name);
                    const { data } = await axios.get(`http://localhost:3001/videogames?search=${name}`);
                    console.log(data);
        
                    // Solo envía el término de búsqueda como payload
                    return dispatch({
                        type: GET_GAME_NAME,
                        payload: name
                    });
                } catch (error) {
                    return dispatch({
                        type: GET_GAME_NAME,
                        payload: []
                    });
                }
            };
        };
        

