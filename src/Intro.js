import React, { Component } from 'react';
import logo from './logo.svg';
import './Intro.css';
import LoginContainer from './containers/LoginContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Redux-React-Session 라이브러리를 이용하여 로그인/로그아웃을 구현하는 예제입니다.</h1>
        </header>
        <div className="App-intro">
          <p>1. 의존성: Redux, React-Redux, Redux-Thunk</p>
          <p>2. 사용 기술: JWT</p>
          <p>3. 서버: mock에서 Promise를 반환하도록 하였습니다. (Ajax 미사용)</p>
          <p>4. Logging을 위해 Redux-Logger를 사용하였습니다.</p>
          <LoginContainer />
        </div>
      </div>
    );
  }
}

export default App;
