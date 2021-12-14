import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Clientes from './pages/clientes/clientes.page';
import Cliente from './pages/cliente/cliente.page';
import Post from './pages/post/post.page';
import Filter from './Filter';

class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to='/clientes' className="navbar-brand">Clientes</Link>
          <Filter/>
        </nav>
        <Routes>
          <Route path='/' element={<Clientes/>} />
          <Route path='/clientes' element={<Clientes/>} />
          <Route path='/cliente/:id' element={<Cliente/>} />
          <Route path='/edit/:id' element={<Post/>} />
          <Route path='/new' element={<Post/>} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
