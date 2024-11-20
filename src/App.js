import { Routes, Route, BrowserRouter } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
