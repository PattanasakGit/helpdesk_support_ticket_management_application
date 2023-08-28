import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css'
import NavBar from './component/NavBar'
import UserHome from './component/UserHome'
import AdminHome from './component/AdminHome'
import Login from './component/LoginDemo'
import CreateTicket from './component/CreateTicket'
import UserUpdateTicket from './component/UserUpdateTicket'

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
              <Route path="/CreateTicket" element={<CreateTicket />} />
              <Route path="/UpdateTicket" element={<UserUpdateTicket />} />

            </>
          )}
          {role === 'Admin' && (
            <>
              <Route path="/" element={<AdminHome />} />
      
            </>
          )}
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
