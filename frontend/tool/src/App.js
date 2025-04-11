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
import HomePage from './Homepage'
import POS_Tagging from './pos_tagging'
import NER from './NER'
import SA from './SA'
import LoginX from './LoginX'
import RegisterX from './RegisterX'

function App() {
  return (
    <div className="App">
      <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginX/>} />
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
          <Route path='/homepage' element={<HomePage/>}/>
          <Route path='/POS_tagger' element={<POS_Tagging/>}/>
          <Route path='/NER' element={<NER/>}/>
          <Route path='/SA' element={<SA/>}/>
          <Route path='/loginX' element={<LoginX />} />
          <Route path='/RegisterX' element={<RegisterX />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
