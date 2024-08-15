// import { configureStore } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import conversationSlice from './Slice';



const persistConfig={
    key:'root',
    storage,
}

const rootReducer = persistReducer(persistConfig, conversationSlice )

const store=configureStore({
        reducer:{
            conversation: rootReducer,
        }
})

const persistor = persistStore(store);

export {store, persistor};