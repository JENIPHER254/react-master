import React from 'react'
import Header from './components/common/heading/Header'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <>
     
      <Router>
         <Header />
         <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
         </Switch>
      </Router>
    </>
  )
}

export default App
