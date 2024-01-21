import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./Signup.jsx";
import Appbar from "./Appbar.jsx";
import Signin from './Signin.jsx';
import Addcourse from './Addcourse.jsx';
import Getcourse from './Getcourse.jsx';
import Course from './Course.jsx';
function App() {


  return (
    <div style={{width:"100vw",height:"100vh",backgroundColor:"#eeeeee"}}>
      <Appbar></Appbar>
      <Router>
        <Routes>
          <Route path='/Course/:courseId' element={<Course/>}/>
          <Route path='/Getcourse' element={<Getcourse/>}/>
          <Route path='/Addcourse' element={<Addcourse/>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </Router>

    </div>

  );
}




export default App



