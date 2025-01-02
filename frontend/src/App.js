import './App.css';
import AllTask from './pages/AllTask';
import CompletedTask from './pages/CompletedTask';
import Home from './pages/Home';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Pending from './pages/Pending';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const App = () => {
  return (
   <div className='bg-gray-900 text-white h-screen p-2 relative'>
    
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} >
        <Route index element={<AllTask/>} />
        <Route path="/completedTask" element={<CompletedTask/>} />
        <Route path="/pendingTask" element={<Pending/>} />
        </Route>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
   </div>
  );
}

export default App;
