import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addcontact' element={<AddContact/>} />
        <Route path='/edit/:id' element={<EditContact/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
