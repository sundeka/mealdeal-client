import { useState } from 'react';
import './reset.css'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Create from './pages/Create/Create';
import Browse from './pages/Browse/Browse';
import Plans from './pages/Plans';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { UserObject } from './schema';

const queryClient = new QueryClient()

function App() {
  const [user, setUser] = useState<UserObject | null>(null)
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/home" element={<Home user={user} setUser={setUser} />}/>
          <Route path="/create" element={<Create user={user} setUser={setUser} />}/>
          <Route path="/browse" element={<Browse user={user} setUser={setUser} />}/>
          <Route path="/plans" element={<Plans user={user} setUser={setUser} />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster /> 
    </QueryClientProvider>
  );
}

export default App;
