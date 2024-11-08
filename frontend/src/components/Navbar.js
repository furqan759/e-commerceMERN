import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='nav-heading'>
        <ul className='nav-ul'>
            <li><Link to={'/'}>Products</Link></li>
            <li><Link to={'/add'}>Add Products</Link></li>
            <li><Link to={'/update'}>Update Products</Link></li>
            <li><Link to={'/logout'}>Logout</Link></li>
            <li><Link to={'/profile'}>Profile</Link></li>
            <li><Link to={'/sign-up'}>Sign Up</Link></li>
        </ul>
    </div>
  )
}
