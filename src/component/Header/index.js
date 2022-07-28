import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
        <div className='banner-container'>
            <h1><Link to='/'> Marvel Quiz </Link></h1>
        </div>
    </header>
  )
}

export default Header