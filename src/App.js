import'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import LoginPage from './component/login';
import RegisterPage from './component/RegisterPage';
import NavBar from './component/Navbar';
import User from './component/User';
import Product from './component/Product';
import ViewProduct from './component/ViewProduct';
import AddProduct from './component/AddProduct';
import Assign from './component/Assign';
import NavbarLogin from './component/NavbarLogin';




function App() {
  return (
    <BrowserRouter>
      <div className = "container">
        <Switch>
          <Route path = "/" exact component = { LoginPage } />          
          <Route path = "/login" component = { LoginPage } />
          <Route path = "/register"  component = { RegisterPage } />
          <Route path = "/addproduct"  component = { AddProduct } />    
          <Route path = "/navbar"  component = { NavBar } />
          <Route path = "/user"  component = { User } />
          <Route path = "/product"  component = { Product } />
          <Route path = "/assign/:id"  component = { Assign } />
          <Route path="/viewproduct/:id"   component={ViewProduct} />
          <Route path="/navbarlogin"   component={NavbarLogin} />

        </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
