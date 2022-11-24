import './App.css';
import React from 'react'
import {Routes,Route,BrowserRouter,Navigate} from 'react-router-dom'
import HomePage from './pages/Home.page';
import { useEffect } from 'react';
import {getUserDetails} from './redux/reducers/user/user.action'
import { useDispatch,useSelector } from 'react-redux';
import AdminPage from './components/admin/AdminPage';
import AdminOrders from './components/admin/AdminOrders';
import AdminCategory from './components/admin/AdminCategory';
import AdminProduct from './components/admin/AdminProduct';
const PrivateRoute = ({children }) => {
  const user = useSelector((state) => state.userReducer.user.user);
  console.log(user);
  return (user && user.role === "admin") ? children : <Navigate to="/" />;
}
function App() {
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(getUserDetails())
  },[dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/admin/dashboard" element={<PrivateRoute>  
                                                  <AdminPage />
                                                </PrivateRoute>
                                                }
        >
          <Route path='Orders' element={<AdminOrders />} />
          <Route path='Category' element={<AdminCategory />} />
          <Route path='Products' element={<AdminProduct />} />
        </Route >
      </Routes>
    </BrowserRouter>
  );
}

export default App;
