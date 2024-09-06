import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Health from './components/health/Health'
import Doctor from './components/health/Doctor'
import Prescription from './components/health/Prescription'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/health" element={<Health />} />
        <Route path="/health/prescription" element={<Prescription />} />
        <Route path="/health/doctor" element={<Doctor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
