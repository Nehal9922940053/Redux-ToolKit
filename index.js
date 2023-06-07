//KFC store
// wings are available in the kitchen
//delivery manager 1 handles WINGS_ORDERS from the customer and delivers
//coke is stored in the freezer
//delivery manager 2 handle COKE_ORDER from the customer


//state:n





// import redux from "redux"
const redux = require('redux');

 const reduxLogger =require('redux-logger');

//helper function
const bindActionCreators =redux.bindActionCreators

// const createStore =redux.createStore
const createStore = redux.createStore


const combineReducers =redux.combineReducers

const applyMiddleware =redux.applyMiddleware

const logger = reduxLogger.createLogger()
console.log("This is KFC Example");
//Action: plain js object
//This is the only way your application can interact with store
//Action is a plan is object
// Action carry some information from the app to the redux store
//Action have a type property , that describes something that has happened in a particular app 
//type property defined as string constants
 
//Action: WINGS_ORDERED
const WINGS_ORDERED = "WINGS_ORDERED";

//new scenario
const WINGS_RESTOCKED = "WINGS_RESTOCKED";

const COKE_ORDERED = "COKE_ORDERED";
const COKE_RESTOCKED = "COKE_RESTOCKED";
//Define action


//Action creater
function orderwings(){
    return{
        //Define action
         type:WINGS_ORDERED,
        quantity:1
    }
}

//action creater
// function restockWings(qty=1){
    function restockWings(){
    return{
        type:WINGS_RESTOCKED,
        // quantity:qty,
        payload:1

    }
}

function orderCoke(qty=1){
    return{
        type:COKE_ORDERED,
        payload:qty, 
    }
}

function restockCoke(qty=1){
    return{
        type:COKE_RESTOCKED,
        payload:qty, 
    }
}



//Reducer
//Specify how the app's state changes in response to a action sent to the store
//Reducers are functions that accepts a state and action  as a argument and returns the next state to the app 
//previousState,action) => newState


(previousState, action) => newState

// const initialState ={
//     numberOfWings:50,
//     numberOfCokes:80,
// }

const initialWingState={
    numberOfWings:50
}


const initialCokeState={
    numberOfCokes:80
}






// const reducer = (state = initialState, action)=>{
//     switch(action.type){
//     case WINGS_ORDERED:
//         return{
//             //copy of state obj
//             ...state,
//             //updating the number of wings
//             numberOfWings:state.numberOfWings -1
//         }

//         case WINGS_RESTOCKED:
//             return{
//             ...state,
//             // numberOfWings:state.numberOfWings + action.quantity
//             numberOfWings:state.numberOfWings + action.payload
//         }

//         case COKE_ORDERED:
//             return{
//                 //copy of state obj
//                 ...state,
//                 //updating the number of wings
//                 numberOfCokes:state.numberOfCokes -1
//             }
    
//             case COKE_RESTOCKED:
//                 return{
//                 ...state,
//                 // numberOfWings:state.numberOfWings + action.quantity
//                 numberOfCokes:state.numberOfCokes + action.payload
//             }
    


//         default:
//             return state
//     }
// }


const WingReducer = (state = initialWingState, action)=>{
     switch(action.type){
     case WINGS_ORDERED:
            return{
                //copy of state obj
                ...state,
                //updating the number of wings
             numberOfWings:state.numberOfWings - 1
            }
    
         case WINGS_RESTOCKED:
             return{
             ...state,
             // numberOfWings:state.numberOfWings + action.quantity
                numberOfWings:state.numberOfWings + action.payload
            }
            default:
                return state
           }
    }

const CokeReducer = (state = initialCokeState, action)=>{
    switch(action.type){
            case COKE_ORDERED:
             return{
                    //copy of state obj
                    ...state,
                    //updating the number of wings
                 numberOfCokes:state.numberOfCokes - 1
                }
        
             case COKE_RESTOCKED:
                 return{
                 ...state,
                 // numberOfWings:state.numberOfWings + action.quantity
                    numberOfCokes:state.numberOfCokes + action.payload
                }
        
    
    
            default:
             return state
        }
 }
    
    
    







//Redux store
//for entire app will have the one store
//Responsibilities:
//1- holds the application state
//2- allows access to state via getState()
//3- allows state to be updated via dispatch(action)
//4- Registers listeners via subscribe(listener)
//5- unsubscribe from the store - store handles  in registering no listeners via  the function returned by the subscribe method



//combine the store
const rootReducer = combineReducers({
    wings:WingReducer,
    coke:CokeReducer

})




//1-
//  const store = createStore(reducer,applyMiddleware(logger))



//combine the root reducer including
const store  = createStore(rootReducer,applyMiddleware(logger))
//2-
console.log("Initial State",store.getState())
//4-
// store.subscribe(()=>console.log("Update state: ",store.getState()))

//5-
const unsubscribe = store.subscribe(()=>{
    // console.log("Updated state: ", store.getState())
})

//3-
//Invoke the action creater
// store.dispatch(orderwings())
// store.dispatch(orderwings())
// store.dispatch(orderwings())
// store.dispatch(orderwings())
// store.dispatch(orderwings())
// store.dispatch(restockWings(5))


//1st arg: obj of dff action creator, 2nd arg: what you want to bind to
const actions =bindActionCreators({orderwings,restockWings, orderCoke, restockCoke}, store.dispatch)
actions.orderwings()
actions.orderCoke()

actions.orderwings()
actions.orderCoke()
actions.orderCoke()

actions.orderwings()
actions.orderwings()
actions.orderwings()
actions.restockWings(5)

actions.orderCoke()
actions.orderCoke()
actions.restockCoke(5)





//5-
unsubscribe()


//Previous Scenario : ordering the wings

//New Scenario : Restock the wings

//middleware
//provides 3rd party extension point between dispatching the action and the moment it reaches the reducer
//Logging, crach reporting, performing async tasks
//middleware redux logger
//npm i redux-logger

//Async action
//action dispatched -> state is updated

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
