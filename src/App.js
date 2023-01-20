import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RequireAuth from './Authentication/TokenAuth/RequireAuth/RequireAuth';
import Login from './components/Login/Login';
import Home from './components/pages/Home/Home';
import Profile from './components/pages/Profile/Profile';
import Shop from './components/pages/Shop/Shop';
import Sidebar from './components/pages/Sidebar/Sidebar';
import Signup from './components/Signup/Signup';




function App() {

  const queryClient = new QueryClient()

  return (
    <div className="App">

      <QueryClientProvider client={queryClient}>
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/' element={
            <RequireAuth>
              <Home></Home>
            </RequireAuth>
          }></Route>
          <Route path='/profile' element={
            <RequireAuth>
              <Profile></Profile>
            </RequireAuth>
          }></Route>
          <Route path='/shop' element={
            <RequireAuth>
              <Shop></Shop>
            </RequireAuth>
          }></Route>

          {/* sign un and login component route */}
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>

      </QueryClientProvider>


    </div>
  );
}

export default App;
