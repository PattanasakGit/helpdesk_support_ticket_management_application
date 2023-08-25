import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css'
import NavBar from './component/NavBar'
import UserHome from './component/UserHome'
import AdminHome from './component/AdminHome'
import Login from './component/LoginDemo'

function App() {

  const role: string | null = sessionStorage.getItem('ROLE');
  console.log('role =', role);

  function ShowNavbar() {
    if (role !== null) {
      return( <NavBar /> );
    }
  }

  return (
    <>
      <ShowNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />

          {role === 'User' && (
            <>
              <Route path="/" element={<UserHome />} />

            </>
          )}
          {role === 'Admin' && (
            <>
              <Route path="/" element={<AdminHome />} />
      
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
