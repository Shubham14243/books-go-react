import { Provider } from "react-redux";
import store from "./Redux/store";
import { AuthProvider } from './AuthContext';
import _ from "lodash";
import { jwtDecode } from "jwt-decode";

import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Books from "./components/Books";
import Users from "./components/Users";
import AddBook from "./components/AddBook";
import NavBar from "./components/NavBar";
import Return from "./components/Return";
import Login from "./components/LogIn";
import Signup from "./components/Signup";
import Logout from "./components/Logout";

function App() {

  const [adminStatus, setAdminStatus] = useState(false);

  useEffect(()=>{
    const authToken = localStorage.getItem("authToken");
    if(!_.isEmpty(authToken)) {
      const decodedToken = jwtDecode(authToken);
      if(decodedToken.access === "admin"){
        setAdminStatus(true);
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <NavBar
          color={"dark"}
          localStore={localStorage}
          dark={true}
          fixed={"top"}
          full={"true"}
          container={true}
          expand={true}
        />
        <Router>
          <div className="App">
            <Routes>
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<Signup />} />

              <Route exact path="/" element={<Home adminStatus={adminStatus} />} />
              <Route exact path="/books" element={<Books adminStatus={adminStatus} />} />
              <Route exact path="/addBook" element={<AddBook adminStatus={adminStatus} />} />
              <Route exact path="/users" element={<Users adminStatus={adminStatus} />} />
              <Route exact path="/return" element={<Return adminStatus={adminStatus} />} />
              <Route
                exact
                path="/logout"
                element={<Logout />}
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
