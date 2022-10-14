import ReduxThunk from "redux-thunk";
import { persistStore } from "redux-persist";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import search from "./reducers/search";

const appReducer = combineReducers({
  search: search,
});

const middleware = [ReduxThunk];
const persistedReducer = appReducer; // persistReducer(persistConfig, appReducer);

export const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(...middleware)
);
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
