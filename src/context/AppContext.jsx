import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase/firebase.init';

export const Context = createContext(null);

export default function AppContext({ children }) {
  const [user, setUser] = useState('');
  const [uId, setUId] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);

  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid;
        setUId(uid);
        setUser(user.displayName);
        setUserPhoto(user.photoURL);
        setLoading(false);
      } else {
        console.log('User is signed out');
        setLoading(false);
      }
    });
  }, []);
  return <Context.Provider value={{ dark, setDark, user, userPhoto, setUser, setUserPhoto, loading, setLoading, uId }}>{children}</Context.Provider>;
}

// export default AppContext;
