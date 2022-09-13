import React from 'react'
import { useNavigate } from 'react-router-dom'

const LPFailed = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=>{navigate('/Cart', {replace : true})}}>to Cart</button>
      <h1>Line Pay Failed</h1>
    </div>
  )
}

export default LPFailed