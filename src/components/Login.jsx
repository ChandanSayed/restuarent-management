import React, { useContext, useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.init';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Context } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { user, userPhoto } = useContext(Context);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [login, setLogin] = useState(true);

  function handleGoogleSignIn() {
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  function handleGoogleSignOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.');
      })
      .catch(error => {
        // An error happened.
        console.log(error);
      });
  }

  function handleForm(e) {
    e.preventDefault();
    setLogin(prev => !prev);
  }

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="h-screen min-h-screen max-h-screen flex justify-center items-center p-4">
      <div className="bg-white w-full p-4 rounded shadow-2xl text-gray-700 sm:w-96">
        <p className="text-center pb-2 text-3xl">Welcome</p>
        <div className="pb-5 text-sm text-center">
          <p className={`${login ? '' : 'hidden'}`}>
            You don´t have an account?{' '}
            <a href="#" onClick={handleForm} className="text-blue-500">
              Register now!
            </a>
          </p>
          <p className={`${!login ? '' : 'hidden'}`}>
            You already have an account?{' '}
            <a href="#" onClick={handleForm} className="text-blue-500">
              Login now!
            </a>
          </p>
        </div>
        {login ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default Login;
