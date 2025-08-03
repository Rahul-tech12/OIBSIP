import React from 'react'

const Header = () => {
  return (
    <>
     <div className='header'>
      <img alt='spicy slice' src='/logo.png'/>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/user-dashboard">Menu</a></li>
            <li><a href='/customize-pizza'>Customize Pizza</a></li>
            <li><a href="/orders">Track Orders</a></li>
        </ul>
        <a id="register" href="/register">Register</a>
       </div>
    </>
  )
}

export default Header