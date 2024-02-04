import React, { useContext } from 'react'
import Topbar from './components/topbar/Topbar'
import Home from './pages/home/Home'
import Settings from './pages/settings/Settings'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Single from './pages/single/Single'
import Write from './pages/write/Write'
import { Context } from './context/Context'

function App() {
  const Layout = () => {
    return(
      <>
      <Topbar/>
      <Outlet/>
      </>
    )
  }
  const {user} = useContext(Context)
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout/>,
      children:
      [
    
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/posts",
      element:<Home/>
    },
    {
      path: "/register",
      element:user?<Home/>:<Register/>
    },
    {
      path: "/login",
      element:user?<Home/>:<Login/>
    },
    {
      path: "/post/:id",
      element:<Single/>
    },
    {
      path: "/write",
      element:user?<Write/>:<Login/>
    },
    {
      path: "/settings",
      element:user?<Settings/>:<Login/>
    },
  ]
}
  ]);
  return (
    <RouterProvider router={router}/>
  
  )
}

export default App
