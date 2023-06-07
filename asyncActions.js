
//Async action
//action dispatched -> state is updated

//TODO: fetcha list of users from an api end point and store it in a redux store
//How to use action creator with the network request:
//How to make API call using redux

//1stpackage: Axios: request to api end points



//State
//stateobj: state={
//loading: true, //data is fetched or not //loading spinner in your components
//data: [], //list of users
//error: '',display the error
//}

//Action
//3 actions
//1st: FETCH_USER_REQUEST:fetch the list of users
//2nd: FETCH_USER_SUCCESS:fetch successfully
//3rd: FETCH_USER_ERROR:error fetching the data

//Reducer
//case FETCH_USER_REQUEST:
//loading: true

//case:FETCH_USER_SUCCESS:
//loading: false
//error:{from API}

//case:FETCH_USER_ERROR:
//loading: false
//error:{from API}
//AXIOS:Request to an api endpoint
//Redux-thun:middleware: standard way to define async action creater

//How to use action creator with the network request:
//How to make API call using redux

//1stpackage: Axios: request to api end points
//2ndpackage: redux-thunk: define th async  action creator  
//npm i axios redux-thunk
//how to use these middleware:
//const applyMiddleware = redux.applyMiddleware
//pass to store
//

const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default
const createStore =redux.createStore
const applyMiddleware = redux.applyMiddleware

const axios = require('axios');

const initialState ={
    loading:false,
    user:[],
    error:''
}



const FETCH_USER_REQUEST ="FETCH_USER_REQUEST"
const FETCH_USER_SUCCESS ="FETCH_USER_SUCCESS"
const FETCH_USER_ERROR ="FETCH_USER_ERROR"

//Action creator

const fetchUsersRequest =()=>{
    return{
        type:FETCH_USER_REQUEST
    }
}


//store list of user

const fetchUsersSuccess =(users)=>{
    return{
        type:FETCH_USER_SUCCESS,
        payload:users
    }
}

const fetchUsersFailure =(error)=>{
    return{
        type:FETCH_USER_ERROR,
        payload:error
    }
}

//reducer
const reducer =(state =initialState,action)=>{
switch(action.type){
    case FETCH_USER_REQUEST:
        return{
            ...state,
            loading:true
        }
    case FETCH_USER_SUCCESS:
            return{
                loading:false,
                users:action.payload,
                error:''
          
            }
    case FETCH_USER_ERROR:
                return{
                    loading:false,
                    users:[],
                    error:action.payload
              
                }
}

}   


//async action creator
//redux-thunk
//returns action
//by using thunk middleware we can return a function instead of a action object
const fetchUsers=()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get("https://jsonplaceholder.typicode.com/users").then(response =>{
            //response.data is the user    
        const users =response.data.map((user)=>user.id);
        dispatch(fetchUsersSuccess(users))
        }).catch((error) =>{
            // console.log(error);
            //error.message is the error
            dispatch(fetchUsersFailure(error.message))
        })
    }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware))  
store.subscribe(()=>console.log(store.getState()))
store.dispatch(fetchUsers())


//redux
//redux needs too much boiler plate
//-action -actionobject - actioncreator -use it in a switch case statement  in a reducer

//lot of other packages additional library redux thunk -redux devtool

//Redux toolkit is the official toolset for optimum/efficient development
//Abstraction over the setup produced
//handle the most common use cases
//has useful utilities 