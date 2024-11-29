import React  from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/firebaseContest';
import { app as firebaseApp } from './util/config'; 
import FirebaseContextProvider from './store/firebaseContest'
import { useContext, useEffect } from 'react';

ReactDOM.render(

  <FirebaseContext.Provider value={{ firebase: firebaseApp }}>
    <FirebaseContextProvider>
    <App />
    </FirebaseContextProvider>
    
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
