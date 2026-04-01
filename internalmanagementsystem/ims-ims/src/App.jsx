import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Group from './Component/Group'
import UpdateGroup from './Component/UpdateGroup'
import Client from "./Component/Client";
import Subzone from "./Component/Subzone";
import SubzoneId from './Component/SubzoneId'
import SubzoneGetId from "./Component/SubzoneGetId";
import Layout from "./Component/Layout";
import Estimate from "./Component/Estimate";
import About from './Component/About'
import Home from './Component/Home'
import Attendance from "./Component/Attendance";
import Login from "./Component/Login";
import Register from "./Component/Register"
import Invoice from "./Component/Invoices";
import Contact from "./Component/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />
          <Route path="groups" element={<Group />} />
          <Route path="getsubid" element={<SubzoneGetId />} />
          <Route path="update" element={<UpdateGroup />} />
          <Route path="client" element={<Client />} />
          <Route path="subzone" element={<Subzone />} />
          <Route path="subzoneid" element={<SubzoneId />} />
          <Route path="estimate"  element={<Estimate/>}/>
          <Route path="about" element={<About/>} />
          <Route path="home" element={<Home />} />
          <Route path="attendance" element={<Attendance/>} />
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="invoice" element={<Invoice/>}/>
          <Route path="contact" element={<Contact/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;