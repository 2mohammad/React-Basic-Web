import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./FoodMenu";
import Snack from "./FoodItem";



  function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [snacks, setSnacks] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [Droute, setDRoute] = useState()
    const [Sroute, setSRoute] = useState()


    useEffect(() => {
      async function getS() {
        let snacks = await SnackOrBoozeApi.getSnacks("snacks");
        setSnacks(snacks);
        setSRoute("snacks")
        let drinks = await SnackOrBoozeApi.getSnacks("drinks");
        setDrinks(drinks);
        setDRoute("drinks")
        setIsLoading(false)      
    }

      getS()


    }, []);


// console.log(snac.filter(e => e["snacks"]))

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
          <Switch>
          <Route exact path="/">
              <Home snacks={drinks} />
            </Route>
            <Route exact path="/snacks">
              <Menu snacks={snacks} route={Sroute} title="Snacks" />
            </Route>
            <Route path="/snacks/:id">
              <Snack items={snacks} cantFind="/snacks" />
            </Route>
            <Route exact path="/drinks">
              <Menu snacks={drinks} route={Droute} title="Drinks" />
            </Route>
            <Route path="/drinks/:id">
              <Snack items={drinks} />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
