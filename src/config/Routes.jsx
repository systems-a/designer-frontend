import { useEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"

import Login from "../application/views/Login/Login"
import Homepage from "../application/views/Homepage/Homepage";
import Design from "../application/views/Design/Design"

export default function Config () {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/design/:designId/pages/:pageId" element={<Design />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
