import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate=useNavigate();
  return (
    <div>
       <h1>You have been Logged out.
        Please log in again</h1>
        {setTimeout(() => {
            navigate("/")
        }, )}
    </div>
  )
}

export default Logout