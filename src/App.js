import logo from './logo.svg';
import './App.css';
import HelloWorld from'./components/HelloWorld';
import CaptionImage from './components/CaptionImage';
import Blink from './components/Blink';
import CaptionImageList from './components/CaptionImageList';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'; 

// PAGE import
import Home from './pages/Home';
import BoardList from './pages/BoardList';
import WriteBoard from './pages/WriteBoard';
import BoardDetail from './pages/BoardDetail';
import BoardEdit from './pages/BoardEdit';
import CheckListWrite from './pages/CheckListWrite';

import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import MyNavbar from './components/MyNavbar';

function App() {
  return (

    <Router>
      
      <MyNavbar />
      
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/board/write' exact component={WriteBoard} />
        <Route path='/board' exact component={BoardList} />
        <Route path='/board/:boardId/edit' exact component={BoardEdit} />
        <Route path='/board/:boardId' exact component={BoardDetail} />

        {/* CarList */}
        <Route path='/car' exact component={CarList} />
        <Route path='/car/:carId' exact component={CarDetail} />
        <Route path='/car/:carId/checklistWrite' exact component={CheckListWrite} />


      </Switch>
    </Router>
  );
}

export default App;
