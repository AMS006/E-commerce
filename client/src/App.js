import './App.css';
import React from 'react'
import {Routes,Route,BrowserRouter,Navigate} from 'react-router-dom'
import HomePage from './pages/Home.page';
import { useEffect } from 'react';
import {getUserDetails} from './redux_1/user/user.action'
import { useDispatch,useSelector } from 'react-redux';
import AdminPage from './components/admin/AdminPage';
import AdminOrders from './components/admin/orders/AdminOrders';
import AdminCategory from './components/admin/category/AdminCategory';
import AdminProduct from './components/admin/products/AdminProduct';
import {initialData} from './redux_1/initialData/inidialData.action'
const PrivateRoute = ({children }) => {
  const user = useSelector((state) => state.user.user);
  return (user && user.role === "admin") ? children : <Navigate to="/" />;
}

function App() {
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(getUserDetails())
    dispatch(initialData())
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
