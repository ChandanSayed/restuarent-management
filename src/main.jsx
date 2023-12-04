import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Error from './components/Error.jsx';
import Login from './components/Login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import MyCart from './components/MyCart.jsx';
import Home from './components/Home.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppContext from './context/AppContext.jsx';
import AddItem from './components/AddItem.jsx';
import ItemDetails from './components/ItemDetails.jsx';
import ItemUpdate from './components/ItemUpdate.jsx';
import { Items } from './components/Items.jsx';
import Profile from './components/Profile.jsx';
import Blog from './components/Blog.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/items',
        element: (
          <PrivateRoute>
            <Items />
          </PrivateRoute>
        )
      },
      {
        path: '/add-product',
        element: (
          <PrivateRoute>
            <AddItem />
          </PrivateRoute>
        )
      },
      {
        path: '/cart',
        element: (
          <PrivateRoute>
            <MyCart />
          </PrivateRoute>
        )
      },
      {
        path: `/products/product-details/:id`,
        element: (
          <PrivateRoute>
            <ItemDetails />
          </PrivateRoute>
        )
      },

      {
        path: `/items/item-update/:id`,
        element: (
          <PrivateRoute>
            <ItemUpdate />
          </PrivateRoute>
        )
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      },
      {
        path: '/blog',
        element: (
          <PrivateRoute>
            <Blog />
          </PrivateRoute>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContext>
      <RouterProvider router={router} />
    </AppContext>
  </React.StrictMode>
);
