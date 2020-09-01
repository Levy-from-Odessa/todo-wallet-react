import {combineReducers} from 'redux'
import todoReducer from './todo/todoReducer'
import bankReducer from './bank/bankReducer'
const rootReducer = combineReducers({
    todoReducer,
    bankReducer
})

export default rootReducer