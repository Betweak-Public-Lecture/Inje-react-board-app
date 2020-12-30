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

import MyNavbar from './components/MyNavbar';

function App() {
  return (
    // // <HelloWorld></HelloWorld>
    // <div>
    //   {/* <CaptionImage imgUrl="https://pbs.twimg.com/profile_images/552851967026794496/w67YTKGZ.png" caption="낙타" /> */}
    //   {/* 고양이사진을 CaptionImage컴포넌트에 전달해서 Rendering */}
    //   {/* <CaptionImage imgUrl="https://newsimg.hankookilbo.com/cms/articlerelease/2019/04/29/201904291390027161_3.jpg" caption="고양이" /> */}
    //   {/* <CaptionImage imgUrl="https://img.etnews.com/photonews/1809/1109937_20180913110406_831_0001.jpg" caption="이건 트럭입니다." /> */}
    //   {/* <Blink text="이 문자는" />
    //   <Blink text="2초에 한번" />
    //   <Blink text="깜빡입니다." /> */}

    //   <CaptionImageList />

    // </div>
    <Router>
      
      <MyNavbar />
      
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/board/write' exact component={WriteBoard} />
        <Route path='/board' exact component={BoardList} />
        <Route path='/board/:boardId/edit' exact component={BoardEdit} />
        <Route path='/board/:boardId' exact component={BoardDetail} />

      </Switch>
    </Router>
  );
}

export default App;
