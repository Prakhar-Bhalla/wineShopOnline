import logo from './logo.svg';
import './App.css';
import SearchAppBar from './components/Navbar';
import Home from './components/HomePage';
import Cart from './components/Cart';
import WishList from './components/WishList';
import { Route, Routes } from 'react-router-dom';
import Checkout from './components/Checkout';

function App() {
  return (
    <div className="App">
      <SearchAppBar/>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/wishlist' element={<WishList/>}></Route>
      <Route path='/checkout' element={<Checkout/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
