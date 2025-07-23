import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productApi } from "./api/productApi";
import cartReducer from "./features/cartSlice";
import { platziApi } from "./api/platziApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  [productApi.reducerPath]: productApi.reducer,
  [platziApi.reducerPath]: platziApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare({ serializableCheck: false })
        .concat(productApi.middleware)
        .concat(platziApi.middleware),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
