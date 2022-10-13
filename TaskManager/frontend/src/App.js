import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Homepage from "./Pages/Homepage";
import Editpage from "./Pages/Editpage";
function App() {
  return (
    <Router>
      <div style={{height:"100vh"}} className="App flex justify-center items-center ">
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/edit" element={<Editpage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
