import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Alert from './Components/Alert';
import SignIn from './Components/Signin';
import SignUp from './Components/Signup';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './contexts/notes/noteState';
import { useState } from 'react';

function App() {

  const [alert,setAlert] = useState(null);
  function showAlert(type,message){
    setAlert({message:message,type:type});
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }
  return (
    <>
      {/* we are wrapping everything in "NoteState" so that we can use the props and fn in or inside the files that are written inside it here  */}
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert}/>} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/signin' element={<SignIn showAlert={showAlert}/>} />
              <Route exact path='/signup' element={<SignUp showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
