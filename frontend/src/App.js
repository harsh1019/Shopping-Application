import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private.js';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/Admin.js';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct.jsx';
import Users from './pages/admin/Users';
import Orders from './pages/user/Orders.jsx';
import Profile from './pages/user/Profile.jsx';
import Products from './pages/admin/Products.jsx';
import UpdateProduct from './pages/admin/UpdateProduct.jsx';
import Search from './pages/Search.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Categories from './pages/Categories.jsx';
import CategoryProduct from './pages/CategoryProduct.jsx';
import CartPage from './pages/CartPage.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';


function App() {
  return (
    <> 
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>} />
      <Route path='user/orders' element={<Orders/>} />
      <Route path='user/profile' element={<Profile/>} />
      </Route>

      <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>} />
      <Route path='admin/create-category' element={<CreateCategory/>} />
      <Route path='admin/create-product' element={<CreateProduct/>} />
      <Route path='admin/product/:slug' element={<UpdateProduct/>} />
      <Route path='admin/products' element={<Products/>} />
      <Route path='admin/users' element={<Users/>} />
      <Route path='admin/orders' element={<AdminOrders/>} />
      </Route>

      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/policy' element={<Policy/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/product/:slug' element={<ProductDetails/>} />
      <Route path='/categories' element={<Categories/>} />
      <Route path='/category/:slug' element={<CategoryProduct/>} />
      <Route path='/cart' element={<CartPage/>} />

      {/* if routes not work then * */}
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    </>
  );
}

export default App;
