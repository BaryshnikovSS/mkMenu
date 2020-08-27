import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Loader from "./components/loader/Loader";
import "./App.css";

const SelectionPage = lazy(() =>
  import('./pages/selectionPage/SelectionPage' /* webpackChunkName: "selectHero" */)
);

const DescriptionPage = lazy(() =>
  import(
    './pages/descriptionPage/DescriptionPage' /* webpackChunkName: "fightDescription" */
  )
);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={SelectionPage} />
          <Route path="/description" component={DescriptionPage} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default withRouter(App);
