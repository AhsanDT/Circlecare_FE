import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers/rootReducer';

const presistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'auth',
    'language',
    'languageShort',
    'survey',
    // 'daily_tasks',
    'discover_article',
    'discover_video',
    'care',
    'support',
    'chat'
  ],
  debug: true,
};
const persistedReducer = persistReducer(presistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);
let persistor = persistStore(store);

export { persistor, store };