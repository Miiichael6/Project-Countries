import { Route, Switch } from "react-router-dom";
import Welcome from "./components/Welcome";
import Countries from "./containers/Countries";
import CountryDetail from "./containers/CountryDetail";
import NavBar from "./containers/NavBar";
import ActivityCreate from "./containers/activityCreate";
import Error404 from "./components/Error404";
import Footer from "./components/Footer";
import About from "./components/About";
import Activities from "./containers/Activities";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={Welcome} />
        <Route exact path={"/countries"}>
          <NavBar />
          <Countries />
        </Route>
        <Route exact path={"/countries/:id"}>
          <NavBar />
          <CountryDetail />
          <Footer />
        </Route>
        <Route exact path={"/create/countries"}>
          <NavBar />
          <ActivityCreate />
          <Footer />
        </Route>
        <Route exact path={"/about"}>
          <NavBar />
          <About />
          <Footer />
        </Route>
        <Route exact path={"/activities"}>
          <NavBar />
          <Activities />
        </Route>
        <Route path={"*"}>
          <NavBar />
          <Error404 />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
