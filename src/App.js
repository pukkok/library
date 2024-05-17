import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import RegisterPage from './Pages/RegisterPage';
import History from './Components/History';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route exact path='/login' element={<LoginPage/>}></Route>
        <Route exact path='/register' element={<RegisterPage/>}></Route>
        <Route exact path='/history' element={<History/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
