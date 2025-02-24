import React from "react";
import { Route, Routes } from "react-router";
import {HomePage, LoginPage, RegisterPage, CreateNotes} from "../pages/index"


function AllRoute() {
  return (
  <Routes>
    <Route path="/" element={<HomePage />}/>
    <Route path="/login" element={ <LoginPage /> } />
    <Route path="/register" element={<RegisterPage />}/>
    <Route path="/addnotes" element={ <CreateNotes />} />
    
  </Routes>
  )
}

export default AllRoute;