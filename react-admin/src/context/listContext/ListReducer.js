const ListReducer=(state,action)=>{
    switch(action.type){
        case "GET_LISTS_START":
            return{
                lists:[],
                isFetching:true,
                error:false
            };
            break;
        case "GET_LISTS_SUCCESS":
            return{
                lists:action.payload,
                isFetching:false,
                error:false
            };
            break;
        case "GET_LISTS_FAILURE":
            return{
                lists:[],
                isFetching:false,
                error:true
            };
            break;

        // DELETE LIST
        case "DELETE_LIST_START":
            return{
                ...state,
                isFetching:true,
                error:false
            };
            break;
        case "DELETE_LIST_SUCCESS":
            return{
                lists:state.lists.filter((list)=>list._id!==action.payload),
                isFetching:false,
                error:false
            };
            break;
        case "DELETE_LIST_FAILURE":
            return{
                ...state,
                isFetching:false,
                error:true
            };
            break;

        // CREATE LIST
        case "CREATE_LIST_START":
            return{
                ...state,
                isFetching:true,
                error:false
            };
            break;
        case "CREATE_LIST_SUCCESS":
            return{
                lists:[...state.lists,action.payload],
                isFetching:false,
                error:false
            };
            break;
        case "CREATE_LIST_FAILURE":
            return{
                ...state,
                isFetching:false,
                error:true
            };
            break;

        //UPDATE MOVIE
        case "UPDATE_LIST_START":
            return{
                ...state,
                isFetching:true,
                error:false
            };
            break;
        case "UPDATE_LIST_SUCCESS":
            return{
                movies:state.lists.map((list)=>{
                    if(list._id===action.payload._id){
                        return action.payload
                    }
                    return list;
                }),
                isFetching:false,
                error:false
            };
            break;
        case "UPDATE_LIST_FAILURE":
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

export default ListReducer;