import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { createAction } from "@reduxjs/toolkit";

//Reducers
import eventSlice from './reducers/EventReducer';
import optionsSlice from './reducers/OptionsReducer';

import { AnticipateRootState } from "./types/AnticipateRootState";

export const resetStore = createAction('RESET_STORE');

const rootReducer = (state: ReturnType<typeof allReducers> | undefined, action: Action) => {
    if (action.type === resetStore.type) {
        return {
            events: eventSlice(undefined, action),
            options: optionsSlice(undefined, action)
        };
    }
    return allReducers(state, action);
}

const allReducers = combineReducers({
    events: eventSlice,
    options: optionsSlice
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<AnticipateRootState, Action>(persistConfig, rootReducer);

const storeInstance = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(storeInstance);

export { storeInstance, persistor }

export type AppDispatch = typeof storeInstance.dispatch;