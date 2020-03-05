import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { compose, applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-underscore-dangle
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composed = compose(applyMiddleware(...middleware), ...enhancers);
const store = createStore(rootReducer(history), {}, composed);

export default store;
