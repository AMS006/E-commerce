import {combineReducers} from 'redux'
import userReducer from './user/user.reducer'
import categoryReducer from './category/category.reducer';
const rootReducer = combineReducers({
    userReducer,
    categoryReducer
});

export default rootReducer;