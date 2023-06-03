import ActiveUser from "./components/ActiveUser";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';


function App() {
  const authS = useSelector(state => state.auth)

  return <BrowserRouter>
    <ToastContainer
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      theme="light"
    />
    <Header />
    {authS.isAuthenticated && <ActiveUser title={authS.user.username} />}
    {!authS.isAuthenticated && <Routes>
      <Route path="/" element={<Auth />} />
    </Routes>}
    {authS.isAuthenticated && <Routes Routes >
      <Route path="/" element={<Main />} />
    </Routes>
    }
  </BrowserRouter >


}


export default App;
