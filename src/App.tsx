import React from "react";
import "./App.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import rootReducer from "./state/reducers/root";
import { ProductsList } from "./components/ProductsList";
import rootSaga from "./state/sagas/root";
import { ProductView } from "./components/ProductView";
import { ProductEdit } from "./components/ProductEdit";

function App() {
  const middleware = createSagaMiddleware();

  const store = createStore(rootReducer, applyMiddleware(middleware));
  middleware.run(rootSaga);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={ProductsList} />
          <Route path="/products/create" exact component={ProductEdit} />
          <Route path="/products/:productId/edit" component={ProductEdit} />
          <Route path="/products/:productId" component={ProductView} />
          <Route path="/products" component={ProductsList} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
