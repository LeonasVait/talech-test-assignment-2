import React from "react";
import "./App.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./state/reducers/root";
import { ProductsList } from "./components/ProductsList";
import rootSaga from "./state/sagas/root";

function App() {
  const middleware = createSagaMiddleware();

  const store = createStore(rootReducer, applyMiddleware(middleware));
  middleware.run(rootSaga);

  return (
    <Provider store={store}>
      <ProductsList></ProductsList>
    </Provider>
  );
}

export default App;
