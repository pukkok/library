import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import RegisterPage from './Pages/RegisterPage';
import { useState } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route exact path='/login' element={<LoginPage/>}></Route>
        <Route exact path='/register' element={<RegisterPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
