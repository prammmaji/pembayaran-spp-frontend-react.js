// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Login from './components/Login.jsx';
import Users from './pages/Users.jsx';
import Pembayaran from './pages/Pembayaran.jsx';
import EditUser from './pages/EditUser.jsx';
import AddUser from './pages/AddUser.jsx';
import AddPembayaran from './pages/AddPembayaran.jsx';
import EditPembayaran from './pages/EditPembayaran.jsx';
import Siswa from './pages/Siswa.jsx';
import Profile from './pages/Profile.jsx';
import DataDiri from './pages/DataDiri.jsx';
import Tagihan from './pages/Tagihan.jsx';
import AddTagihan from './pages/AddTagihan.jsx';
import EditTagihan from './pages/EditTagihan.jsx';
import EditSiswa from './pages/EditSiswa.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/pembayaran" element={<Pembayaran />} />
          <Route path="/pembayaran/add/:id" element={<AddPembayaran />} />
          <Route path="/pembayaran/edit/:id" element={<EditPembayaran />} />
          <Route path="/siswa" element={<Siswa />} />
          <Route path="/siswa/profile" element={<Profile />} />
          <Route path="/siswa/profile/datadiri" element={<DataDiri />} />
          <Route path="/siswa/edit/:id" element={<EditSiswa />} />
          <Route path="/tagihan" element={<Tagihan />} />
          <Route path="/tagihan/add" element={<AddTagihan />} />
          <Route path="/tagihan/edit/:id" element={<EditTagihan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;