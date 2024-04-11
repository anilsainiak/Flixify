const MovieReducer=(state,action)=>{
    switch(action.type){
        case "GET_MOVIES_START":
            return{
                movies:[],
                isFetching:true,
                error:false
            };
            break;
        case "GET_MOVIES_SUCCESS":
            return{
                movies:action.payload,
                isFetching:false,
                error:false
            };
            break;
        case "GET_MOVIES_FAILURE":
            return{
                movies:[],
                isFetching:false,
                error:true
            };
            break;

        // DELETE MOVIES
        case "DELETE_MOVIES_START":
            return{
                ...state,
                isFetching:true,
                error:false
            };
            break;
        case "DELETE_MOVIES_SUCCESS":
            return{
                movies:state.movies.filter((movie)=>movie._id!==action.payload),
                isFetching:false,
                error:false
            };
            break;
        case "DELETE_MOVIES_FAILURE":
            return{
                ...state,
                isFetching:false,
                error:true
            };
            break;

        // CREATE MOVIE
        case "CREATE_MOVIE_START":
            return{
                ...state,
                isFetching:true,
                error:false
            };
            break;
        case "CREATE_MOVIE_SUCCESS":
            return{
                movies:[...state.movies,action.payload],
                isFetching:false,
                error:false
            };
            break;
        case "CREATE_MOVIE_FAILURE":
            return{
                ...state,
                isFetching:false,
                error:true
            };
            break;

        //UPDATE MOVIE
        case "UPDATE_MOVIE_START":
            console.log('state',state.movies);
            return{
                ...state,
                isFetching:true,
                error:false
            };
            break;
        case "UPDATE_MOVIE_SUCCESS":
            return{
                movies:state.movies.map((movie)=>{
                    if(movie._id===action.payload._id){
                        return action.payload
                    }
                    return movie;
                }),
                isFetching:false,
                error:false
            };
            break;
        case "UPDATE_MOVIE_FAILURE":
            return{
                ...state,
                isFetching:false,
                error:true
            };
            break;

        default:
            return {...state};
    }
}

export default MovieReducer;