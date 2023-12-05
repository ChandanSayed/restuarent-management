import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase/firebase.init';

export const Context = createContext(null);

export default function AppContext({ children }) {
  const [user, setUser] = useState('');
  const [uId, setUId] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState({});
  const [reload, setReload] = useState(0);
  const [itemDetails, setItemDetails] = useState({});

  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid;
        setUId(uid);
        setUser(user.displayName);
        setUserPhoto(user.photoURL);
        setLoggedUser(JSON.parse(localStorage.getItem('loggedUser')));
        setLoading(false);
      } else {
        console.log('User is signed out');
        setLoading(false);
      }
    });
  }, [reload]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid;
        setUId(uid);
        setUser(user.displayName);
        setUserPhoto(user.photoURL);
        setLoggedUser(JSON.parse(localStorage.getItem('loggedUser')));
        setLoading(false);
      } else {
        console.log('User is signed out');
        setLoading(false);
      }
    });
  }, []);

  return <Context.Provider value={{ itemDetails, setItemDetails, setReload, loggedUser, user, userPhoto, setUser, setUserPhoto, loading, setLoading, uId }}>{children}</Context.Provider>;
}

// export default AppContext;
