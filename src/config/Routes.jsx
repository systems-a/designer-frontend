import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"

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
      <Route path="/" element={<Homepage />}>
        <Route path="/design" element={<Design />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
