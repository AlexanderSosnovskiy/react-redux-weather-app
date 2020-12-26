import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Theme from './theme';
import Home from './pages/home';
import SingleWeatherCard from './pages/singleWeatherCard';
import Error from './pages/error';

function App() {
  return (
    <Router>
      <Theme>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/locations/:location' component={SingleWeatherCard} />
          <Route path='*' component={Error} />
        </Switch>
      </Theme>
    </Router>
  );
}

export default App;
