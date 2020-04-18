import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import Search from "./pages/Search";
import Title from "./pages/Title";
import NotFound from "./pages/404";

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/search/:search" component={Search}></Route>
        <Route path="/title/:title" component={Title}></Route>
        <Route path="/favorites" render={(props) => <Search {...props} favorites={true} />}>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
