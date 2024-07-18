import { useState } from 'react';
import './reset.css'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Create from './pages/Create/Create';
import Browse from './pages/Browse';
import Plans from './pages/Plans';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn}/>} />
          <Route path="/home" element={<Home />}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/browse" element={<Browse/>}/>
          <Route path="/plans" element={<Plans/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster /> 
    </QueryClientProvider>
  );
}

export default App;
