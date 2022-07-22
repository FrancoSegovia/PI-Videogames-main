import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Games from './components/Games/Games.jsx';
import CreateGame from './components/CreateGame/CreateGame.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';

function App() {
  return (
    <div className="App">
        
        <Route exact path="/" component={ Landing } />
        <Route exact path="/home" component={ Navbar } />
        <Route exact path="/home" component={ Games } />
        <Route exact path="/create" component={ CreateGame } />
        <Route exact path="/home/:id" component={ GameDetail } />
        {/* <Route exact path="/" component={Teams} />
        <Route path="/otraRuta" component={TeamCard} />
        <Route path="/teams/:teamId" component={TeamDetail} />
        <Route exact path="/team/create" component={CreateTeam} /> */}
    </div>
  );
}

export default App;
