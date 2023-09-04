import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from '../src/components/Landing/Landing';
import Home from '../src/components/Home/Home';
import CreateGame from './components/CreateGame/CreateGame';
import PageNotFound  from './components/PageNotFound/PageNotFound';
import GameDetail from './components/GameDetail/GameDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/detail/:id' component={GameDetail} />
        <Route exact path='/game' component={CreateGame} />
        <Route path= '/*' component={PageNotFound} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
