import { FcGoogle } from 'react-icons/fc';
import app from '../firebase/firebase.init';
import { useContext, useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

import Axios from 'axios';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DispatchContext from '../context/DispatchContext';

const LoginForm = () => {
  const AppDispatch = useContext(DispatchContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  function handleGoogleSignIn() {
    signInWithPopup(auth, provider)
      .then(async result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        // console.log(user);
        const res = await Axios.post('https://restaurant-management-server.onrender.com/login', { email: user.email });

        if (res.data._id) {
          console.log(res.data);
          // localStorage.setItem('loggedUser', JSON.stringify(res.data));
          AppDispatch({ type: 'login', value: res.data });
        } else {
          const res = await Axios.post('https://restaurant-management-server.onrender.com/register', { name: user.displayName, email: user.email, profilePicture: user.photoURL });
          if (res.data.insertedId) {
            // localStorage.setItem('loggedUser', JSON.stringify({ id: res.data.insertedId, name: user.displayName, email: user.email, profilePicture: user.photoURL }));
            AppDispatch({ type: 'login', value: { id: res.data.insertedId, name: user.displayName, email: user.email, profilePicture: user.photoURL } });
          }
        }
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        console.log(error);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setSuccess('Login successful!');
        const res = await Axios.post('https://restaurant-management-server.onrender.com/login', { email });
        // localStorage.setItem('loggedUser', JSON.stringify(res.data));
        console.log(res.data._id);
        if (!res.data) {
          function handleLogout() {
            signOut(auth)
              .then(() => {
                AppDispatch({ type: 'logout' });
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!'
                });
                return <Navigate to={'/'} />;
              })
              .catch(error => {
                console.log(error);
              });
          }
          return handleLogout();
        }
        AppDispatch({ type: 'login', value: res.data });
        // setUser(user.displayName);
        // setUserPhoto(user.photoURL);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  return (
    <>
      <form action="#" className="my-5" onSubmit={handleLogin}>
        <div className="pb-5">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Email" />
        </div>

        <div className="pb-5">
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Password" />
        </div>

        <button type="submit" className="bg-blue-500 p-2 w-full text-white rounded">
          Login
        </button>
        <p className={`${error ? 'my-2 text-red-700' : 'hidden'}`}>{error}</p>
        <p className={`${success ? 'my-2 text-green-700' : 'hidden'}`}>{success}</p>
      </form>
      <hr />
      <p className="mt-8 ">Also login with:</p>
      <div className="relative flex justify-around">
        <FcGoogle onClick={handleGoogleSignIn} className="cursor-pointer text-xl" />
      </div>
    </>
  );
};

export default LoginForm;
