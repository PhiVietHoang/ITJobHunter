import { legacy_createStore as createStore } from "redux";

import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducer"


const rootReducer=combineReducers({
    
    auth:authReducer,
})

const composeEnhancers=  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store =createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk))
    )