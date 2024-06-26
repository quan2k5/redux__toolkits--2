import { configureStore } from "@reduxjs/toolkit";
import reducerWorks from './reducers/worksReducer'
const store = configureStore({
    reducer:{
        works:reducerWorks,
    }
})

export default store