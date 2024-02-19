
import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Home from './components/Home'

function App() {
 

  return (
    <>
     <Routes>
      <Route path='/signup' element = {<SignUp />} />
      <Route path='/signin' element = {<SignIn />} />
      <Route path='/' element = {<Home />} />
     
     
     </Routes>
    </>
  )
}

export default App
