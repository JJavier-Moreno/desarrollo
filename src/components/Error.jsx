import React from 'react'
import { useState, useEffect } from 'react'

const Error = ({mensaje}) => {
  return (
    <div className='bg-red-800 font-bold text-white uppercase text-center rounded-md p-3 mb-3'>
    <p>{mensaje}</p>
  </div>
  )
}

export default Error