import { createContext, useState } from 'react';
import { db } from '../util/config';


export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null); 

export default function FirebaseContextProvider({ children }) { 
  const [user, setUser] = useState('hello');

  return (
    <FirebaseContext.Provider value={{ db }}>  
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </FirebaseContext.Provider>
  );
}
