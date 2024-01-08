import { useEffect, useReducer, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase/firebase.init';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import { useImmerReducer } from 'use-immer';
import axios from 'axios';

export default function AppContext({ children }) {
  const initialState = {
    user: '',
    uId: '',
    userPhoto: '',
    loading: true,
    loggedUser: JSON.parse(localStorage.getItem('loggedUser')),
    reload: 0,
    itemDetails: {},
    logged: false
  };
  function AppReducer(draft, action) {
    switch (action.type) {
      case 'dataLoaded':
        draft.loading = false;
        break;
      case 'logged':
        draft.uId = action.value.uid;
        draft.user = action.value.displayName;
        draft.userPhoto = action.value.photoURL;
        draft.loading = false;
        draft.logged = true;
        break;
      case 'logout':
        draft.logged = false;
        draft.user = '';
        draft.loggedUser = {};
        break;
      case 'login':
        console.log(action.value);
        draft.loggedUser = action.value;
        draft.logged = true;
        break;
      case 'get-item-details':
        draft.itemDetails = action.value;
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(AppReducer, initialState);

  useEffect(() => {
    if (state.logged && state.loggedUser) {
      localStorage.setItem('loggedUser', JSON.stringify(state.loggedUser));
    } else {
      localStorage.removeItem('loggedUser');
    }
  }, [state.logged]);

  const auth = getAuth(app);
  // useEffect(() => {
  //   onAuthStateChanged(auth, user => {
  //     if (user) {
  //       const uid = user.uid;
  //       setUId(uid);
  //       setUser(user.displayName);
  //       setUserPhoto(user.photoURL);
  //       setLoggedUser(JSON.parse(localStorage.getItem('loggedUser')));
  //       setLoading(false);
  //     } else {
  //       console.log('User is signed out');
  //       setLoading(false);
  //     }
  //   });
  // }, [state.reload]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid;
        // setUId(uid);
        // setUser(user.displayName);
        // setUserPhoto(user.photoURL);
        // setLoggedUser(JSON.parse(localStorage.getItem('loggedUser')));
        // setLoading(false);

        dispatch({ type: 'logged', value: user });
        getUserDetails(user);
      } else {
        console.log('User is signed out');
        dispatch({ type: 'dataLoaded' });
      }
    });
  }, []);

  async function getUserDetails(user) {
    const res = await axios.post('https://restaurant-management-server.onrender.com/login', { email: user.email });

    if (res.data._id) {
      // localStorage.setItem('loggedUser', JSON.stringify(res.data));
      dispatch({ type: 'login', value: res.data });
    }
  }

  // console.log(state);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// export default AppContext;
