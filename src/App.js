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

function App() {
  return (
    <>
      {/* we are wrapping everything in "NoteState" so that we can use the props and fn in or inside the files that are written inside it here  */}
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="Work has been done"/>
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/signin' element={<SignIn/>} />
              <Route exact path='/signup' element={<SignUp/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
