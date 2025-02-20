import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import Footer from './Footer'
import Register from './Register'
import RegisterVerify from './RegisterVerify'
import Login from './Login'
import LoginVerify from './LoginVerify'
import Reset from './Reset'
import Home from './Home'
import Sentimental from './Sentimental'
import NamedAnnotation from './NamedAnnotation'
import About from './About'
import Performance from './Performance'


function App() {
  return (
    <div className="App">
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/registerverify" element={<RegisterVerify/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/loginverify" element={<LoginVerify/>}/>
          <Route path="/reset" element={<Reset/>}/>
          <Route path="/home" element={<Home/>} />
          <Route path='/sentimental' element={<Sentimental/>}/>
          <Route path='/namedannotation' element={<NamedAnnotation/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/performance' element={<Performance/>}/>
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
