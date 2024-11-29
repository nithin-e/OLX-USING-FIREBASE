import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create  from './Pages/Create'
import View from './Pages/ViewPost'
import { AuthContext,FirebaseContext } from './store/firebaseContest';
import { onAuthStateChanged } from "firebase/auth";
import { getAuth} from 'firebase/auth';
import Post from './store/postContest';



/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const { setUser } = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext)
  const auth = getAuth(firebase); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      setUser(userData ? userData : null);
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <div>
      <Post>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Login" component={Login} />
          <Route path="/Create">
            <Create/>
          </Route>
          <Route path='/View'>
            <View/>
          </Route>
        </Switch>
      </Router>
      </Post>
    </div>
  );
}

export default App;
