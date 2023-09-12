import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import CarDetails from './carDetails/CarDetails';
import UserProvider from './context/userContext';
import SignUp from './LoginPage/SignUpPage';
import SignUpPage from './LoginPage/SignUpPage';
import SavedCars from './SavedCars/SavedCars';
import ProfilePage from './ProfilePgae/ProfilePage';
import Notification from './Notification/Notification';
import axios from 'axios';
import MyCars from './MyCars/MyCars';
axios.interceptors.request.use(
  (config) => {
  
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }
)



const router = createBrowserRouter([

  {

    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: 
        <HomePage />
      }
      ,
         {
          path:'/Saved-Cars',
          element: <SavedCars/>
         },
         {
          path:'/My-Cars',
          element: <MyCars/>
         },
         {
          path:'/cars/:carId',
          element:<CarDetails/>
         },
         {
          path:'/profile',
          element:<ProfilePage/>
         }

    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignUpPage/>
  }
]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Notification>
  <UserProvider>
  <RouterProvider router={router}/>
  </UserProvider>
  </Notification>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
